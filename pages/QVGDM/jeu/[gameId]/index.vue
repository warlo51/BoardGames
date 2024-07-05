<template>
    <div>
      <Player :gameId="gameId" :playerName="playerName" :isGameMaster="isGameMaster" />
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import Player from '@/components/QVGDM/Player.vue';
  
  const route = useRoute();
  const gameId = route.params.gameId;
  const playerName = route.query.playerName;
  const isGameMaster = route.query.isGameMaster === 'true';
  </script>
  
  