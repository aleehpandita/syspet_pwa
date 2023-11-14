<!-- CustomButton.vue -->

<template>
  <b-button @click="handleClick">{{ buttonText }}</b-button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    buttonText: String,
  },
  methods: {
    handleClick() {
      this.$emit("customClick")
    },
  },
}
</script>
