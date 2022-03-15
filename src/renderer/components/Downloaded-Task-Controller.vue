<template>
  <div class="downloaded-task-controller" v-if="videos && videos.length > 0">
    <span>合计: {{ videos ? videos.length : 0 }}</span>
      <span class="p-buttonset" style="margin-right: 0;">
        <Button label="删除已完成" @click="onDownloadedRemove"/>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    videos: Array
  },
  methods: {
    onDownloadedRemove () {
      console.log('downloadedRemove')
      ipc.downloaded.remove(0, data => {
        console.log('download remove', data)
      })
    },
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
.downloaded-task-controller {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;
  margin: 1rem 0;
}

.downloaded-task-controller span, .downloaded-task-controller div {
  margin: 0 1rem;
}


</style>
