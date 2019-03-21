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
  2      // input[0] Nombre de mots
  abuiko // input[1] 1 mot
  abuiko // input[2] 1 mot
  */

  const nombreDeMots = +input[0];
  const lettresAlphabets = "abcdefghijklmnopqrstuvwxyz";
  const voyelles = "aeiouy";
  let compteur = 0;
  const motsMagiques = [];

  for (let i = 1; i < nombreDeMots + 1; i = i + 1) {
    const mot = input[i];
    const longueurMot = mot.length;

    if (longueurMot <= 7 && longueurMot >= 5) {
      // Potentiel mot magique
      const premiereLettre = mot.charAt(0);
      const deuxiemeLettre = mot[1];
      const positionPremiereLettre = lettresAlphabets.indexOf(premiereLettre);
      const positionDeuxiemeLettre = lettresAlphabets.indexOf(deuxiemeLettre);
      
      if (positionDeuxiemeLettre === positionPremiereLettre + 1) {
        // Les lettres se suivent
        const derniereLettre = mot[mot.length - 1];
        const positionDerniereLettre = voyelles.indexOf(derniereLettre);
        if (positionDerniereLettre !== -1) {
          // La lettre est une voyelle => Mot magique !
          if (!motsMagiques.includes(mot)) {
            compteur = compteur + 1;
            motsMagiques.push(mot);
          }
        }
      }
    }
  }

  console.log(compteur);
}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
