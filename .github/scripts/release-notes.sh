#!/usr/bin/env bash
# Writes release notes (markdown) to stdout for the next release.
#
# Lists PRs merged since the latest vX.Y.Z tag:
#   - into main
#   - and, when RELEASE_BRANCH is set (e.g. release/v1.2.0), into that branch.
# Items are grouped by conventional-commit prefix, which is stripped from
# the title. Any issues the PR fixes ("Fixes #49" in its description) are
# listed with their titles, since those are the client's own words.
#
# Needs: gh (authenticated via GH_TOKEN), jq, GITHUB_REPOSITORY.
set -euo pipefail

REPO="${GITHUB_REPOSITORY:?}"
RELEASE_BRANCH="${RELEASE_BRANCH:-}"

git fetch --tags --quiet
# PREVIOUS_TAG overrides the starting point, e.g. to regenerate an older release's notes.
LATEST="${PREVIOUS_TAG:-$(git tag --sort=-v:refname | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -n1 || true)}"

list_prs() {
  local base="$1" search=""
  if [ -n "$LATEST" ]; then
    search="merged:>$(git log -1 --format=%cI "refs/tags/${LATEST}")"
  fi
  gh pr list --repo "$REPO" --state merged --base "$base" --search "$search" \
    --json number,title,body,headRefName --limit 100
}

PRS=$(list_prs main)
if [ -n "$RELEASE_BRANCH" ]; then
  PRS=$(jq -s 'add' <(echo "$PRS") <(list_prs "$RELEASE_BRANCH"))
fi
# Release PRs (head release/...) are left out: their contents are listed in their own release.
PRS=$(echo "$PRS" | jq '[.[] | select(.headRefName | startswith("release/") | not)] | sort_by(.number)')

# "- Title (#55), fixes #49: Issue title" with full links, so they work in email too.
format_pr() {
  local pr="$1" number title body line issue issue_title
  number=$(echo "$pr" | jq -r '.number')
  title=$(echo "$pr" | jq -r '.title' | sed -E 's/^[a-zA-Z]+(\([^)]*\))?!?:[[:space:]]*//')
  title="$(echo "${title:0:1}" | tr '[:lower:]' '[:upper:]')${title:1}"
  body=$(echo "$pr" | jq -r '.body // ""')
  line="- ${title} ([#${number}](https://github.com/${REPO}/pull/${number}))"
  for issue in $(echo "$body" | grep -oiE '(close[sd]?|fix(e[sd])?|resolve[sd]?) #[0-9]+' | grep -oE '[0-9]+' | sort -un); do
    issue_title=$(gh issue view "$issue" --repo "$REPO" --json title --jq '.title' 2>/dev/null || true)
    if [ -n "$issue_title" ]; then
      line+=", fixes [#${issue}](https://github.com/${REPO}/issues/${issue}): ${issue_title}"
    fi
  done
  echo "$line"
}

section() {
  local pattern="$1" heading="$2" items=""
  while IFS= read -r pr; do
    [ -z "$pr" ] && continue
    items+="$(format_pr "$pr")"$'\n'
  done < <(echo "$PRS" | jq -c --arg p "$pattern" '.[] | select(.title | test($p; "i"))')
  if [ -n "$items" ]; then
    printf '## %s\n%s\n' "$heading" "$items"
  fi
}

section '^feat\b' 'Features'
section '^fix\b' 'Bug Fixes'
section '^(perf|style)\b' 'Improvements'
section '^(chore|docs|refactor|test|ci|build)\b' 'Maintenance'
section "^(?!(feat|fix|chore|docs|refactor|perf|style|test|ci|build)\\b)" 'Other Changes'
