<script setup>
import { Icon } from 'lucide-vue-next';
defineProps({
  name: String,
  size: {
    type: [Number, String],
    default: 20
  }
});
</script>

<template>
  <Icon :name="name" :size="size" class="inline-flex" />
</template>