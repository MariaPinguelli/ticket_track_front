<template>
  <div class="q-pa-md">
      <!-- Imagem antes dos eventos -->
      <q-img src="./../assets/ticket_smooth___tasty.-removebg.png"
        alt="Imagem de introdução"
        style="max-width: 300px; max-height: 300px; width: auto; height: auto; display: block; margin: 0 auto;"/>
      <div class="intro-text q-mt-md">
      <h2>Bem-vindo ao nosso site de venda de ingressos!</h2>
      <p>
        Aqui você pode encontrar ingressos para os melhores eventos da cidade. 
        Navegue por nossa seleção de eventos e compre seu ingresso com facilidade. 
        Temos opções para shows, esportes, teatros e muito mais. Aproveite e 
        não perca a oportunidade de participar dos eventos mais incríveis!
      </p>
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

            <!-- Seção da descrição do evento -->
            <q-card-section class="q-pt-none">
              <div>
                <strong>Descrição:</strong> {{ evento.description }}
              </div>
            </q-card-section>

            <q-separator inset />

            <!-- Outra seção, se necessário -->
            <q-card-section>
              Detalhes adicionais podem ser incluídos aqui.
            </q-card-section>

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
        Nenhum evento disponível no momento.
      </div>
    </div>
    <div class="q-pa-lg">
    <div class="q-gutter-md pagination-container">
      <q-pagination
        v-model="current"
        max="5"
        direction-links
        flat
        color="grey"
        active-color="primary"
      />
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ticketImage from 'src/assets/ticket_smooth___tasty.-removebg.png';

export default {
  name: 'HomePage',
  data() {
    return {
      eventos: [], // Armazena os eventos
      current: 1,
      ticketImage
    };
  },
  mounted() {
    this.carregarEventos(); // Carrega os eventos quando o componente é montado
  },
  methods: {
    async carregarEventos(page = 1, perPage = 9) {
    try {
      const resposta = await axios.get('http://localhost:3000/events', {
        params: {
          page: page,
          per_page: perPage // Nome do parâmetro deve corresponder ao que o backend espera
        }
      });
      this.eventos = resposta.data;
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
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
}

.pagination-container {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente se necessário */
  margin-top: 20px; /* Ajusta o espaçamento superior conforme desejado */
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
