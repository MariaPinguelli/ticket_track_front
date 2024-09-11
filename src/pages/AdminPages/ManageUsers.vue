<template>
  <div class="q-pa-md">
    <q-table
      ref="table"
      title="Usuários"
      :rows="users"
      :columns="tableColumns"
      row-key="id"
    >
      <template v-slot:body-cell-admin="props">
        <q-td :props="props">
          <q-chip
            :color="props.row.admin ? 'green-9' : 'amber-14'"
            :icon="props.row.admin ? 'check' : 'close'"
            text-color="white"
            clickable
            @click="() => editAdmin(props.row)"
          >
            {{ props.row.admin ? 'Sim' : 'Não' }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <!-- <q-btn
            flat
            color="primary"
            icon="edit"
            @click="editUser(props.row)"
            class="q-mr-sm"
          /> -->
          <q-btn
            flat
            color="negative"
            icon="delete"
            @click="deleteUser(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      users: [],
      tableColumns: [
        { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
        { name: 'email', label: 'E-mail', field: 'email', align: 'left' },
        { name: 'admin', label: 'É admin?', field: 'admin', align: 'center'},
        { name: 'actions', label: 'Actions', align: 'center', field: 'actions' }
      ]
    };
  },

  computed: {
    ...mapGetters(['currentUser']),
  },

  methods: {
    ...mapMutations(['SET_CURRENT_USER']),
    deleteUser(user){
      this.$q.dialog({
        title: "Confirmar",
        message: `Deseja mesmo deletar o usuário ${user.name}`

      }).onOk(() => {
        this.$axios.delete(`/users/${user.id}`).then((res) => {
          this.$q.notify({
            message: `Sucesso ao deletar usuario ${user.name}`,
            type: 'positive'
          })
          this.updateList();

        }).catch((res) => {
          this.$q.notify({
            message: `Erro ao deletar usuario ${user.name}`,
            type: 'negative'
          })
        })
      })
    },
    editAdmin(user){
      if (user.admin){
        this.$q.dialog({
          title: "Confirmar",
          message: `Deseja retirar privilégios de admin de ${user.name}?`,
          cancel: true,
        }).onOk(async () => {
          await this.editUser(false, user)
        }).onCancel(() => {})
      } else {
        this.$q.dialog({
          title: "Confirmar",
          message: `Deseja promover ${user.name} a admin?`,
          cancel: { color: 'negative' },
        }).onOk(async () => {
          await this.editUser(true, user)
        })
      }
    },
    editUser(adminStatus, user){
      this.$axios.put(`/users/${user.id}`, {admin: adminStatus}).then((res) => {
        this.$q.notify({
          message: `Atualizado!`,
          type: 'positive'
        })
        this.updateList();
        return true;
      }).catch((res) => {
        this.$q.notify({
          message: `Erro ao atualizar status de admin de ${user.name}`,
          type: 'negative'
        })
        return false;
      })
    },
    updateList(){
      this.$axios.get('/users').then((res) => {
        this.users = res.data;
      })
    }
  },
  async beforeCreate() {
    this.$axios.get('/users').then((res) => {
      this.users = res.data;
    })
  }
};
</script>