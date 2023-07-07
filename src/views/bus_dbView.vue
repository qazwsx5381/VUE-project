<template>
  <div class="bus_db">
    <select name="busStopNum" id="" v-model="busStop">
      <option value="" selected disabled>정류장을 선택하세요</option>
      <option value="500090000">올림픽교차로(센텀방향)</option>
      <option value="500080000">올림픽교차로(해운대방향)</option>
      <option value="185100201">센텀시티역, 벡스코</option>
      <option value="186610201">해운대관광고등학교</option>
    </select>
    <button @click="busStopnum">조회</button>
    <hr />
    <h3>{{ busStopName }}</h3>
    <h4 v-if="bus_info">일반버스</h4>
    <template v-for="v in data1" :key="v">
      <div v-if="v.bus_type == '일반버스' && bus_info">
        <fieldset>
          <legend>버스 번호 : {{ v.bus_num }}</legend>
          <div>차량번호: {{ v.bus_carnum ? v.bus_carnum : "정보없음" }}</div>
          <div>남은시간: {{ v.bus_min ? v.bus_min : "정보없음" }}</div>
          <div>
            다음 차량번호: {{ v.bus_carnum1 ? v.bus_carnum1 : "정보없음" }}
          </div>
          <div>다음 남은시간: {{ v.bus_min2 ? v.bus_min2 : "정보없음" }}</div>
        </fieldset>
      </div>
      <div v-if="v.bus_type == '심야버스(일반)' && bus_info">
        <fieldset>
          <legend>버스 번호 : {{ v.bus_num }}</legend>
          <div>차량번호: {{ v.bus_carnum ? v.bus_carnum : "정보없음" }}</div>
          <div>남은시간: {{ v.bus_min ? v.bus_min : "정보없음" }}</div>
          <div>
            다음 차량번호: {{ v.bus_carnum1 ? v.bus_carnum1 : "정보없음" }}
          </div>
          <div>다음 남은시간: {{ v.bus_min2 ? v.bus_min2 : "정보없음" }}</div>
        </fieldset>
      </div>
    </template>
    <hr v-if="bus_info" />
    <h4 v-if="bus_info">좌석버스</h4>
    <template v-for="v in data1" :key="v">
      <div v-if="v.bus_type == '급행버스' && bus_info">
        <fieldset>
          <legend>버스 번호 : {{ v.bus_num }}</legend>
          <div>차량번호: {{ v.bus_carnum ? v.bus_carnum : "정보없음" }}</div>
          <div>남은시간: {{ v.bus_min ? v.bus_min : "정보없음" }}</div>
          <div>
            다음 차량번호: {{ v.bus_carnum1 ? v.bus_carnum1 : "정보없음" }}
          </div>
          <div>다음 남은시간: {{ v.bus_min2 ? v.bus_min2 : "정보없음" }}</div>
        </fieldset>
      </div>
    </template>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "bus_db",
  data() {
    return {
      busStop: "",
      bus_result: "",
      data1: "",
      busStopName: "",
      bus_info: false,
    };
  },
  methods: {
    busStopnum() {
      this.busStopName = "조회 중입니다.";
      this.bus_info = false;
      axios
        .post("/busStopnum", {
          busstop: this.busStop,
        })
        .then((res) => {
          this.bus_info = true;
          this.busStopName = `${res.data[0].bus_stopname}의 버스정보입니다.`;
          this.data1 = res.data;
        });
    },
  },
};
</script>
<style></style>
