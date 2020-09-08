<template>
  <button
    :class="['button', disabled]"
    type="button"
    @click.prevent="$emit('click')"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    disabled: Boolean,
  },
};
</script>

<style scoped>
.button {
  height: 45px;
  border: none;
  color: #e1e1e6;
  font-size: 16px;
  font-weight: bold;
  background-color: #42b983;
  box-shadow: 0px 2px 4px 1px #222;
  border-bottom: 3px solid rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  cursor: pointer;
}
.button:disabled {
  background-color: rgba(65, 65, 77, 0.4);
}
</style>
