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
  // Top 100 : 1000 €
  // Termine : 100 €
  // Rien si > 10000 places
  /*
  50  // input[0] place de départ
  0 1 // input[1] ceux qui m'ont dépassé     ceux dépassés
  0 1 // input[2]
  0 1
  0 1
*/

  const placeDeDepart = parseInt(input[0]);
  let placeCourante = placeDeDepart;

  for (let i = 1; i < 43; i = i + 1) {
    const donnees = input[i].split(" ");
    const gensPlusRapides = parseInt(donnees[0]);
    const gensPlusLents = parseInt(donnees[1]);

    placeCourante = placeCourante + gensPlusRapides;
    placeCourante = placeCourante - gensPlusLents;
  }

  let prix = "KO";
  if (placeCourante <= 100) {
    prix = 1000;
  } else if (placeCourante <= 10000) {
    prix = 100;
  }
  console.log(prix);

}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
