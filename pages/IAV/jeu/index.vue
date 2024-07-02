<template>
    <div class="tab">
        <div v-for="colorGame in colorGames" :key="colorGame">
            <button @click="selectedColor = colorGame" v-if="colorGame !== color" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                {{ colorGame }}
            </button>
        </div>
    </div>

    <div>
        <table class="table-auto">
            <thead>
                <tr>
                    <th class="px-4 py-2">F</th>
                    <th class="px-4 py-2">Z</th>
                    <th class="px-4 py-2">B</th>
                    <th class="px-4 py-2">X</th>
                    <th class="px-4 py-2">GG</th>
                    <th class="px-4 py-2">GM</th>
                    <th class="px-4 py-2">P</th>
                    <th class="px-4 py-2">PG</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="ligne">
                    <td v-for="(cell, colIndex) in row" :key="colIndex" class="border px-4 py-2" @click="updateData(rowIndex, colIndex)">
                        {{ cell }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

  <button @click="reset" class=" mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
    Reset
  </button>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';

// Définir l'état réactif
const color = ref<string|null>(null);
const selectedColor = ref<string|null>(null);
const data = ref<string[][]>(Array.from({ length: 15 }, () => Array(8).fill('')));
const colorGames = ["Rouge", "Vert", "Jaune", "Bleu"];

// Récupérer la couleur initiale depuis le localStorage
onMounted(() => {
    if (typeof window !== 'undefined') {
        color.value = localStorage.getItem('gamerColor');
    }
});

const reset = () => {
    localStorage.removeItem(`gameRouge`);
    localStorage.removeItem(`gameBleu`);
    localStorage.removeItem(`gameJaune`);
    localStorage.removeItem(`gameVert`);
    localStorage.removeItem(`gamerPerso`);
    localStorage.removeItem(`gamerColor`);
    localStorage.removeItem(`gamerBody`);
    localStorage.removeItem(`gamerCode`);
    window.location.href = '/IAV';
}
// Mettre à jour les données et sauvegarder dans le localStorage
const updateData = (ligne: number, colonne: number) => {
    // Assurez-vous que les indices sont valides
    if (data.value[ligne] && data.value[ligne][colonne] !== undefined) {
        console.log("toto", data.value[ligne][colonne])
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

// Observer les changements dans selectedColor pour charger les données correspondantes depuis le localStorage
watch(selectedColor, () => {
    console.log("coucou")
    if (selectedColor.value) {
        const storedData = localStorage.getItem(`game${selectedColor.value}`);
        if (storedData) {
            data.value = JSON.parse(storedData);
        } else {
            data.value = Array.from({ length: 15 }, () => Array(8).fill(''));
        }
    }
});
</script>

<style lang="scss">
.tab {
    display: flex;
    flex-direction: row;
    justify-content: center;

    button {
        margin-right: 2rem;
    }
}
.ligne {
    height: 2rem; // Ajustez comme nécessaire pour l'apparence
}
</style>
