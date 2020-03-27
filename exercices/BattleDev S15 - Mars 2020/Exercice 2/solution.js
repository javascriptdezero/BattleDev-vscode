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

  // Cas particuliers :
  // 0 tirages => 0
  // 1 tirage => 1
  // 2+ tirages => compter

  const nombreTirages = +input[0];
  let compteur = 0;
  let compteurMax = 0;

  if (nombreTirages === 1) {
    console.log(1);
  } else {
    let chiffrePrecedent = +input[1];
    let chiffreActuel = +input[2];
  
    if (chiffrePrecedent == chiffreActuel) {
      compteur = 2;
    } else {
      compteur = 1;
    }

    if (nombreTirages === 2) {
      console.log(compteur);
    } else {
      // Si il y a au moins 3 tirages
      for (let i = 3; i <= nombreTirages; i++) {
        chiffreActuel = +input[i];
        chiffrePrecedent = +input[i - 1];
    
        if (chiffreActuel === chiffrePrecedent) {
          compteur++;
        } else {
          compteur = 1;
        }
        
        if (compteur > compteurMax) {
          compteurMax = compteur;
        }
      }
      console.log(compteurMax);
    }
  }

}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
