<template>
  <v-container v-if="rows?.length">
    <!-- One table. On phones the CSS turns each row into a card (topic header,
         then the two answers), with a legend in place of the column headings. -->
    <div class="comparison">
      <div class="comparison__legend" aria-hidden="true">
        <span><i class="swatch swatch--other" />{{ otherLabel }}</span>
        <span><i class="swatch swatch--juno" />{{ junoLabel }}</span>
      </div>
      <table>
        <thead>
          <tr>
            <td />
            <th scope="col" class="col-other">{{ otherLabel }}</th>
            <th scope="col" class="col-juno">
              <i class="dot" aria-hidden="true" />{{ junoLabel }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row._key">
            <th scope="row" class="topic">{{ row.topic }}</th>
            <td class="col-other" :data-label="otherLabel">{{ row.other }}</td>
            <td class="col-juno" :data-label="junoLabel">
              <i class="dot dot--mobile" aria-hidden="true" />{{ row.juno }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-container>
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
/* Colours from the client's original comparison graphic. */
.comparison {
  --cmp-deep: #22495a;
  --cmp-mint: #c1e3d3;
  --cmp-pale: #f2f6f6;
  --cmp-pale-head: #eaf1f1;
  --cmp-blush: #f7b9b9;
  --cmp-muted: #4f6168;
  max-width: 1000px;
  margin: 0 auto;
  color: var(--cmp-deep);
}

.comparison table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1.05rem;
  line-height: 1.45;
}

.comparison th,
.comparison td {
  padding: 1.1rem 1.4rem;
  text-align: left;
  vertical-align: middle;
}

.comparison thead th {
  font-weight: 700;
  font-size: 1.15rem;
  padding-block: 1.3rem;
}

.comparison thead .col-other {
  background: var(--cmp-pale-head);
  color: var(--cmp-muted);
}

.comparison thead .col-juno {
  background: var(--cmp-deep);
  color: #fff;
  border-top-right-radius: 20px;
}

.comparison .topic {
  font-weight: 700;
  padding-left: 0;
  width: 22%;
  border-bottom: 2px solid var(--cmp-pale-head);
}

.comparison tbody .col-other {
  background: var(--cmp-pale);
  color: var(--cmp-muted);
  border-bottom: 2px solid #fff;
  width: 39%;
}

.comparison tbody .col-juno {
  background: var(--cmp-mint);
  font-weight: 700;
  border-bottom: 2px solid #fff;
}

.comparison tbody tr:last-child .topic,
.comparison tbody tr:last-child td {
  border-bottom: 0;
}

.comparison tbody tr:last-child .col-juno {
  border-bottom-right-radius: 20px;
}

.comparison .dot {
  display: inline-block;
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  background: var(--cmp-blush);
  margin-right: 0.6em;
  vertical-align: 0.05em;
}

.comparison .dot--mobile,
.comparison__legend {
  display: none;
}

/* Phones: one card per row. */
@media (max-width: 759px) {
  .comparison__legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 0.95rem;
  }

  .comparison__legend span {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .swatch {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 4px;
    border: 1px solid var(--cmp-pale-head);
  }

  .swatch--other {
    background: var(--cmp-pale);
  }

  .swatch--juno {
    background: var(--cmp-mint);
  }

  .comparison thead {
    display: none;
  }

  .comparison table,
  .comparison tbody,
  .comparison tr,
  .comparison th,
  .comparison td {
    display: block;
    width: auto !important;
  }

  .comparison tbody tr {
    margin-bottom: 1rem;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--cmp-pale-head);
  }

  .comparison .topic {
    background: var(--cmp-deep);
    color: #fff;
    padding: 0.9rem 1.25rem;
    border: 0;
  }

  .comparison tbody td {
    padding: 0.85rem 1.25rem;
    border: 0 !important;
    border-radius: 0 !important;
  }

  .comparison .dot--mobile {
    display: inline-block;
  }

  .comparison .col-juno > .dot:not(.dot--mobile) {
    display: none;
  }
}
</style>
