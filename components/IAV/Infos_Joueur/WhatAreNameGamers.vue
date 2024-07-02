<template>
    <div class="container">
        <h3 class="mb-4 font-bold">
            Qui sont tes adversaires ?
        </h3>
        <div class="divContainerCart" v-for="colorGamer of colorGames">
           <div v-if="color !== colorGamer" class="infoGamer">
                <div :class="getCart(colorGamer)"> </div>
                <input class="inputName" @change="($event) => updateNames(colorGamer, $event.target.value)">
           </div>
        </div>
        <button @click="validate" class="bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
         Valider
        </button> 
    </div>   
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const gamersColors: any = ref({})
const emits = defineEmits<(e: "validate", value: string) => void>();
const color = ref<string|null>(null);
const colorGames = ["Rouge", "Vert", "Jaune", "Bleu"];

const updateNames = (color: string, name: string) => {
    gamersColors.value[color] = name;
}

const validate = () => {
    localStorage.setItem("gamerNames", JSON.stringify(gamersColors.value))
    emits('validate', JSON.stringify(gamersColors.value));
}
const getCart = (value: string) => {
    return `cart${value}`;
}
// Récupérer la couleur initiale depuis le localStorage
onMounted(() => {
    if (typeof window !== 'undefined') {
        color.value = localStorage.getItem('gamerColor');
    }
});
</script>
<style lang="scss">
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.cartRouge{
    width: 150px;
    height: 150px;
    margin-right: 10px;
    background-color: red;
}
.cartBleu{
    width: 150px;
    height: 150px;
    margin-right: 10px;
    background-color: blue;
}
.cartVert{
    width: 150px;
    height: 150px;
    margin-right: 10px;
    background-color: green;
}
.cartJaune{
    width: 150px;
    height: 150px;
    margin-right: 10px;
    background-color: orange;
}
.divContainerCart{
    display: flex;
    flex-direction: row;
}
.infoGamer{
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
}
.inputName{
    border: solid 1px black;
}
</style>