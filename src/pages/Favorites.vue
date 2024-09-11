<template>
    <div class="q-pa-md">
      <!-- Imagem antes dos eventos -->
      <q-img
        :src="ticketImage"
        alt="Imagem de introdução"
        style="max-width: 300px; max-height: 300px; width: auto; height: auto; display: block; margin: 0 auto;"
      />
      <div class="intro-text q-mt-md">
        <h2>Eventos Favoritados</h2>
      </div>
  
      <div class="cards-container">
        <!-- Verifica se há eventos -->
        <template v-if="eventos.length">
          <div v-for="evento in eventos" :key="evento.id" class="card-item">
            <q-card flat bordered class="my-card">
              <!-- Seção do nome do evento -->
              <q-card-section>
                <div>
                  <strong>Nome do Evento:</strong> {{ evento.name }}
                </div>
              </q-card-section>
  
              <q-separator inset />
              <!-- Seção da descrição do evento -->
              <q-card-section>
                <div class="description-container">
                  <p :class="{ 'description-text': !evento.isExpanded, 'expanded-text': evento.isExpanded }">
                    {{ evento.description }}
                  </p>
                  
                  <q-btn
                    flat
                    color="primary"
                    class="toggle-btn"
                    @click="toggleDescription(evento.id)"
                  >
                    {{ evento.isExpanded ? 'Mostrar Menos' : 'Mostrar Mais' }}
                  </q-btn>
                </div>
              </q-card-section>
  
              <q-separator inset />
  
              <!-- Botão para favoritar o evento -->
              <q-card-actions align="right">
                <q-btn flat round color="primary" icon="favorite" @click="favoritarEvento(evento.id)">
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </template>
        <!-- Mensagem caso não haja eventos -->
        <div v-else class="card-item">
          Nenhum evento favoritado disponível no momento.
        </div>
      </div>
      
      <!-- Paginação -->
      <div class="q-pa-lg">
        <div class="pagination-container">
          <q-pagination
            v-model="current"
            :max="totalPages"
            direction-links
            flat
            color="grey"
            active-color="primary"
            @input="atualizarEventos"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ticketImage from 'src/assets/ticket_smooth___tasty.-removebg.png';
  import { mapGetters, mapMutations } from "vuex";
  
  export default {
    name: 'FavoritesPage',
    data() {
      return {
        eventos: [], // Armazena os eventos favoritados
        current: 1, // Página atual
        totalPages: 1, // Total de páginas
        ticketImage,
      };
    },
    computed: {
      ...mapGetters(['currentUser']),
      token() {
        return this.currentUser ? this.currentUser.token : null; // Ajuste conforme a estrutura do seu usuário
      }
    },
    mounted() {
      this.atualizarEventos(); // Carrega eventos favoritados quando o componente é montado
    },
    methods: {
      ...mapMutations(['SET_CURRENT_USER']),
      async atualizarEventos(page = 1, perPage = 9) {
        const token = this.token;
  
        if (!token) {
          console.error('Usuário não autenticado');
          return;
        }
  
        try {
          const resposta = await axios.get('http://localhost:3000/favorites', {
            params: {
              page: page,
              per_page: perPage,
            },
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
  
          this.eventos = resposta.data.events; // Supondo que a resposta contenha um objeto com a chave 'events'
          this.totalPages = resposta.data.totalPages; // Supondo que a resposta contenha o total de páginas
        } catch (error) {
          console.error('Erro ao carregar eventos favoritados:', error);
        }
      },
      async favoritarEvento(eventId) {
        const token = this.token;
  
        if (!token) {
          console.error('Usuário não autenticado');
          return;
        }
  
        try {
          const response = await fetch(`http://localhost:3000/events/${eventId}/favorite`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({/* dados do corpo, se necessário */}),
          });
  
          if (response.ok) {
            this.atualizarEventos(); // Atualiza a lista de eventos após favoritar
          } else {
            console.error('Erro ao favoritar evento:', response.statusText);
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      },
      
      toggleDescription(eventoId) {
        const evento = this.eventos.find(e => e.id === eventoId);
        if (evento) {
          evento.isExpanded = !evento.isExpanded;
        }
      }
    },
    created() {
      console.log(this.currentUser);
      this.SET_CURRENT_USER(this.currentUser);
    },
    watch: {
      current(newPage) {
        this.atualizarEventos(newPage); // Atualiza eventos quando a página muda
      }
    }
  }
  </script>
  
  <style scoped>
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px; /* Espaçamento entre os cards */
  }
  
  .card-item {
    flex: 1 1 calc(33.333% - 16px); /* Ajuste para 3 cards por linha com espaço para o gap */
    box-sizing: border-box; /* Inclui o padding e a borda no cálculo da largura */
  }
  
  .my-card {
    max-width: 100%;
    height: 300px; /* Define um tamanho fixo para o card */
    overflow: hidden; /* Garante que o conteúdo que excede o tamanho seja escondido */
  }
  
  .pagination-container {
    display: flex;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center; /* Centraliza verticalmente se necessário */
    margin-top: 20px; /* Ajusta o espaçamento superior conforme desejado */
  }
  
  .intro-text p {
    font-size: 16px; /* Tamanho da fonte */
    color: #333; /* Cor do texto */
    line-height: 1.5; /* Altura da linha */
  }
  
  .intro-text h2 {
    margin-bottom: 10px; /* Espaço abaixo do título */
  }
  
  .intro-text {
    text-align: center; /* Centraliza o texto */
    margin-top: 20px; /* Espaço superior para separar da imagem */
  }
  
  /* Estilo para a descrição do evento */
  .description-container {
    position: relative;
  }
  
  .description-text {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Exibe apenas 3 linhas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .expanded-text {
    display: block;
  }
  
  .toggle-btn {
    display: block;
    margin: 10px 0; /* Adiciona margem acima e abaixo do botão */
  }
  </style>
  