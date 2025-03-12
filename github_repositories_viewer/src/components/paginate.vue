<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { VueAwesomePaginate } from 'vue-awesome-paginate'

defineProps({
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  maxPagesShown: { type: Number, required: true },
  modelValue: { type: Number, required: true },
})

const emit = defineEmits(['update:modelValue', 'pageChange'])

const onClickHandler = (page: number) => {
  emit('update:modelValue', page)
  emit('pageChange', page)
}
</script>

<template>
  <vue-awesome-paginate
    :total-items="totalItems"
    :items-per-page="itemsPerPage"
    :max-pages-shown="maxPagesShown"
    :model-value="modelValue"
    @update:modelValue="onClickHandler"
  />
</template>
<style>
.pagination-container {
  display: flex;

  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;

  width: 40px;

  border-radius: 20px;

  cursor: pointer;

  background-color: rgb(242, 242, 242);

  border: 1px solid rgb(217, 217, 217);

  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;

  border: 1px solid #3498db;

  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
