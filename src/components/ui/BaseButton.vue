<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <!-- <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link> -->
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.5rem 1rem;
  font: inherit;
  background-color: rgb(7, 87, 7);
  border: 1px solid rgb(7, 87, 7);
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: rgb(9, 78, 9);
  border-color: rgb(9, 78, 9);
}

.flat {
  background-color: transparent;
  color: rgb(7, 87, 7);
  border: none;
}

.outline {
  background-color: transparent;
  border-color: rgb(9, 78, 9);
  color: rgb(9, 78, 9);
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: rgb(232, 240, 232);
}
</style>
