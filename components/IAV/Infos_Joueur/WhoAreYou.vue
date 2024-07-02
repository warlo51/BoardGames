<template>
    <div class="container">
        <h3 class="mb-4 font-bold">
            Qui es tu ?
        </h3>
        <div class="divContainerCart">
            <img src="../../../public/IAV/perso/lord_fiddlebottom.jpg" @click="savePerso('Lord_Fiddlebottom')" class="imagePerso"/>
            <img src="../../../public/IAV/perso/col_bubble.jpg" @click="savePerso('Col_Bubble')" class="imagePerso"/> 
        </div>
        <div class="divContainerCart mt-8">
            <img src="../../../public/IAV/perso/ZsaZsa.jpg" @click="savePerso('Madame_Zsa_Zsa')" class="imagePerso"/>
            <img src="../../../public/IAV/perso/agent_x.jpg" @click="savePerso('Agent_X')" class="imagePerso"/>
        </div>
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
.imagePerso{
    width: 150px;
    margin-right: 10px;
}
.divContainerCart{
    display: flex;
    flex-direction: row;
}
</style>