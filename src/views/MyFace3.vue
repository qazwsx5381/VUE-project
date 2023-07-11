<template>
  <div>
    <h1>실시간 음악차트(멜론)</h1>
    <h2>{{}}시 기준</h2>
    <button @click="load_chart()">업데이트</button>
  </div>
  <div>
    <span v-if="loading">{{ load_msg }}</span>
    <span></span>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "melon_chart",
  data() {
    return {
      chart_data: [],
      load_msg: "",
      loading: true,
    };
  },
  mounted() {
    this.load_chart();
  },
  methods: {
    load_chart() {
      this.load_msg = "데이터를 읽어오는 중입니다.";
      axios.post("/chart", {}).then((res) => {
        this.loading = false;
        console.log(res.data);
      });
    },
  },
};
</script>

<style></style>
