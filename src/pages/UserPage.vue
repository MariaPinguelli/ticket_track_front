<script setup>
import { ref } from "vue";
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
async function onSubmit(params) {}
</script>

<template>
  <div>
    <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        color="primary"
        outlined
        bottom-slots
        v-model="name"
        type="text"
        label="Nome"
        counter
        clearable
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || 'Por favor, digite o seu nome',
        ]"
      />
      <q-input
        color="primary"
        outlined
        bottom-slots
        v-model="email"
        type="email"
        label="E-mail"
        counter
        clearable
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || 'Por favor, digite o seu e-mail',
        ]"
      />
      <q-input
        color="primary"
        outlined
        bottom-slots
        v-model="password"
        type="password"
        label="Senha"
        counter
        clearable
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') ||
            'Por favor, digite uma senha válida',
        ]"
      />
      <q-input
        color="primary"
        outlined
        bottom-slots
        v-model="confirmPassword"
        type="password"
        label="Confirmar senha"
        counter
        clearable
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') ||
            'Por favor, digite uma senha válida',
        ]"
      />

      <div class="row justify-center items-center">
        <q-btn
          :loading="loading"
          label="Registrar"
          color="primary"
          type="submit"
        />
        <q-btn
          label="Cancelar"
          color="primary"
          type="reset"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>
