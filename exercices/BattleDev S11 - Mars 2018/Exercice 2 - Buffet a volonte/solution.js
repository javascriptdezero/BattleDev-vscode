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
  37 // input[0] prix par personne
  7  // input[1] nombre de tables servies
  3  // input[2] nombre de personnes sur une table
  15
  14
  5
  5
  14
  3
  */

  // Si >= 4 => 10%
  // Si >= 6 => 20%
  // Si >= 10 => 30%

  // nombre de personnes qui ont mangé x prix par personne
  // 3 x 37 € = 111 €

  // 4 x 37 € = 148 € avec reduc de 10%
  // Appliquer la réduction
  // 148 * (1 - 0.1) = 148 * 0.9 = 133,20 € => 134 €.

  const prixParPersonne = +input[0];
  const nombreDeTables = +input[1];

  let totalVentes = 0;
  for (let i = 2; i < nombreDeTables + 2; i = i + 1) {
    const nombreDePersonnes = +input[i];
    let ventes = nombreDePersonnes * prixParPersonne;

    if (nombreDePersonnes >= 10) {
      ventes = ventes * 0.7; // -30%
    } else if (nombreDePersonnes >= 6) {
      ventes = ventes * 0.8; // -20%
    } else if (nombreDePersonnes >= 4) {
      ventes = ventes * 0.9; // -10%
    }

    totalVentes = totalVentes + ventes;
  }

  console.log(Math.ceil(totalVentes));
}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
