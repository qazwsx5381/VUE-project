<template>
  <div id="app">
    <video src="./assets/img/bg.mp4" loop autoplay muted></video>
    <div id="nav">
      <ul>
        <li>
          <a href="/"
            ><img src="./assets/img/bars-solid.svg" v-on:click="on2"
          /></a>
        </li>
        <li v-on:click="on1">
          <router-link to="/face1">실시간 미세먼지 정보</router-link>
        </li>
        <li v-on:click="on1">
          <router-link to="./face2">실시간 환율정보</router-link>
        </li>
        <li v-on:click="on1">
          <router-link to="./face3">실시간 음원순위</router-link>
        </li>
        <li v-on:click="on1">
          <router-link to="./face4">실시간 번역기</router-link>
        </li>
        <li v-on:click="on1">
          <router-link to="./face5"> <div>버스도착정보</div></router-link>
        </li>
        <li v-on:click="on1">
          <router-link to="./face6">내 위치</router-link>
        </li>
        <li v-on:click="on1">
          <router-link to="./face7">주식</router-link>
        </li>
      </ul>
    </div>

    <!-- section -->
    <section id="article_wrap">
      <article id="article_face1">
        <div>
          <h1>face1</h1>
          <div class="inner"></div>
        </div>
      </article>
      <article id="article_face2">
        <div>
          <h1>face2</h1>
          <div class="inner"></div>
        </div>
      </article>
      <article id="article_face3">
        <div>
          <h1>face3</h1>
          <div class="inner"></div>
        </div>
      </article>
      <article id="article_face4">
        <div>
          <h1>face4</h1>
          <div class="inner"></div>
        </div>
      </article>
      <article id="article_face5">
        <div>
          <h1>face5</h1>
          <div class="inner"></div>
        </div>
      </article>
      <article id="article_face6">
        <div>
          <h1>face6</h1>
          <div class="inner"></div>
        </div>
      </article>
      <article id="article_face7">
        <div>
          <h1>face7</h1>
          <div class="inner"></div>
        </div>
      </article>
      <article id="article_face8">
        <div>
          <h1>face8</h1>
          <div class="inner"></div>
        </div>
      </article>
    </section>

    <!-- aside -->
    <div id="aside_wrap">
      <aside id="aside_face1">
        <router-view />
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    paused: function () {
      console.log(this.class);
      this.style.animationPlayState = "paused";
    },
    running: function () {
      this.style.animationPlayState = "running";
    },

    on1: function () {
      const asideFace1 = document.querySelector("#aside_face1");
      const articleWrap = document.querySelector("#article_wrap");
      asideFace1.classList.add("on");
      articleWrap.classList.add("off");
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul,
ol,
li {
  list-style: none;
}
#app {
  font: 14px/1.4 "orbitron";
  letter-spacing: 1px;
  color: black;
  background: #ffffff;
  position: fixed;
  width: 100%;
  height: 100%;
  perspective: 1300px;
}
#app video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  opacity: 0.5;
}
#app #nav {
  /* border: 3px solid aqua; */
  position: relative;
  color: white;
  width: 100%;
  height: 50px;
}
#app #nav ul {
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
  padding: 0;
  height: 5vh;
}
#app #nav ul li:hover {
  color: blue;
  cursor: pointer;
}
#app #nav img {
  width: 30px;
}

/* aside */
#app #aside_wrap #aside_face1 {
  width: 100%;
  height: 92.5vh;
  background: white;
  position: relative;
  top: 0;
  left: -100%;
  opacity: 0;
  z-index: 2;
  box-sizing: border-box;
  transition: 1s;
  overflow: auto;
}
#app #aside_wrap #aside_face1.on {
  opacity: 1;
  left: 0%;
}

/* articel */
#app #article_wrap {
  width: 600px;
  height: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -400px;
  margin-left: -300px;
  /* border: 3px solid aqua; */
  transform-style: preserve-3d;
  animation: ani linear 30s infinite;
  z-index: 1;
}
#app #article_wrap.off {
  opacity: 0;
}
#app #article_wrap article {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(255, 255, 255, 0.4);
  backface-visibility: hidden;
}
#app #article_wrap article h1 {
  color: rgba(255, 255, 255, 0.7);
  position: absolute;
  left: 0px;
  top: 0px;
  font-size: 30px;
  opacity: 0;
  transition: all 0.5s;
}
#app #article_wrap article:hover h1 {
  top: -60px;
  opacity: 1;
}
#app #article_wrap article .inner {
  width: 100%;
  height: 100%;
}
#app #article_wrap article .inner > div {
  width: 100%;
  height: 100%;
  border: 1px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.06);
  padding: 50px;
  position: relative;
  opacity: 0.7;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s;
}
#app #article_wrap article .inner > div:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.03);
  opacity: 1;
}
#article_face1 {
  transform: rotateY(0deg) translateZ(-764px);
}
#article_face2 {
  transform: rotateY(45deg) translateZ(-764px);
}
#article_face3 {
  transform: rotateY(90deg) translateZ(-764px);
}
#article_face4 {
  transform: rotateY(135deg) translateZ(-764px);
}
#article_face5 {
  transform: rotateY(180deg) translateZ(-764px);
}
#article_face6 {
  transform: rotateY(225deg) translateZ(-764px);
}
#article_face7 {
  transform: rotateY(270deg) translateZ(-764px);
}
#article_face8 {
  transform: rotateY(315deg) translateZ(-764px);
}
/* @keyframes ani {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
} */
</style>
