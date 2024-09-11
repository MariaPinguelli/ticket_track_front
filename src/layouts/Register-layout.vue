<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar class="logo">
            <img src="./../assets/ticket_smooth___tasty.-removebg.png" />
          </q-avatar>
        </q-toolbar-title>
        <div class="q-pa-md">
          <q-btn
            v-if="labelName?.value === null || labelName?.value === undefined"
            round
            dense
            icon="person"
            label="Login"
            to="/login"
          />

          <user-button v-else :label="labelName" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <!-- drawer content -->
    </q-drawer>

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

<script setup>
import { ref } from "vue";
import UserButton from "src/components/UserButton.vue";
import { data } from "autoprefixer";
const leftDrawerOpen = ref(false);

const lsUser = localStorage.getItem("user");
const rightUser = lsUser ? JSON.parse(lsUser?.replace("__q_strn|", "")) : null;
let labelName = ref(null);
if (rightUser) {
  const { user } = rightUser;
  const { name } = user;
  labelName.value = name;
}

console.log("labelname", labelName.value);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function onItemClick() {
  //
}
</script>
<style>
.logo {
  width: 80px;
  height: 80px;
}
</style>
