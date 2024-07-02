<template>
    <div class="container">
        <h3>
            Quel Corpulence as tu ?
        </h3>
        <button @click="saveBody('Grand&Mince')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Grand et Mince
        </button>
        <button @click="saveBody('Grand&Costaud')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Grand et Costaud
        </button>
        <button @click="saveBody('Petit&Mince')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Petit et Mince
        </button>
        <button @click="saveBody('Petit&Costaud')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Petit et Costaud
        </button>
    </div>    
</template>
<script lang="ts" setup>
const emits = defineEmits<(e: "select", value: string) => void>();
const saveBody = (body: string) => {
    localStorage.setItem('gamerBody', body);
    emits('select', body);
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