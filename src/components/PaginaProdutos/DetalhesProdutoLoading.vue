<script setup>
</script>

<template lang="pug">
div.row.justify-center.col.q-pa-lg.q-gutter-sm.q-mt-xl
  div.row.col-7.justify-center
    div.col-2.column.q-gutter-sm.q-mr-lg
      q-skeleton(
        height="195px"
      )
      q-skeleton(
        height="195px"
      )
      q-skeleton(
        height="195px"
      )
    q-skeleton.col-7(
      height="600px"
    )
  div.col-3.column
      q-skeleton.col-1(
        type="text"
        class="text-subtitle1"
        height="300px"
      )
      q-skeleton.col-1(
        type="text"
        class="text-subtitle1"
      )
      q-skeleton.col-1(
        type="text"
        class="text-caption"
      )

      q-skeleton.col-2(
        type="text"
        class="text-caption"
      )
</template>

<style scoped>
</style>
