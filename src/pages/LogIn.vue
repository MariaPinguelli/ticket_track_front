<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const email = ref("");
const password = ref("");
const loading = ref(false);
const $q = useQuasar();
const router = useRouter();
async function onSubmit() {
  loading.value = true;
  const body = { email: email.value, password: password.value };
  const promise = axios.post(`${process.env.API_URL}login`, body);
  await promise
    .then((res) => {
      console.log(res.data);
      const user = res.data.user;
      store.commit("SET_CURRENT_USER", user);
      router.push("/home");
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      $q.notify({
        message: "Data could not be stored due to API error",
        color: "negative",
      });
    });
  loading.value = false;
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-card flat bordered class="card">
      <q-card-section class="colum items-center justify-center">
        <div class="column items-center">
          <q-icon name="person" size="50px" color="primary" />
          <h1 class="text-center text-bold text-h1 titulo">Login</h1>
        </div>
        <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
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
              label="Entrar"
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
          Ainda não tem uma conta?
          <router-link to="/" class="link"> Cadastre-se!</router-link>
        </p>
      </q-card-section>
    </q-card>
  </div>
</template>

<style>
.titulo {
  font-size: 30px;
}

.card {
  width: 100%;
  min-width: 300px;
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
