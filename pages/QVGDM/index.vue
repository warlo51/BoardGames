<template>
    <div class="container">
      <button  class="text-black font-bold py-2 px-4 rounded mb-4" @click="startGame">Démarrer une partie</button>
      <button class="text-black font-bold py-2 px-4 rounded mb-4" @click="joinGame">Rejoindre une partie</button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const startGame = () => {
    router.push('/QVGDM/jeu/start');
  };
  
  const joinGame = () => {
    router.push('/QVGDM/jeu/join');
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