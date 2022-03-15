<template>
<li>
  <img :src="video.pic" alt="cover" />
  <div class="info">
    <h3 class="no-break">{{ video.title + '|' + video.pageTitle }}</h3>
    <p class="no-break">{{ video.desc }}</p>
  </div>
  <slot></slot>
</li>
</template>

<script>
export default {
  name: '',
  props: {
    video: Object
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
.resolution-form {
  width: 120px;
  width: var(--control-width);
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}

.info {
  flex: 1;
  padding: 0 0.5rem;
  /* 150 + 120 */
  max-width: calc(100% - var(--img-width) - var(--control-width));
}

</style>
