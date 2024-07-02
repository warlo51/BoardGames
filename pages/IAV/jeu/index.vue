<template>
    <div class="tab">
        <div v-for="colorGame in colorGames" :key="colorGame">
            <button :class="getColor(colorGame)" @click="selectedColor = colorGame" v-if="colorGame !== color" class="text-white font-bold py-2 px-4 rounded mb-4">
                {{ getName(colorGame) }}
            </button>
        </div>
    </div>
    <div v-if="selectedColor">
        <div :class="getColorPage()" >
        <h2 class="ml-8 font-bold">Cartes Reçus</h2>
        <table class="table-auto">
            <thead>
                <tr>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart" src="../../../public/IAV/perso/lord_fiddlebottom.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/perso/ZsaZsa.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/perso/col_bubble.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/perso/agent_x.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/icons/icon_grand.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/icons/icon_maigre.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/icons/icon_petit.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/icons/icon_gros.jpg"/>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="ligne">
                    <td v-for="(cell, colIndex) in row" :key="colIndex" :class="getBackColor(cell)" class="border px-4 py-2" @click="updateData(rowIndex, colIndex, cell)">
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
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/perso/lord_fiddlebottom.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/perso/ZsaZsa.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/perso/col_bubble.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/perso/agent_x.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/icons/icon_grand.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/icons/icon_maigre.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/icons/icon_petit.jpg"/>
                    </th>
                    <th class="px-4 py-2 imgCart">
                        <img class="imgCart"  src="../../../public/IAV/icons/icon_gros.jpg"/>
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
import { ref, onMounted, watch } from 'vue';

// Définir l'état réactif
const color = ref<string|null>(null);
const selectedColor = ref<string|null>(null);
const gamersNames = ref();
const data = ref<string[][]>(Array.from({ length: 15 }, () => Array(8).fill('')));
const dataDonnees = ref<string[][]>(Array.from({ length: 15 }, () => Array(8).fill('')));
const colorGames = ["Rouge", "Vert", "Jaune", "Bleu"];

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
        if(localStorage.getItem(`gamerNames`)){
            console.log("toto", localStorage.getItem(`gamerNames`))
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
const getBackColor = (value: string) => {
    if(value === "O"){
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
            localStorage.setItem(`gameReceive${selectedColor.value}`, JSON.stringify(dataDonnees.value));
        }
    } else {
        console.error(`Invalid indices or data structure: ligne=${ligne}, colonne=${colonne}`);
    }
}

// Observer les changements dans selectedColor pour charger les données correspondantes depuis le localStorage
watch(selectedColor, () => {
    if (selectedColor.value) {
        const storedData = localStorage.getItem(`game${selectedColor.value}`);
        const storedDataDonee = localStorage.getItem(`gameReceive${selectedColor.value}`);
        if (storedData) {
            data.value = JSON.parse(storedData);
            dataDonnees.value = JSON.parse(storedDataDonee);
        } else {
            data.value = Array.from({ length: 15 }, () => Array(8).fill(''));
            dataDonnees.value = Array.from({ length: 15 }, () => Array(8).fill(''));

            const gamerBody = localStorage.getItem("gamerBody");
            const gamerPerso = localStorage.getItem("gamerPerso");

            for(const [index, ligne] of data.value.entries()){
                if(gamerBody === "Grand&Mince"){
                    data.value[index][5] = "O";
                }else if(gamerBody === "Grand&Costaud"){
                    data.value[index][4] = "O";
                }else if(gamerBody === "Petit&Mince"){
                    data.value[index][6] = "O";
                }else if(gamerBody === "Petit&Costaud"){
                    data.value[index][7] = "O";
                }
            }
            for(const [index, ligne] of data.value.entries()){
                if(gamerPerso === "Lord_Fiddlebottom"){
                    data.value[index][0] = "O";
                }else if(gamerPerso === "Col_Bubble"){
                    data.value[index][2] = "O";
                }else if(gamerPerso === "Madame_Zsa_Zsa"){
                    data.value[index][1] = "O";
                }else if(gamerPerso === "Agent_X"){
                    data.value[index][3] = "O";
                }
            }
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
.imgCart{
    width: 70px;
    height: 50px;
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
    background-color: grey;
    color: grey;
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
</style>
