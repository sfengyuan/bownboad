<template>
  <div class="resolution-form">
    <Dropdown
      v-model="video.selected"
      :options="video.resolutions"
      optionLabel="name"
      optionValue="code"
      placeholder="清晰度"
    />
    <span class="is-audio-only-field">
      <label for="is-audio-only">只下音频</label>
      <InputSwitch id="is-audio-only" v-model="video.isAudioOnly" />
    </span>
  </div>
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

.resolution-form > div {
  margin: 1rem 0;
}

.is-audio-only-field {
  display: flex;
  align-items: center;
}

.is-audio-only-field label {
  font-size: 0.8rem;
  padding: 0 0.5rem;
}
</style>
