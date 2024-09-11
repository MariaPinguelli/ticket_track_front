<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar class="logo">
            <img
              src="./../assets/ticket_smooth___tasty.-removebg.png"
              @click="navigateHome"
            />
          </q-avatar>
        </q-toolbar-title>
        <div class="q-pa-md">
          <q-btn
            v-if="!currentUser"
            round
            dense
            icon="person"
            label="Login"
            to="/login"
          />

          <user-button v-else :label="currentUser.name" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container
      class="fit row wrap justify-center items-start content-start"
    >
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-avatar class="logo">
            <img src="./../assets/ticket_smooth___tasty.-removebg.png" />
          </q-avatar>
          <div>TicketTrack</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import UserButton from "src/components/UserButton.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  components: {
    UserButton,
  },

  computed: {
    ...mapGetters(["currentUser"]),
  },

  methods: {
    ...mapMutations(["SET_CURRENT_USER"]),
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    navigateHome() {
      this.$router.push("/home");
    },
  },
  created() {
    console.log(this.currentUser);
    this.SET_CURRENT_USER(this.currentUser);
  },
};
</script>
<style>
.logo {
  width: 80px;
  height: 80px;
}
</style>
