<template>
    <div class="container">
        <h3 class="mb-4 font-bold">
            Quel Code As Tu ?
        </h3>
        <div class="divContainerCart">
            <img src="../../../public/IAV/codes/A.jpg" @click="saveCode('A')" class="imagePerso"/>
            <img src="../../../public/IAV/codes/B.jpg" @click="saveCode('B')" class="imagePerso"/> 
        </div>
        <div class="divContainerCart mt-8">
            <img src="../../../public/IAV/codes/C.jpg" @click="saveCode('C')" class="imagePerso"/>
            <img src="../../../public/IAV/codes/D.jpg" @click="saveCode('D')" class="imagePerso"/>
        </div>
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
.imagePerso{
    width: 150px;
    margin-right: 10px;
}
.divContainerCart{
    display: flex;
    flex-direction: row;
}
</style>