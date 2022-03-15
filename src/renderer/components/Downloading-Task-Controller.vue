<template>
  <div class="downloading-task-controller" v-if="videos && videos.length > 0">
    <span>合计: {{ videos ? videos.length : 0 }}</span>
      <span class="p-buttonset" style="margin-right: 0;">
      <Button label="全部开始" @click="onDownloadingStart"/>
      <Button label="全部停止" @click="onDownloadingStop"/>
      <Button label="全部删除" @click="onDownloadingRemove"/>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    videos: Array
  },
  methods: {
    onDownloadingStart () {
      this.$emit('downloadingStart')
      ipc.downloading.start(0, data => {
        console.log('download started', data)
      })
    },
    onDownloadingStop () {
      this.$emit('downloadingStop')
      ipc.downloading.stop(0, data => {
        console.log('download stop', data)
      })
    },
    onDownloadingRemove () {
      this.$emit('downloadingRemove')
      ipc.downloading.remove(0, data => {
        console.log('download remove', data)
      })
    },
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
.downloading-task-controller {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;
  margin: 1rem 0;
}

.downloading-task-controller span, .downloading-task-controller div {
  margin: 0 1rem;
}


</style>
