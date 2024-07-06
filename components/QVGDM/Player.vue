<template>
    <div>
      <WaitingRoom v-if="!gameStarted" :gameId="gameId" :playerName="playerName" :isGameMaster="isGameMaster" />
      <div v-else-if="waitingQuestion && !isGameMaster">
        <h2>En attente de la question</h2>
      </div>
      <div v-else>
        <div v-if="!isGameMaster">
            <div class="progress-container">
                <div class="progress-bar" :style="{ height: progressBarHeight + '%' }">{{ timeLeft }}</div>
            </div>
          <div v-if="responseReceived === ''" class="buttonsSelection" :class="{disabled : progressBarisRunning === false}">
            <div class="line">
            <button @click="sendButtonPress('A')" class="button" :class="getColor('A')">A</button>
            <button @click="sendButtonPress('B')" class="button" :class="getColor('B')">B</button>
          </div>
          <div class="line">
            <button @click="sendButtonPress('C')" class="button" :class="getColor('C')">C</button>
            <button @click="sendButtonPress('D')" class="button" :class="getColor('D')">D</button>
          </div>
          </div>
          <div v-else-if="responseReceived !== ''" class="buttonsSelection" :class="{disabled : progressBarisRunning === false}">
            <div class="line">
            <button @click="sendButtonPress('A')" class="button" :class="getColorWithResponse('A',false)">A</button>
            <button @click="sendButtonPress('B')" class="button" :class="getColorWithResponse('B',false)">B</button>
          </div>
          <div class="line">
            <button @click="sendButtonPress('C')" class="button" :class="getColorWithResponse('C',false)">C</button>
            <button @click="sendButtonPress('D')" class="button" :class="getColorWithResponse('D',false)">D</button>
          </div>
          </div>
        </div>
        <div v-else>
            <div class="progress-container">
                <div class="progress-bar" :style="{ height: progressBarHeight + '%' }">{{ timeLeft }}</div>
            </div>
          <table class="tableScore">
            <thead>
              <tr>
                <th class="px-4 py-2">Player</th>
                <th class="px-4 py-2">Button</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(player, id) in playerButtons" :key="id">
                <td class="border px-4 py-2">{{ player.name }}</td>
                <td class="border px-4 py-2" :class="getColorWithResponse(player.button, true)">{{ player.button }}</td>
              </tr>
            </tbody>
          </table>
          <div class="buttonsReponse">
            <input type="text" class="bg-white border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" v-model="reponse" placeholder="Réponse" />
            <button class="ml-8 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" @click="setResult">Envoyer la réponse</button>
          </div>
          <div class="buttonsAdmin">
            <button class="ml-8 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" @click="resetGame">Question Suivante</button>
            <button v-if="progressBarisRunning" class="ml-8 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" @click="stopTimerGame">Stop Sablier</button>
            <button v-else-if="!progressBarisRunning" class="ml-8 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" @click="startTimer">Go Sablier</button>
            <button class="ml-8 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" @click="closeSession">Fin de partie</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal">
    <div class="modal-content">
      <p>C'est votre dernier mot ?</p>
      <button @click="confirm(true)" class="buttonValidation">Oui</button>
      <button @click="confirm(false)" class="buttonValidation">Non</button>
    </div>
  </div>
  </template>

  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import WaitingRoom from '@/components/QVGDM/WaitingRoom.vue';
  import { io } from "socket.io-client";
  import {useRouter} from "vue-router";

  const props = defineProps(['gameId', 'playerName', 'isGameMaster']);
  const playerId = ref('');
  const reponse = ref('');
  const responseReceived = ref('');
  const gameStarted = ref(false);
  const playerButtons = ref({});
  const waitingQuestion = ref(true);
  const showModal = ref(false);
  const buttonSelected = ref('');
  const router = useRouter();
  const timeLeft = ref(60);
  const progressBarisRunning = ref(false);
  const progressBarHeight = computed(() => (timeLeft.value / (props.initialTime || 60)) * 100);

  const eliminated = ref(false)

  watch(responseReceived, () => {
    if(responseReceived.value  !== buttonSelected.value){
      eliminated.value = true;
    }
  });

  watch(eliminated, () => {
    if(eliminated.value  === true){
      socket.emit('message', JSON.stringify({ type: 'eliminated', gameId: props.gameId, playerId: playerId.value }));
    }
  });
  const socket = io("https://board-games.fly.dev");
  //const socket = io();

  const sendButtonPress = (button) => {
    showModal.value = true;
    buttonSelected.value = button;
  };

  const closeSession = () => {
    const gameInfo = localStorage.removeItem("gameStarted");
  socket.emit('message', JSON.stringify({ type: 'close', gameId: props.gameId }));
  }
  const getColor = (value) => {
    if(buttonSelected.value === 'A' && value === 'A'){
      return 'selectedResponse';
    }else if(buttonSelected.value === 'B' && value === 'B'){
      return 'selectedResponse';
    }
      else if(buttonSelected.value === 'C' && value === 'C'){
        return 'selectedResponse';
      }
        else if(buttonSelected.value === 'D' && value === 'D'){
          return 'selectedResponse';
        } else {
            if(progressBarisRunning.value === true){
                return 'buttonsSelection';
            } else {
                return 'disabled';
            }
        }
  };

  const getColorWithResponse = (value, admin) => {
    if(admin === false){
        if(value === responseReceived.value){
            return 'goodResponse';
        }
    return "badResponse";
    }else {
        if(reponse.value !== ''){
            if(value === responseReceived.value){
      return 'goodResponse';
    }
    return "badResponse";
        }
    }

  };
  const confirm = (value) => {
    if(value === true && buttonSelected.value !== ''){
        progressBarisRunning.value = false;
        socket.emit("message", JSON.stringify({ type: 'buttonPress', id: playerId.value, name: props.playerName, button: buttonSelected.value, gameId: props.gameId }));
    }else{
        buttonSelected.value = '';
    }
    showModal.value = false;
  }

  const resetGame = () => {
    socket.emit("message", JSON.stringify({ type: 'nextQuestion', gameId: props.gameId }));
    progressBarisRunning.value = true;
    playerButtons.value = {};
  };

  const stopTimerGame = () => {
    socket.emit("message", JSON.stringify({ type: 'stopTimer', gameId: props.gameId }));
    progressBarisRunning.value = false;
  };

  const setResult = () => {
    progressBarisRunning.value = false;
    socket.emit("message", JSON.stringify({ type: 'reponse', gameId: props.gameId, reponse: reponse.value }));
  };
  const startDecrementing = () => {

  interval = setInterval(() => {
    if (timeLeft.value > 0 && progressBarisRunning.value === true) {
      timeLeft.value--;
    }
  }, 2000);
}
  socket.on('btnClicked', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'buttonPress':
        playerButtons.value[data.id] = { name: data.name, button: data.button };
        break;
    }});
  socket.on('close', (message) => {
    router.push({ path: `/QVGDM/`});
  });
    socket.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'buttonPress':
        playerButtons.value[data.id] = { name: data.name, button: data.button };
        break;
      case 'nextQuestion':
        waitingQuestion.value = false;
        progressBarisRunning.value = false;
        responseReceived.value = '';
        response.value = '';
        buttonSelected.value = '';
        timeLeft.value = 60;
        playerButtons.value = {};
        break;
      case 'startGame':
        localStorage.setItem("gameStarted", JSON.stringify({ gameId: props.gameId, started: true }));
        gameStarted.value = true;
        break;
        case 'reponse':
        responseReceived.value = data.reponse;
        break;
    case 'stopTimer':
        progressBarisRunning.value = false;
        break;
    case 'startTimer':
        timeLeft.value = 60;
        progressBarisRunning.value = true;
        startDecrementing();
        break;
    }
    });

    const startTimer = () => {
        socket.emit("message", JSON.stringify({ type: 'startTimer', gameId: props.gameId }));
    }
  onMounted(() => {
    playerId.value = props.playerName;
    const gameInfo = localStorage.getItem("gameStarted");

    if(gameInfo) {
      const gameData = JSON.parse(gameInfo);
      if(gameData.gameId === props.gameId && gameData.started) {
        gameStarted.value = true;
      }
    }
    if(!gameStarted.value) {
      socket.emit("message", JSON.stringify({ type: 'register', id: playerId.value, name: props.playerName, isGameMaster: props.isGameMaster, gameId: props.gameId }));
    }
  });
  </script>
  <style lang="scss">
