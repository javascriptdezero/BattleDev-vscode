
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
  5   // input[0] nombre de cartons
  10  // input[1] poids du carton
  10
  10
  10
  10
  */
  // Poids pas supérieur à 100 kg
  // Poids carton entre 1 et 100 kg

  const nombreDeCartons = parseInt(input[0]);
  let chargeTotale = 0;
  let nombreAllersRetours = 0;
  for (let i = 1; i < nombreDeCartons + 1; i = i + 1) {
    const poidsDuCarton = parseInt(input[i]);
    
    chargeTotale = chargeTotale + poidsDuCarton;

    if (chargeTotale > 100) {
      nombreAllersRetours = nombreAllersRetours + 1;
      chargeTotale = poidsDuCarton;
    }
  }

  if (chargeTotale > 0) {
    nombreAllersRetours = nombreAllersRetours + 1;
  }
  console.log(nombreAllersRetours);
}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
