<template>
     <div class="container">
      <p>ID de la partie: {{ gameId }}</p>
      <button class="text-black font-bold py-2 px-4 rounded mb-4"  @click="startWebSocket">Démarrer</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const gameId = ref(Math.random().toString(36).substr(2, 9));
  const router = useRouter();
  
  const startWebSocket = () => {
    const playerName = prompt('Entrez votre prénom:');
    router.push({ path: `/QVGDM/jeu/${gameId.value}`, query: { playerName, isGameMaster: true } });
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