.line{
    display: flex;
    justify-content: center;

    .button{
        width: 300px;
        height: 370px;
        border: solid 0.5px black;
    }
}
.buttonsSelection{
    background-color: white;
}
.disabled{
        background-color: grey;
        pointer-events: none;
}
.goodResponse{
        background-color: green;
        pointer-events: none;
}
.badResponse{
    background-color: red;
    pointer-events: none;
}
.selectedResponse{
    background-color: rgb(53, 53, 151);
    color: white;
    pointer-events: none;
}
.buttonsReponse{
    margin-left: 40px;
    margin-top: 20rem;
    text-align: center;
    display: flex;
    flex-direction: column;
}
.tableScore{
    margin-left: 40px;
    text-align: center;
    justify-content: center;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.buttonValidation{
    margin-right: 1rem;
    margin-top:1rem;
}
.progress-container {
  width: 30px;
  height: 100%;
  border: 2px solid var(--border-color);
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  --progress-width: 20px;
  --progress-height: 300px;
  --bar-color: #4caf50;
  --border-color: #000;
  --transition-duration: 500ms;
}

.progress-bar {
  width: 100%;
  background-color: var(--bar-color);
  position: absolute;
  bottom: 0;
  transition: height var(--transition-duration) ease;
}

.time-remaining {
  position: absolute;
  top: 0;
  left: 100%;
  padding-left: 10px;
  font-size: 14px;
  color: #000;
}
.buttonsAdmin{
    display: flex;
    justify-content: center;
    margin-top: 10rem;
}
</style>
