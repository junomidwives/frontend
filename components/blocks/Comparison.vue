<template>
  <div v-if="rows?.length" class="comparison">
    <!-- Tablets and up: a table. -->
    <table class="comparison__table">
      <thead>
        <tr>
          <td></td>
          <th scope="col" class="comparison__other">{{ otherLabel }}</th>
          <th scope="col" class="comparison__juno">
            <i class="comparison__dot" aria-hidden="true"></i>{{ junoLabel }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row._key">
          <th scope="row" class="comparison__topic">{{ row.topic }}</th>
          <td class="comparison__other">{{ row.other }}</td>
          <td class="comparison__juno">{{ row.juno }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Phones: the same rows, compact. Column headings once at the top; each
         topic labels its row; the Juno column stays one continuous strip. -->
    <div class="comparison__compact">
      <div class="comparison__compact-head" aria-hidden="true">
        <span class="comparison__other">{{ otherLabel }}</span>
        <span class="comparison__juno">
          <i class="comparison__dot" aria-hidden="true"></i>{{ junoLabel }}
        </span>
      </div>
      <div v-for="row in rows" :key="row._key" class="comparison__compact-row">
        <strong class="comparison__topic">{{ row.topic }}</strong>
        <span class="comparison__juno-strip" aria-hidden="true"></span>
        <span class="comparison__other">
          <span class="visually-hidden">{{ otherLabel }}: </span>{{ row.other }}
        </span>
        <span class="comparison__juno">
          <span class="visually-hidden">{{ junoLabel }}: </span>{{ row.juno }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Row = { _key: string; topic: string; other: string; juno: string };

withDefaults(
  defineProps<{
    otherLabel?: string;
    junoLabel?: string;
    rows?: Row[];
  }>(),
  {
    otherLabel: "Typical NHS care",
    junoLabel: "Care with Juno",
    rows: () => [],
  },
);
</script>

<style>
.comparison {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 8px;
}

.comparison__dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  background: rgb(var(--v-theme-pink));
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Table (tablets and up) */
.comparison__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--type-small);
  line-height: 1.5;
}

.comparison__table th,
.comparison__table td {
  padding: 20px;
  text-align: left;
  vertical-align: top;
}

.comparison__table thead tr {
  border-bottom: 2px solid rgb(var(--v-theme-ink));
}

.comparison__table thead th {
  padding-block: 16px;
}

.comparison__table thead .comparison__other {
  color: rgb(var(--v-theme-muted));
  font-weight: 500;
}

.comparison__table thead .comparison__juno {
  color: rgb(var(--v-theme-deep));
  font-weight: 700;
}

.comparison__table tbody tr {
  border-bottom: 1px solid rgb(var(--v-theme-line));
}

.comparison__table .comparison__topic {
  width: 24%;
  padding-left: 0;
  color: rgb(var(--v-theme-ink));
  font-weight: 700;
}

.comparison__table tbody .comparison__other {
  color: rgb(var(--v-theme-muted));
}

.comparison__table tbody .comparison__juno {
  background: rgb(var(--v-theme-tint));
  color: rgb(var(--v-theme-deep));
  font-weight: 700;
}

.comparison__compact {
  display: none;
}

/* Phones */
@media (max-width: 700px) {
  .comparison__table {
    display: none;
  }

  .comparison__compact {
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(var(--v-theme-line));
    border-radius: 16px;
    overflow: hidden;
    font-size: 0.875rem;
    line-height: 1.45;
  }

  .comparison__compact-head,
  .comparison__compact-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .comparison__compact-head > span {
    padding: 10px 12px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .comparison__compact-head .comparison__other {
    color: rgb(var(--v-theme-muted));
  }

  .comparison__compact-head .comparison__juno {
    background: rgb(var(--v-theme-deep));
    color: #fff;
  }

  .comparison__compact-head .comparison__dot {
    width: 7px;
    height: 7px;
    margin-right: 6px;
    vertical-align: 1px;
  }

  .comparison__compact-row .comparison__topic {
    padding: 12px 12px 2px;
    border-top: 1px solid rgb(var(--v-theme-line));
    font-size: 0.8125rem;
    color: rgb(var(--v-theme-ink));
  }

  /* Fills the Juno column beside the topic label, so the strip is unbroken. */
  .comparison__juno-strip {
    background: rgb(var(--v-theme-tint));
    border-top: 1px solid #dce8e6;
  }

  .comparison__compact-row .comparison__other,
  .comparison__compact-row .comparison__juno {
    padding: 2px 12px 12px;
  }

  .comparison__compact-row .comparison__other {
    color: rgb(var(--v-theme-muted));
  }

  .comparison__compact-row .comparison__juno {
    background: rgb(var(--v-theme-tint));
    color: rgb(var(--v-theme-deep));
    font-weight: 500;
  }
}
</style>
