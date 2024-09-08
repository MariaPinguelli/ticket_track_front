<script setup>
import { ref } from 'vue'
import axios from 'axios';

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

async function onSubmit() {
  loading.value = true;
  const body = { name, email, password }
  const promise = axios.post(`http://localhost:3000/users`, body)
  await promise.then((res) => console.log(res)).catch((err) => console.log(err.response))
  loading.value = false;
}

</script>


<template>
  <div class="q-pa-md" style="max-width: 400px">
      <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      <q-input color="primary" outlined bottom-slots v-model="name" type="text" label="Nome" counter clearable
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || 'Por favor, digite o seu nome'
      ]"/>
      <q-input color="primary" outlined bottom-slots  v-model="email" type="email" label="E-mail" counter clearable
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || 'Por favor, digite o seu e-mail'
      ]"
      />
      <q-input color="primary" outlined bottom-slots v-model="password"  type="password" label="Senha" counter clearable
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || 'Por favor, digite uma senha válida'
      ]"
      />

      <div>
        <q-btn :loading="loading" label="Registrar" color="primary" type="submit"/>
        <q-btn label="Cancelar" color="primary" type="reset"  flat class="q-ml-sm"/>

      </div>
    </q-form>
  </div>

</template>


