<template>
    <div>
      <h1>Rejoindre une partie</h1>
      <input v-model="gameId" placeholder="ID de la partie" />
      <input v-model="playerName" placeholder="Votre prénom" />
      <button @click="joinWebSocket">Rejoindre</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const gameId = ref('');
  const playerName = ref('');
  const router = useRouter();
  
  const joinWebSocket = () => {
    if (gameId.value && playerName.value) {
      router.push({ path: `/QVGDM/jeu/${gameId.value}`, query: { playerName: playerName.value } });
    }
  };
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