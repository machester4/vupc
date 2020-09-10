<template>
  <div class="share-container">
    <h1>Your are ready to share</h1>
    <h3>Code: {{ code }}</h3>
    <ButtonLink text="Disconnect" @click="handleDisconnect" />
  </div>
</template>

<script>
import { createOffer } from "@/core/webRTC";
import ButtonLink from "@/components/ButtonLink";

export default {
  name: "Share",
  components: {
    ButtonLink,
  },
  data() {
    return {
      code: "* * * * * *",
      connected: false,
      rtcInstance: null,
    };
  },
  async mounted() {
    try {
      const screen = this.$route.params.screen;
      this.rtcInstance = await createOffer(screen);
      this.rtcInstance.onConnect(this.onConnect);
      this.rtcInstance.onConnect(this.onDisconnect);
      this.rtcInstance.onCode(this.onCode);
      this.rtcInstance.onData(this.onData);
    } catch (error) {
      // TODO: Improve error handling
      console.error(error);
    }
  },
  beforeDestroy() {
    this.rtcInstance.disconnect();
  },
  methods: {
    onCode(code) {
      this.code = code;
    },
    onData() {
      // TODO: Implement
    },
    onConnect() {
      this.connected = true;
    },
    onDisconnect() {
      this.connected = false;
    },
    handleDisconnect() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.share-container {
  display: flex;
  flex-direction: column;
}
button {
  position: absolute;
  bottom: 5px;
  left: 5px;
}
</style>
