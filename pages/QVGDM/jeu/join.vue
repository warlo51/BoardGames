<template>
    <div>
      <h1>Rejoindre une partie</h1>
      <input v-model="playerName" placeholder="Votre prénom" />
      <ul class="mt-8" v-if="playerName">
        <li v-for="session in sessions" :key="session">
          <button v-if="!session.includes('[')"  @click="joinWebSocket(session)">{{ session }}</button>
        </li>
      </ul>
      <button class="mt-8" @click="joinWebSocket">Rejoindre</button>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {io} from "socket.io-client";

  const gameId = ref('');
  const playerName = ref('');
  const router = useRouter();

  const sessions = ref([]);
  //const socket = io("https://board-games.fly.dev");
  const socket = io();

  const joinWebSocket = (session) => {
    if (session && playerName.value) {
      router.push({ path: `/QVGDM/jeu/${session}`, query: { playerName: playerName.value } });
    }
  };

  onMounted(()=>{
    socket.emit("message", JSON.stringify({ type: 'listParties' }));

  })

  socket.on('sessions', (message) => {
    const data = JSON.parse(message);
    console.log("data", data)
    sessions.value = data;
  });
  </script>
     <style lang="scss">
     .container {
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         height: 100vh;
     }
     </style>
