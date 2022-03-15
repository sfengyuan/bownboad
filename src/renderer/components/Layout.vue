<template>
  <div class="layout">
    <div class="container">
      <div class="controller">
        <slot name="controller"></slot>
      </div>
      <Divider align="center"><span class="p-tag">{{ dividerText }}</span></Divider>
      <ul class="list">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dividerText: ''
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
.layout {
  --img-width: 150px;
  --control-width: 120px;
}

.list {
  padding: 0;
}

.list li {
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--gray-300);
}

.info {
  flex: 1;
  padding: 0 0.5rem;
  /* 150 + 120 */
  max-width: calc(100% - var(--img-width) - var(--control-width));
}
</style>
