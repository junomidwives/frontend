<template>
  <v-table class="text-body-2 text-sm-body-1">
    <thead>
      <tr class="bg-grey-lighten-3">
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in formatted" :key="i">
        <td v-for="cell in row" :key="cell">
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
const props = defineProps({
  rows: {
    type: Array as () => { cells: string[] }[],
    required: true,
  },
});

const headers = computed(() => {
  return props.rows[0].cells;
});

const formatted = computed(() => {
  return props.rows.slice(1).map(({ cells }) => cells);
});
</script>
