<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const router = useRouter();

async function onSubmit() {
  loading.value = true;
  const body = {
    user: { name: name.value, email: email.value, password: password.value },
  };
  const promise = axios.post(`${process.env.API_URL}/users`, body);
  await promise
    .then((res) => {
      console.log(res.data);
      router.push("/login");
    })
    .catch((err) => console.log(err.response));
  loading.value = false;
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-card class="card">
      <q-card-section class="column justify-center items-center">
        <div class="column justify-start items-center">
          <q-img src="./../assets/ticket smooth & tasty..png" />
        </div>
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
                (val !== null && val !== '') ||
                'Por favor, digite o seu e-mail',
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
        <p class="paragrafo">
          Já tem uma conta? Faça o
          <router-link to="/login" class="link">login</router-link>
        </p>
      </q-card-section>
    </q-card>
  </div>
</template>

<style>
.card {
  width: 100%;
  min-width: 300px;
}

.titulo {
  font-size: 20px;
}

.link {
  text-decoration: none;
  color: #1976d2;
  font-weight: bold;
}

.paragrafo {
  margin-top: 10px;
}
</style>
