<template>
  <div class="container-fluid p-0">
    <router-view name="Navbar"></router-view>

    <div class="container-fluid">
      <router-view v-slot="{ Component, route }">
        <AnimatedTransition :name="route.meta.transition || 'bounce-right'">
          <component :is="Component"></component>
        </AnimatedTransition>
      </router-view>
    </div>
  </div>
</template>

<script>
import AnimatedTransition from './components/transitions/AnimatedTransition.vue';

export default {
  name: "App",
  data() {
    return {};
  },
  components: { AnimatedTransition },
};
</script>

<style>
.card {
  break-inside: avoid !important;
}
.card-columns {
  column-count: 4;
}
</style>
