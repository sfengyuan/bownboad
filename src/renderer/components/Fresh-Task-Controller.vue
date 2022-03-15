<template>
  <div class="fresh-task-controller">
    <span>合计: {{ videos.length }}</span>
    <Dropdown
      v-model="task.selected"
      :options="videos.length > 0 ? videos[0].resolutions : []"
      optionLabel="name"
      optionValue="code"
      placeholder="清晰度"
      @change="onChangeAll"
    />
    <span class="is-audio-only-field">
      <label for="is-audio-only">只下音频</label>
      <InputSwitch id="is-audio-only" v-model="task.isAudioOnly" @change="onSwitchAll" />
    </span>
    <Button label="下载" @click="onHomeDownload"/>
  </div>
</template>

<script>
export default {
  props: {
    videos: Array
  },
  data () {
    return {
      task: {
        selected: 80,
        isAudioOnly: false
      }
    }
  },
  methods: {
    onHomeDownload () {
      this.$emit('homeDownload')
    },
    onChangeAll () {
      this.$emit('changeAll', this.task.selected)
    },
    onSwitchAll () {
      this.$emit('switchAll', this.task.isAudioOnly)
    }
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
.fresh-task-controller {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;
  margin: 1rem 0;
}

.fresh-task-controller span, .fresh-task-controller div {
  margin: 0 1rem;
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
