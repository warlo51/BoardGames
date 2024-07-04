<template>
    <div class="tab">
        <div v-for="colorGame in colorGames" :key="colorGame">
            <button :class="getColor(colorGame)" @click="selectedColor = colorGame" v-if="colorGame !== color" class="text-white font-bold py-2 px-4 rounded mb-4">
                {{ getName(colorGame) }}
            </button>
        </div>
    </div>
    <div class="divCartMe">
        <img :src="getPerso" class="cartMe"/>
        <img :src="getBody" class="cartMe"/>
        <img :src="getCode" class="cartMe"/>
    </div>
    <div class="divCartMe" v-if="selectedPersoColor !== null || selectedBodyColor !== null" :class="getColorCartOther()">
        <img :src="selectedPersoColor" class="cartMe" @click="selectedColorPerso('reset')"/>
        <img :src="selectedBodyColor" class="cartMe" @click="selectedColorBody('reset')"/>
    </div>
    <div v-if="selectedColor">
        <div :class="getColorPage()" >
        <h2 class="ml-8 font-bold">Cartes Reçus</h2>
        <table class="table-auto">
            <thead>
                <tr>
                    <th class="px-4 py-2" @click="selectedColorPerso('F')">F</th>
                    <th class="px-4 py-2" @click="selectedColorPerso('B')">B</th>
                    <th class="px-4 py-2" @click="selectedColorPerso('Z')">Z</th>
                    <th class="px-4 py-2" @click="selectedColorPerso('X')">X</th>
                    <th class="px-4 py-2" @click="selectedColorBody('grand')">
                        <img src="../../../public/IAV/icons/icon_grand.jpg"/>
                    </th>
                    <th class="px-4 py-2" @click="selectedColorBody('maigre')">
                        <img src="../../../public/IAV/icons/icon_maigre.jpg"/>
                    </th>
                    <th class="px-4 py-2" @click="selectedColorBody('petit')">
                        <img src="../../../public/IAV/icons/icon_petit.jpg"/>
                    </th>
                    <th class="px-4 py-2" @click="selectedColorBody('gros')">
                        <img src="../../../public/IAV/icons/icon_gros.jpg"/>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="ligne">
                    <td v-for="(cell, colIndex) in row" :key="colIndex" :class="getBackColor(colIndex)" class="border px-4 py-2" @click="updateData(rowIndex, colIndex, cell)">
                        {{ cell }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="mt-16" :class="getColorPage()">
        <h2 class="ml-8 font-bold">Cartes Données</h2>
        <table class="table-auto">
            <thead>
                <tr>
                    <th class="px-4 py-2">F</th>
                    <th class="px-4 py-2">B</th>
                    <th class="px-4 py-2">Z</th>
                    <th class="px-4 py-2">X</th>
                    <th class="px-4 py-2">
                        <img src="../../../public/IAV/icons/icon_grand.jpg"/>
                    </th>
                    <th class="px-4 py-2">
                        <img src="../../../public/IAV/icons/icon_maigre.jpg"/>
                    </th>
                    <th class="px-4 py-2">
                        <img src="../../../public/IAV/icons/icon_petit.jpg"/>
                    </th>
                    <th class="px-4 py-2">
                        <img src="../../../public/IAV/icons/icon_gros.jpg"/>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in dataDonnees" :key="rowIndex" class="ligne">
                    <td v-for="(cell, colIndex) in row" :key="colIndex" class="border px-4 py-2" @click="updateDataDonnee(rowIndex, colIndex)">
                        {{ cell }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>

  <button @click="reset" class="ml-8 mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
    Reset
  </button>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';

// Définir l'état réactif
const color = ref<string|null>(null);
const gamerBody = ref<string|null>(null);
const gamerPerso = ref<string|null>(null);
const gamerCode= ref<string|null>(null);
const selectedColor = ref<string|null>(null);
const selectedPersoColor = ref<string|null>('');
const selectedBodyColor = ref<string|null>('');
const gamersNames = ref();
const data = ref<string[][]>(Array.from({ length: 15 }, () => Array(8).fill('')));
const dataDonnees = ref<string[][]>(Array.from({ length: 15 }, () => Array(8).fill('')));
const colorGames = ["Rouge", "Vert", "Jaune", "Bleu"];
const getPerso = computed(()=>{
    if(gamerPerso.value === "Lord_Fiddlebottom"){
        return "/IAV/perso/lord_fiddlebottom.jpg"
    } else  if(gamerPerso.value === "Col_Bubble"){
        return  "/IAV/perso/col_bubble.jpg"
    } else  if(gamerPerso.value === "Madame_Zsa_Zsa"){
        return  "/IAV/perso/ZsaZsa.jpg"
    } else  if(gamerPerso.value === "Agent_X"){
        return  "/IAV/perso/agent_x.jpg"
    }
})

const selectedColorPerso = (value: string) => {
    if(value === "F"){
        selectedPersoColor.value =  "/IAV/perso/lord_fiddlebottom.jpg"
    } else  if(value === "B"){
        selectedPersoColor.value =  "/IAV/perso/col_bubble.jpg"
    } else  if(value === "Z"){
        selectedPersoColor.value =  "/IAV/perso/ZsaZsa.jpg"
    } else  if(value === "X"){
        selectedPersoColor.value =  "/IAV/perso/agent_x.jpg"
    }
    if(value === "reset"){
        selectedPersoColor.value =  null
        localStorage.removeItem(`selectedPersoColor${selectedColor.value}`)
    }
    if(selectedPersoColor.value)
    localStorage.setItem(`selectedPersoColor${selectedColor.value}`,selectedPersoColor.value)
}

const selectedColorBody = (value: string) => {
    if(value === "grand"){
        selectedBodyColor.value =  "/IAV/body/body_grand_gros.jpg"
    } else  if(value === "maigre"){
        selectedBodyColor.value = "/IAV/body/body_grand.jpg"
    } else  if(value === "petit"){
        selectedBodyColor.value =  "/IAV/body/body_petit.jpg"
    } else  if(value === "gros"){
        selectedBodyColor.value = "/IAV/body/body_petit_gros.jpg"
    }
    if(value === "reset"){
        selectedBodyColor.value =  null
        localStorage.removeItem(`selectedBodyColor${selectedColor.value}`)
    }
    if(selectedBodyColor.value)
    localStorage.setItem(`selectedBodyColor${selectedColor.value}`,selectedBodyColor.value)
}
const getCode = computed(()=>{
    if(gamerCode.value === "A"){
        return "/IAV/codes/A.jpg"
    } else  if(gamerCode.value === "B"){
        return  "/IAV/codes/B.jpg"
    } else  if(gamerCode.value === "C"){
        return  "/IAV/codes/C.jpg"
    } else  if(gamerCode.value === "D"){
        return  "/IAV/codes/D.jpg"
    }
})
const getBody = computed(()=>{
    if(gamerBody.value === "Grand&Mince"){
        return "/IAV/body/body_grand.jpg"
    } else  if(gamerBody.value === "Grand&Costaud"){
        return  "/IAV/body/body_grand_gros.jpg"
    } else  if(gamerBody.value === "Petit&Mince"){
        return  "/IAV/body/body_petit.jpg"
    } else  if(gamerBody.value === "Petit&Costaud"){
        return  "/IAV/body/body_petit_gros.jpg"
    }
})

const getName = (value: string) => {
    if(gamersNames.value === undefined){
        return
    }
    if(value === "Jaune" && gamersNames.value.Jaune){
        return gamersNames.value.Jaune
    } else  if(value === "Rouge" && gamersNames.value.Rouge){
        return gamersNames.value.Rouge
    } else  if(value === "Vert" && gamersNames.value.Vert){
        return gamersNames.value.Vert
    } else  if(value === "Bleu" && gamersNames.value.Bleu){
        return gamersNames.value.Bleu;
    }

}
// Récupérer la couleur initiale depuis le localStorage
onMounted(() => {
    if (typeof window !== 'undefined') {
        color.value = localStorage.getItem('gamerColor');
        gamerBody.value = localStorage.getItem("gamerBody");
        gamerPerso.value = localStorage.getItem("gamerPerso");
        gamerCode.value = localStorage.getItem("gamerCode");

        if(localStorage.getItem(`gamerNames`)){
            gamersNames.value = JSON.parse(localStorage.getItem(`gamerNames`) ?? "");
        }
    }
});

const getColor = (value: string) => {
    if(value === "Jaune"){
        return "buttonJaune";
    } else  if(value === "Rouge"){
        return "buttonRouge";
    } else  if(value === "Vert"){
        return "buttonVert";
    } else  if(value === "Bleu"){
        return "buttonBleu";
    }
    
}

const getColorPage = () => {
    if(selectedColor.value === "Rouge"){
        return "pageRouge"
    } else if(selectedColor.value === "Vert"){
         return "pageVert"
    }else if(selectedColor.value === "Jaune"){
         return "pageJaune"
    }else if(selectedColor.value === "Bleu"){
         return "pageBleu"
    }
}

const getColorCartOther = () => {
    if(selectedColor.value === "Rouge"){
        return "otherCartRouge"
    } else if(selectedColor.value === "Vert"){
         return "otherCartVert"
    }else if(selectedColor.value === "Jaune"){
         return "otherCartJaune"
    }else if(selectedColor.value === "Bleu"){
         return "otherCartBleu"
    }
}
const getBackColor = (index: number) => {
    if(gamerPerso.value === "Lord_Fiddlebottom" && index === 0){
        return "disabled"
    } else  if(gamerPerso.value === "Col_Bubble" && index === 1){
        return "disabled"
    } else  if(gamerPerso.value === "Madame_Zsa_Zsa" && index === 2){
        return "disabled"
    } else  if(gamerPerso.value === "Agent_X" && index === 3){
        return "disabled"
    }
    if(gamerBody.value === "Grand&Mince" && index === 5){
        return "disabled"
    } else  if(gamerBody.value === "Grand&Costaud" && index === 4){
        return "disabled"
    } else  if(gamerBody.value === "Petit&Mince" && index === 6){
        return "disabled"
    } else  if(gamerBody.value === "Petit&Costaud" && index === 7){
        return "disabled"
    }
}
const reset = () => {
    localStorage.removeItem(`gameRouge`);
    localStorage.removeItem(`gameBleu`);
    localStorage.removeItem(`gameJaune`);
    localStorage.removeItem(`gameVert`);
    localStorage.removeItem(`gamerPerso`);
    localStorage.removeItem(`gamerColor`);
    localStorage.removeItem(`gamerBody`);
    localStorage.removeItem(`gamerCode`);
    localStorage.removeItem(`gamerNames`);
    localStorage.removeItem(`gameSendJaune`);
    localStorage.removeItem(`gameSendRouge`);
    localStorage.removeItem(`gameSendVert`);
    localStorage.removeItem(`gameSendBleu`);
    localStorage.removeItem(`selectedBodyColorRouge`);
    localStorage.removeItem(`selectedBodyColorJaune`);
    localStorage.removeItem(`selectedBodyColorVert`);
    localStorage.removeItem(`selectedBodyColorBleu`);
    localStorage.removeItem(`selectedPersoColorRouge`);
    localStorage.removeItem(`selectedPersoColorJaune`);
    localStorage.removeItem(`selectedPersoColorVert`);
    localStorage.removeItem(`selectedPersoColorBleu`);
    window.location.href = '/IAV';
}

// Mettre à jour les données et sauvegarder dans le localStorage
const updateData = (ligne: number, colonne: number, cell: string) => {
    // Assurez-vous que les indices sont valides
    if(cell === "O"){
        return;
    }
    if (data.value[ligne] && data.value[ligne][colonne] !== undefined) {
        if(data.value[ligne][colonne] === "X") {
            data.value[ligne][colonne] = "";
        } else {
            data.value[ligne][colonne] = "X";
        }

        if (selectedColor.value) {
            localStorage.setItem(`game${selectedColor.value}`, JSON.stringify(data.value));
        }
    } else {
        console.error(`Invalid indices or data structure: ligne=${ligne}, colonne=${colonne}`);
    }
}

// Mettre à jour les données et sauvegarder dans le localStorage
const updateDataDonnee = (ligne: number, colonne: number) => {
    // Assurez-vous que les indices sont valides
    if (dataDonnees.value[ligne] && dataDonnees.value[ligne][colonne] !== undefined) {
        if(dataDonnees.value[ligne][colonne] === "X") {
            dataDonnees.value[ligne][colonne] = "";
        } else {
            dataDonnees.value[ligne][colonne] = "X";
        }

        if (selectedColor.value) {
            localStorage.setItem(`gameSend${selectedColor.value}`, JSON.stringify(dataDonnees.value));
        }
    } else {
        console.error(`Invalid indices or data structure: ligne=${ligne}, colonne=${colonne}`);
    }
}

// Observer les changements dans selectedColor pour charger les données correspondantes depuis le localStorage
watch(selectedColor, () => {
    if (selectedColor.value) {
        const storedData = localStorage.getItem(`game${selectedColor.value}`);
        const storedDataDonee = localStorage.getItem(`gameSend${selectedColor.value}`);
        selectedBodyColor.value = localStorage.getItem(`selectedBodyColor${selectedColor.value}`)
        selectedPersoColor.value = localStorage.getItem(`selectedPersoColor${selectedColor.value}`)
     
        if (storedData) {
            data.value = JSON.parse(storedData);
        } else if (!storedData) {
            data.value = Array.from({ length: 15 }, () => Array(8).fill(''));
        }
        if (storedDataDonee) {
            dataDonnees.value = JSON.parse(storedDataDonee);
        } else if (!storedDataDonee) {
            dataDonnees.value = Array.from({ length: 15 }, () => Array(8).fill(''));
        }
    }
});
</script>

<style lang="scss">
.tab {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1rem;

    button {
        margin-right: 2rem;
    }
}
.ligne {
    height: 2rem; // Ajustez comme nécessaire pour l'apparence
}
.buttonRouge{
    background-color: red;
}
.buttonJaune{
    background-color: orange;
    color: black
}
.buttonVert{
    background-color: green;
}
.buttonBleu{
    background-color: blue;
}
.disabled{
    background-color: #CDC6C4;
}
.content{
    padding-left:10px;
    padding-right:10px;
}
.pageRouge{
    color: red
}
.pageVert{
    color: green
}
.pageJaune{
    color: orange
}
.pageBleu{
    color: blue
}
.otherCartRouge{
    border: solid 1px red;
}
.otherCartVert{
    border: solid 1px green;
}
.otherCartJaune{
    border: solid 1px orange;
}
.otherCartBleu{
    border: solid 1px blue;
}
.cartMe{
    width: 100px;
    margin-right: 20px;
}
.divCartMe{
    display: flex;
    flex-direction: row;
    margin-left: 20px;
    margin-bottom: 1rem;
}
</style>
