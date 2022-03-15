<template>
  <div class="downloading-form">
    <Button :disabled="video.stat===1" @click="onDownloadingStart(video.id)" icon="pi pi-play" class="p-button-rounded p-button-outlined" />
    <Button :disabled="video.stat===0" @click="onDownloadingStop(video.id)" icon="pi pi-pause" class="p-button-rounded p-button-outlined" />
    <Button @click="onDownloadingRemove(video.id)" icon="pi pi-times" class="p-button-rounded p-button-outlined" />
  </div>
</template>

<script>
export default {
  props: {
    video: Object
  },
  methods: {
    onDownloadingStart (id) {
      ipc.downloading.start(id, data => {
        console.log('download started', data)
      })
    },
    onDownloadingStop (id) {
      ipc.downloading.stop(id, data => {
        console.log('download stop', data)
      })
    },
    onDownloadingRemove (id) {
      ipc.downloading.remove(id, data => {
        console.log('download remove', data)
      })
    },
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>

.downloading-form {
  width: 120px;
  width: var(--control-width);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
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
