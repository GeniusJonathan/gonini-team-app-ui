<template>
  <div id="application">
        <Dark />
  </div>
</template>

<script>

import Dark from "@/components/layouts/Dark.vue";


export default {
  name: "app",
  components: {
    Dark
  }
};
</script>


<style>
#application {
  overflow: hidden;
}
</style>
