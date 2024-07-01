<template>
    <div class="container">
        <div v-if="showButtonPlay">
            <button @click="startGame" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                PLAY
            </button>
        </div>
        <div v-if="!showButtonPlay">
            <WhoAreYou v-if="gamerPerso === null" @select="(value) => gamerPerso = value"/>
            <WhatIsYourBody v-else-if="gamerBody === null" @select="(value) => gamerBody = value"/>
            <WhatIsYourCode v-else-if="gamerCode === null" @select="(value) => gamerCode = value"/>
            <WhatIsYourColor v-else-if="gamerColor === null" @select="(value) => gamerColor = value"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import WhoAreYou from '../../components/IAV/Infos_Joueur/WhoAreYou.vue';
import WhatIsYourBody from '../../components/IAV/Infos_Joueur/WhatIsYourBody.vue';
import WhatIsYourCode from '../../components/IAV/Infos_Joueur/WhatIsYourCode.vue';
import WhatIsYourColor from '../../components/IAV/Infos_Joueur/WhatIsYourColor.vue';

const gamerPerso = ref<string|null>(null);
const gamerCode = ref<string|null>(null);
const gamerBody = ref<string|null>(null);
const gamerColor = ref<string|null>(null);
const showButtonPlay = ref(true);

const startGame = () => {
    gamerBody.value = null;
    gamerCode.value = null;
    gamerPerso.value = null;
    gamerColor.value = null;
    showButtonPlay.value = false;
}

watch([gamerPerso, gamerCode, gamerBody, gamerColor], () => {
    if(gamerPerso.value !== null && gamerCode.value !== null && gamerBody.value !== null && gamerColor.value !== null) {
        window.location.href = '/IAV/jeu';
    }
});

onMounted(() => {
    if (typeof window !== 'undefined') {
        if(localStorage.getItem('gamerPerso')) {
        gamerPerso.value = localStorage.getItem('gamerPerso');
    }
    if(localStorage.getItem('gamerCode')) {
        gamerCode.value = localStorage.getItem('gamerCode');
    }
    if(localStorage.getItem('gamerBody')) {
        gamerBody.value = localStorage.getItem('gamerBody');
    }
    if(localStorage.getItem('gamerColor')) {
        gamerColor.value = localStorage.getItem('gamerColor');
    }
    }
});

</script>
<style lang="scss">
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>