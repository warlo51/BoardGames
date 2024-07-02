<template>
    <div class="container">
        <h3 class="mb-4 font-bold">
            Quel Corpulence as tu ?
        </h3>
        <div class="divContainerCart">
            <img src="../../../public/IAV/body/body_grand.jpg" @click="saveBody('Grand&Mince')" class="imagePerso"/>
            <img src="../../../public/IAV/body/body_grand_gros.jpg" @click="saveBody('Grand&Costaud')" class="imagePerso"/> 
        </div>
        <div class="divContainerCart mt-8">
            <img src="../../../public/IAV/body/body_petit.jpg" @click="saveBody('Petit&Mince')" class="imagePerso"/>
            <img src="../../../public/IAV/body/body_petit_gros.jpg" @click="saveBody('Petit&Costaud')" class="imagePerso"/>
        </div>
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
.imagePerso{
    width: 150px;
    margin-right: 10px;
}
.divContainerCart{
    display: flex;
    flex-direction: row;
}
</style>