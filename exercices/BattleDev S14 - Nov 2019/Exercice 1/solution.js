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
  let nombrePersonnes = +input[0];
  let valeurMinimale = 1001;
  let prenomPerdant = "";

  for (let i = 1; i <= nombrePersonnes; i++) {
    let prenom = input[i].split(" ")[0];
    let valeur = +input[i].split(" ")[1];
    
    if (valeur < valeurMinimale) {
      valeurMinimale = valeur;
      prenomPerdant = prenom;
    }
  }

  console.log(prenomPerdant);
}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
