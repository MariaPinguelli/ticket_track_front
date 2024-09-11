<template>
  <q-btn-dropdown round dense icon="person">
    <q-list>
      <q-item clickable v-close-popup @click="onItemClick">
        <q-item-section>
          <q-item-label id="evento">Meus eventos</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="onItemClick">
        <q-item-section>
          <q-item-label id="perfil">Meu perfil</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="currentUser.admin" clickable v-close-popup @click="(() => $router.push('/admin/users'))">
        <q-item-section>
          <q-item-label id="logout">Gerenciar usuários</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="onItemClick(e)">
        <q-item-section>
          <q-item-label id="logout">Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapMutations(["SET_CURRENT_USER"]),
    onItemClick(event) {
      if (event.target.id === "evento") {
        this.$router.push("/favorites");
      } else if (event.target.id === "perfil") {
        this.$router.push("/user");
      } else {
        this.SET_CURRENT_USER();
      }
    },
  },
};
</script>
