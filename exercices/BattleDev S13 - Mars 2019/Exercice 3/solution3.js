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
  4    // input[0] Grille de 4x4
  .... // ligne 0
  o.*o // ligne 1
  .... // ligne 2
  .... // ligne 3
  */

  const tailleGrille = parseInt(input[0]);
  const grille = [];
  let deplacements = [];

  for (let i = 1; i < tailleGrille + 1; i = i + 1) {
    grille.push(input[i].split(""));
  }

  for (let ligne = 0; ligne < grille.length; ligne = ligne + 1) {
    // Si la ligne est paire
    if (ligne % 2 === 0) {
      for (let colonne = 0; colonne < grille.length; colonne = colonne + 1) {
        const caseCourante = grille[ligne][colonne];
        // Collecte des pièces
        if (caseCourante === "o") {
          // On ramasse l'objet avec "x"
          deplacements.push("x");
        }

        if (colonne !== grille.length - 1) {
          deplacements.push(">");
        }
      }
    } else {
      // Si la ligne est impaire
      for (let colonne = grille.length - 1; colonne >= 0; colonne = colonne - 1) {
        const caseCourante = grille[ligne][colonne];
        // Collecte des pièces
        if (caseCourante === "o") {
          // On ramasse l'objet avec "x"
          deplacements.push("x");
        }

        if (colonne !== 0) {
          deplacements.push("<");
        }
      }
    }
    if (ligne !== grille.length - 1) {
      deplacements.push("v");
    }
  }

  // On repart dans le sens inverse pour collecter les multiplicateurs
  for (let ligne = grille.length - 1; ligne >= 0; ligne = ligne - 1) {
    // Si la ligne est paire
    if (ligne % 2 === 0) {
      for (let colonne = grille.length - 1; colonne >= 0; colonne = colonne - 1) {
        const caseCourante = grille[ligne][colonne];
        // Collecte des multiplicateurs
        if (caseCourante === "*") {
          // On ramasse l'objet avec "x"
          deplacements.push("x");
        }

        if (colonne !== 0) {
          deplacements.push("<");
        }
      }
    } else {
      // Si la ligne est impaire
      for (let colonne = 0; colonne < grille.length; colonne = colonne + 1) {
        const caseCourante = grille[ligne][colonne];
        // Collecte des multiplicateurs
        if (caseCourante === "*") {
          // On ramasse l'objet avec "x"
          deplacements.push("x");
        }

        if (colonne !== grille.length - 1) {
          deplacements.push(">");
        }
      }
    }
    if (ligne !== 0) {
      deplacements.push("^");
    }
  }

  console.log(deplacements.join(""));

}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
