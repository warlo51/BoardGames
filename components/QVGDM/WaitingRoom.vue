<template>
    <div>
      <h2>Salle d'attente</h2>
      <ul>
        <li v-for="player in players" :key="player.name">
          {{ player.name }} <span v-if="player.isGameMaster">(Maître du jeu)</span>
        </li>
      </ul>
      <div v-if="isGameMaster">
        <button @click="startGame">Démarrer le jeu</button>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue';
  import { io } from "socket.io-client";

  const props = defineProps(['gameId', 'playerName', 'isGameMaster']);
  const players = ref([]);
  //const socket = io("https://board-games.fly.dev");
  const socket = io();

  console.log("socket",socket)
  const startGame = () => {
    socket.emit("message", JSON.stringify({ type: 'startGame', gameId: props.gameId }));
  };

  socket.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'playerList':
        players.value = data.players;
        break;
      case 'startGame':
        window.location.href = `/QVGDM/jeu/${props.gameId}?id=${props.playerName}&playerName=${props.playerName}&isGameMaster=${props.isGameMaster}`;
        break;
    }
    });


  onMounted(() => {
    socket.emit("message", JSON.stringify({ type: 'register', id: props.playerName, name: props.playerName, isGameMaster: props.isGameMaster, gameId: props.gameId }));
});
  </script>
