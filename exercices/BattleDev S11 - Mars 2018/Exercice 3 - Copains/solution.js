// Ne supprimez pas ces lignes
// Chargement de l'input de test
let input;
function initInput(valeur) {
  input = valeur;
}

// Ne supprimez pas ces lignes
// Support de LocalPrint et LocalPrintArray utilisées dans les
// réponses des exercices de la saison 11
function LocalPrint(chaine) {
  console.error(chaine);
}
function LocalPrintArray(chaine) {
  console.error(chaine);
}

// -- Développez votre code dans la fonction ContestResponse ci-après
function ContestResponse() {
  // Implémentez votre code ci-dessous
  /*
  2 2 9 1 2     // input[0] Mes notes de Rocky 1-5
  5             // input[1] N nombre de copains
  2             // input[2] K nombre de meilleurs copains
  10 7 1 7 3 0  // input[3] Notes des copains 1-6
  7 6 1 7 6 7   // input[4]
  7 6 5 7 7 3   // input[5]
  8 4 2 9 5 4   // input[6]
  7 3 2 5 6 1   // input[7]
  */
  
  const chaineMesNotes = input[0].split(" ");
  let mesNotes = [];
  
  for(let i = 0; i < chaineMesNotes.length; i = i + 1) {
    mesNotes.push(+chaineMesNotes[i]);
  }
  
  const nombreDeCopains = +input[1];
  const nombreDeMeilleursCopains = +input[2];
  let distances = [];

  for (let i = 3; i < nombreDeCopains + 3; i = i + 1) {
    const chaineNotesCopains = input[i].split(" ");
    let notesCopains = [];
    for(let i = 0; i < chaineNotesCopains.length; i = i + 1) {
      notesCopains.push(+chaineNotesCopains[i]);
    }

    let distance = 0;
    for (let i = 0; i < mesNotes.length; i = i + 1) {
      distance = distance + Math.abs(mesNotes[i] - notesCopains[i]);
    }
    distances.push(distance);
  }

  let somme = 0;
  for (let i = 0; i < nombreDeMeilleursCopains; i = i + 1) {
    const positionMeilleurCopain = distances.indexOf(Math.min(...distances));
    const noteRocky6 = +input[positionMeilleurCopain + 3].split(" ").slice(-1);
    somme = somme + noteRocky6;
    distances[positionMeilleurCopain] = Number.MAX_VALUE;
  }
  
  console.log(Math.floor(somme / nombreDeMeilleursCopains));
}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
