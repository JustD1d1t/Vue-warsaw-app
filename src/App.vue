<template>
  <the-map></the-map>
</template>

<script>
import "leaflet/dist/leaflet.css";
import TheMap from "@/components/layout/TheMap";

export default {
  components: {
    TheMap,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
