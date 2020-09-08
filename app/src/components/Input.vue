<template>
  <div class="input-container">
    <label class="label">{{ label }}</label>
    <input
      class="input"
      type="text"
      @input="$emit('input', $event.target.value)"
      :value="value"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: String,
    value: String,
    placeholder: String,
  },
};
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0px;
}
.label {
  color: #e1e1e6;
  font-size: 14px;
  font-weight: 700;
  padding: 5px;
}
.input {
  width: 250px;
  height: 40px;
  border: none;
  padding: 0px 5px;
  font-size: 18px;
  color: #e1e1e6;
  background-color: #231e31;
  border-radius: 4px;
}
.input:focus {
  border: 1px solid #42b983;
}
</style>
