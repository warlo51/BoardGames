<template>
    <div class="container">
        <h3>
            Quel est ta couleur ?
        </h3>
        <button @click="saveColor('Rouge')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Rouge
        </button>
        <button @click="saveColor('Vert')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Vert
        </button>
        <button @click="saveColor('Bleu')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Bleu
        </button>
        <button @click="saveColor('Jaune')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Jaune
        </button>
    </div>    
</template>
<script lang="ts" setup>
const emits = defineEmits<(e: "select", value: string) => void>();
const saveColor = (color: string) => {
    localStorage.setItem('gamerColor', color);
    emits('select', color);
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