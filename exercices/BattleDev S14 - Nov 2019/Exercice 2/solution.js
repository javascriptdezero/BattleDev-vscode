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
  // cadre CARRÉ
  // largeur identique
  // longueur différente
  // il faut même longueur, même largeur
  
  // 1. Longueur minimale
  // 2. Découpe le surplus des autres planches pour atteindre cette longeur minimale
  // 3. Calcule la somme de ce qui a été découpé
/*
Valeur min = 3

8 - 3 = 5cm
5 - 3 = 2cm
3 - 3 = 0cm
5 - 3 = 2cm

5+2+0+2 = 9
*/

  let valeurMinimale = Math.min(...input.map(Number));
  let nombreCmJetes = input.reduce(
    (resultat, longueur) => resultat + (longueur - valeurMinimale)
    , 0);

  console.log(nombreCmJetes);

}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
