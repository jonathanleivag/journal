<template>
  <NavbarVue />
  <div class="d-flex">
    <div class="col-4"><EntryListVue /></div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "daybook",
  components: {
    NavbarVue: defineAsyncComponent(() =>
      import(/* webpackChunkName: "Navbar" */ "../components/Navbar.vue")
    ),
    EntryListVue: defineAsyncComponent(() =>
      import(/* webpackChunkName: "EntryList" */ "../components/EntryList.vue")
    ),
  },
};
</script>
