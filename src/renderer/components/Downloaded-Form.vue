<template>
  <div class="downloaded-form">
    <Button @click="onDownloadedRemove(video.taskId)" icon="pi pi-times" class="p-button-rounded p-button-outlined" />

  </div>
</template>

<script>
export default {
  props: {
    video: Object
  },
  methods: {
    onDownloadedRemove (taskId) {
      ipc.downloaded.remove(taskId, data => {
        console.log('download remove', data)
      })
    },
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>

.downloaded-form {
  width: 120px;
  width: var(--control-width);
  display: flex;
  flex-flow: column;
  justify-content: space-around;
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
