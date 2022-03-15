<template>
  <div class="layout">
    <div class="container">
      <div class="controller">
        <slot name="controller" v-bind:videos="videos"></slot>
      </div>
      <Divider align="center" v-if="videos.length"><span class="p-tag">{{ dividerText }}</span></Divider>
      <ul class="list">
        <li v-for="video in videos" :key="video.cid">
          <img :src="video.pic" alt="thumbnail" referrerpolicy="origin"/>
          <div class="info">
            <h3 class="no-break">{{ video.title + ' | ' + video.pageTitle }}</h3>
            <p class="no-break">{{ video.desc }}</p>
          </div>
          <slot v-bind:video="video"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videos: Array,
    dividerText: String
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
.layout {
  --img-width: 150px;
  --control-width: 125px;
}

.list {
  padding: 0;
}

.list li {
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--gray-300);
}

.list img {
  width: var(--img-width);
}
.info {
  flex: 1;
  padding: 0 0.5rem;
  /* 150 + 120 */
  max-width: calc(100% - var(--img-width) - var(--control-width));
}
.list h3 {
  font-size:1rem;
}
</style>
