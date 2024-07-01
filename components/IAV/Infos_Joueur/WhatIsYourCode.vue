<template>
    <div class="container">
        <h3>
            Quel Code As Tu ?
        </h3>
        <button @click="saveCode('A')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            A
        </button>
        <button @click="saveCode('B')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            B
        </button>
        <button @click="saveCode('C')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            C
        </button>
        <button @click="saveCode('D')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            D
        </button>
    </div>    
</template>
<script lang="ts" setup>
const emits = defineEmits<(e: "select", value: string) => void>();
const saveCode = (code: string) => {
    localStorage.setItem('gamerCode', code);
    emits('select', code);
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