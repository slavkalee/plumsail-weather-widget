<template>
  <div class="overlay">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(242, 243, 250, 0.64);
  backdrop-filter: blur(12px);
}

.modal {
  width: 400px;
  padding: 20px;
  box-shadow: 0 2px 4px rgb(15 23 74 / 5%), 0 8px 26px rgb(15 23 74 / 10%);
  border-radius: 5px;
  background: #fff;
}
</style>
