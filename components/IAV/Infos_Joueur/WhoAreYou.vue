<template>
    <div class="container">
        <h3 class="mb-4">
            Qui es tu ?
        </h3>
        <button @click="savePerso('Lord_Fiddlebottom')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Lord Fiddlebottom
        </button>
        <button @click="savePerso('Col_Bubble')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Col. Bubble
        </button>
        <button @click="savePerso('Madame_Zsa_Zsa')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Madame Zsa Zsa
        </button>
        <button @click="savePerso('Agent_X')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Agent X
        </button>
    </div>    
</template>
<script lang="ts" setup>

const emits = defineEmits<(e: "select", value: string) => void>();
const savePerso = (perso: string) => {
    localStorage.setItem('gamerPerso', perso);
    emits('select', perso);
}

</script>
<style lang="scss">
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>