<template>
  <div class="selector-container">
    <span class="selector-title">Select screen for share - </span>
    <ButtonLink text="Refresh" @click="handleRefresh" />
    <div class="selector-content">
      <img
        class="selector-item"
        v-for="stream in streams"
        :key="stream.id"
        :src="stream.thumbnail.toDataURL()"
        @click.prevent="handleSelect(stream.id)"
      />
    </div>
  </div>
</template>

<script>
import ButtonLink from "@/components/ButtonLink";
import { getAllStreams } from "@/core/util";

export default {
  name: "StreamSelector",
  components: {
    ButtonLink,
  },
  data() {
    return {
      streams: [],
    };
  },
  methods: {
    handleSelect(id) {
      this.$router.push({ name: "Share", params: { screen: id } });
    },
    async handleRefresh() {
      this.streams = await getAllStreams();
    },
  },
  async mounted() {
    this.streams = await getAllStreams();
  },
};
</script>

<style scoped>
.selector-title {
  color: #e1e1e6;
  font-size: 16px;
  font-weight: 700;
}
.selector-container {
  margin-top: 15px;
}
.selector-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-top: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.24);
  overflow: scroll;
}
.selector-item {
  height: 80px;
  margin: 0px 10px;
  border: 1px solid #333;
}
.selector-item:hover {
  border-color: #42b983;
}
</style>
