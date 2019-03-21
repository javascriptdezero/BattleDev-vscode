
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
  15 // input[0]
  5 0 7 14 12 5 0 0 15 13 8 11 3 4 11 3 // input[1]
  */

  const valeurInteressante = input[0] / 2;
  let valeurs = input[1].split(" ");
  let compteur = 0;

  for (let i = 0; i < valeurs.length; i = i + 1) {
    valeurs[i] = parseInt(valeurs[i]);
  }

  for (let i = 0; i < valeurs.length - 1; i = i + 1) {
    const premiereValeur = valeurs[i];
    const deuxiemeValeur = valeurs[i+1];

    if (premiereValeur === deuxiemeValeur
      && valeurInteressante === premiereValeur) {
      console.log("INF");
      return;
    }

    if (premiereValeur < deuxiemeValeur) {
      if (valeurInteressante >= premiereValeur && valeurInteressante < deuxiemeValeur) {
        compteur = compteur + 1;
        console.error(i, premiereValeur, deuxiemeValeur);
      }
    } else {
      if (valeurInteressante <= premiereValeur && valeurInteressante > deuxiemeValeur) {
        compteur = compteur + 1;
        console.error(i, premiereValeur, deuxiemeValeur);
      }
    }
  }

  console.log(compteur);
}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
