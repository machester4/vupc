<template>
  <div class="remote-container">
    <span class="conn-log">{{ connectionState }}</span>
    <video id="video" ref="video" @click.prevent="handleClick" />
    <ButtonLink text="Disconnect" @click="handleDisconnect" />
  </div>
</template>

<script>
import { connectWithOffer } from "@/core/webRTC";
import ButtonLink from "@/components/ButtonLink";

export default {
  name: "Remote",
  components: {
    ButtonLink,
  },
  data() {
    return {
      connected: false,
      failed: false,
      rtcInstance: null,
    };
  },
  computed: {
    connectionState() {
      if (this.connected) return "Connected";
      if (this.failed) return "Failed";
      return "Connecting";
    },
  },
  async mounted() {
    try {
      const code = this.$route.params.code;
      this.rtcInstance = await connectWithOffer(code);
      this.rtcInstance.onStream(this.onStream);
      this.rtcInstance.onConnect(this.onConnect);
      this.rtcInstance.onClose(this.onDisconnect);
    } catch (error) {
      // TODO: Improve error handling
      this.failed = true;
      console.error(error);
    }
  },
  beforeDestroy() {
    this.rtcInstance.disconnect();
  },
  methods: {
    onStream(stream) {
      this.$refs.video.srcObject = stream;
      this.$refs.video.play();
    },
    onConnect() {
      this.connected = true;
    },
    onDisconnect() {
      this.connected = false;
    },
    handleClick(e) {
      const { offsetX, offsetY } = e;
      const video = document.getElementById("video");
      const size = { width: video.offsetWidth, height: video.offsetHeight };
      this.rtcInstance.mouseClick(offsetX, offsetY, size);
    },
    handleDisconnect() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.remote-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  position: relative;
}
.remote-container video {
  width: 100%;
}
.conn-log {
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 0px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 15px;
  color: #e1e1e6;
  background-color: #2c3e50;
}
button {
  position: absolute;
  bottom: 5px;
  left: 5px;
}
</style>
