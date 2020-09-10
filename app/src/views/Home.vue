<template>
  <div class="home">
    <img class="logo" alt="vupc" src="../assets/logo.png" />
    <div class="home-content">
      <Input label="Code" placeholder="ABCDEF" @input="handleChangeCode" />
      <Button text="Connect" @click="handleConnect" />
      <hr />
    </div>
    <StreamSelector />
  </div>
</template>

<script>
import Input from "@/components/Input";
import Button from "@/components/Button";
import StreamSelector from "@/components/StreamSelector";

export default {
  name: "Home",
  components: {
    Input,
    Button,
    StreamSelector,
  },
  data() {
    return {
      code: "",
    };
  },
  methods: {
    handleChangeCode(value) {
      this.code = value;
    },
    handleConnect() {
      if (this.code) {
        this.$router.push({ name: "Remote", params: { code: this.code } });
      }
    },
  },
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
.home-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.home-content button {
  margin-top: 15px;
}
.logo {
  width: 250px;
}
.title {
  font-size: 72px;
  color: #42b983;
}
hr {
  margin-top: 20px;
}
</style>
