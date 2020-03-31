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
  // Voici le code produit lors du live de la BattleDev que vous pouvez voir ici :
  // https://www.youtube.com/watch?v=4KFebrVWZ54

  // rouge : 3
  // jaune : 2
  // bleu : 1
  // rouge jaune
  // Il faut compter le nombre de fois qu'une couleur est donnée
  const nombreCouleurs = +input[0];
  const compteurCouleurs = {};

  for (let i = 1; i <= nombreCouleurs; i = i + 1) {
    const couleur = input[i];

    // Si on a déjà lu la couleur alors
    if (couleur in compteurCouleurs) {
      // Ajouter 1 au nombre de fois qu'on a vu cette couleur
      compteurCouleurs[couleur] = compteurCouleurs[couleur] + 1;
    } else {
      // Sinon on compte 1 fois la nouvelle couleur
      compteurCouleurs[couleur] = 1;
    }
  }

  // Il faut trier les quantités pour afficher les 2 premières
  let quantites = Object.values(compteurCouleurs);

  // Première couleur
  let valeurMax = Math.max(...quantites);
  let indexValeurMax = quantites.indexOf(valeurMax);
  let premiereCouleur = Object.keys(compteurCouleurs)[indexValeurMax];

  // Met à 0 la couleur majoritaire pour ne pas la retrouver à nouveau
  compteurCouleurs[premiereCouleur] = 0;

  // Deuxième couleur
  quantites = Object.values(compteurCouleurs);
  valeurMax = Math.max(...quantites);
  indexValeurMax = quantites.indexOf(valeurMax);
  const deuxiemeCouleur = Object.keys(compteurCouleurs)[indexValeurMax];

  console.log(premiereCouleur + " " + deuxiemeCouleur);

}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
