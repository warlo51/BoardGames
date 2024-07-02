<template>
    <div class="container">
        <h3 class="mb-4 font-bold">
            Quel est ta couleur ?
        </h3>
        <div class="divContainerCart">
            <div @click="saveColor('Rouge')" class="cartRouge"> </div>
            <div @click="saveColor('Vert')" class="cartVert"> </div>
        </div>
        <div class="divContainerCart mt-8">
            <div @click="saveColor('Bleu')" class="cartBleu"></div>
            <div @click="saveColor('Jaune')" class="cartJaune"></div>
        </div>
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
</style>