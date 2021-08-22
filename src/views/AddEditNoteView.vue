<template>
  <NoteAddEdit v-bind="$props" @close="navigateBack" />
</template>
<script>
import router from "../router";
import NoteAddEdit from "../components/notes/NoteAddEdit.vue";
export default {
  components: {
    NoteAddEdit,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  methods: {
    navigateBack() {
      let currentRoute = router.currentRoute.value.meta;
      router.push({ name: currentRoute.redirectRouteName });
    },
  },
};
</script>
