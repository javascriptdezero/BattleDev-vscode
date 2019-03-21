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
  3          // input[0] Nombre d'enchères reçues
  30         // input[1] Prix de réserve de l'objet
  100 adef   // input[2] Prix de l'enchère + prénom enchérisseur
  200 ibts   // input[3]
  300 ruef   // input[4]
  */

  const nombreEncheres = +input[0];
  const prixDeReserve = +input[1];
  let prenomGagnant = "KO";
  let prixEnchereMax = 0;

  for (let i = 2; i < nombreEncheres + 2; i = i + 1) {
    const donnees = input[i].split(" ");
    const prixEnchere = +donnees[0];
    const prenomEncherisseur = donnees[1];
    
    if (prixEnchere > prixDeReserve) {
      if (prixEnchere > prixEnchereMax) {
        prixEnchereMax = prixEnchere;
        prenomGagnant = prenomEncherisseur
      }
    }

  }

  console.error(prixEnchereMax);
  console.log(prenomGagnant.toUpperCase());
}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
