<template>
  <button type="button" class="button-link" @click.prevent="$emit('click')">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonLink",
  props: {
    text: String,
  },
};
</script>

<style scoped>
.button-link {
  background-color: transparent;
  border: none;
  color: #e1e1e6;
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
</style>
