<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmDialog: false,
      loading: false,
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
  },

  methods: {
    ...mapMutations(["SET_CURRENT_USER"]),
    async onSubmit() {
      const validate = this.validatePassword();
      if (validate) {
        this.loading = true;
        const body = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        const promise = this.$axios.put(`/users/${this.currentUser.id}`, body);
        await promise
          .then((res) => {
            console.log(res.data);
            this.loading = false;
            this.$q.notify({
              message: "Usuário atualizado",
              color: "positive",
            });
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    },
    validatePassword() {
      if (this.password !== this.confirmPassword) {
        this.$q.notify({
          message: "As senhas não coincidem",
          color: "negative",
        });
        return false;
      }
      return true;
    },
    async deleteAccount() {
      return this.$axios
        .delete(`/users/${this.currentUser.id}`)
        .then((res) => {
          {
            console.log(res.data);
            this.$router.push("/home");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
};
</script>

<template>
  <div>
    <q-card class="card">
      <div class="row justify-center items-center">
        <h1 class="titulo" color="gray">Atualizar perfil</h1>
        <q-icon name="edit" size="30px" color="primary" />
      </div>
      <q-card-section class="column items-center">
        <q-form
          @submit.prevent="onSubmit"
          @reset="onReset"
          class="q-gutter-md items-center"
        >
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
              label="Atualizar"
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
        <div class="colum items-center excluir">
          <q-btn
            label="Excluir conta"
            color="negative"
            @click="confirmDialog = true"
          />
        </div>
        <q-dialog v-model="confirmDialog" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar
                icon="delete_forever"
                color="primary"
                text-color="white"
              />
              <span class="q-ml-sm"
                >Deseja realmente deletar a sua conta? <br />
                A ação não poderá ser desfeita.
              </span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn label="Cancelar" color="primary" v-close-popup />
              <q-btn
                flat
                label="Deletar"
                color="negative"
                v-close-popup
                @click="deleteAccount"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-section>
    </q-card>
  </div>
</template>

<style>
.excluir {
  margin-top: 20px;
}

.titulo {
  font-size: 25px;
}
.card {
  min-width: 400px;
}
</style>
