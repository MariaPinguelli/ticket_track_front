<script setup>
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar';
import axios from 'axios';


const email = ref('')
const password = ref('')
const loading = ref(false)
const $q = useQuasar()



async function onSubmit() {
  loading.value = true;
  const body =   { email: email.value, password: password.value }
  const promise = axios.post(`http://localhost:3000/login`, body)
  await promise.then((res) => {
    console.log(res.data.user)
    const user = res.data.user
    $q.localStorage.setItem("user", JSON.stringify({user}))
  }).catch((err) => {
    console.log(err.response)
    $q.notify("Data could not be stored due to API error")
  })
  loading.value = false;
}

</script>


<template>
  <div class="q-pa-md" style="max-width: 400px">
      <div >
        <h1 class="text-center text-bold text-h1 titulo">
          Login
        </h1>
        <QIcon name="person" color="primary" size="32px"/>
      </div>
      <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
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


<style>
.titulo {
font-size: 40px;
}


</style>
