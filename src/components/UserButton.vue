<template>
  <q-btn-dropdown round dense icon="person">
    <q-list>
      <q-item clickable v-close-popup @click="onItemClick">
        <q-item-section>
          <q-item-label>Meus eventos</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="onItemClick">
        <q-item-section>
          <q-item-label>Meu perfil</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="onItemClick">
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
function onItemClick() {
  //
}
</script>
