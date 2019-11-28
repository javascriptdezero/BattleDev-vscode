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
            787               2211                         
787 2211  ---[---------------------]--------------------
                    2063    2131                        
2063 2131 -----------[-------]--------------------------
                              2199          2376
2199 2376 ----------------------[-------------]---------

*/

// 1. Classer dans l'ordre de date de début les requetes

  const [nombreCables, nombreRequetes] = input[0].split(" ").map(Number);
  let requetes = [];
  for (let i = 1; i <= nombreRequetes; i++) {
    requetes.push(input[i].split(" ").map(Number));
  }

  requetes.sort(function(a,b) {
    // a = [ 2063, 2131 ]
    return a[0] - b[0];
  });

  let tempsMax = Math.max(...requetes.map(valeur => valeur[1]));

  // Stock de cables
  let stockDeCables = [];
  for( let i = 1; i <= nombreCables; i++) {
    stockDeCables.push(i);
  }
  
// 2. Parcourir dans le temps toutes les requetes et mettre à jour notre sac de cables
  let temps = 0;
  let listeCables = [];
  while (temps <= tempsMax) {
    // Quand le temps est = à date début d'une requete
    // affecter un cable
    // Si un cable est dispo, on affecte
    // Si pas de cable dispo => pas possible
    for (let i = 0; i < requetes.length; i++) {
      const dateDebut = requetes[i][0];
      const dateFin = requetes[i][1];

      if (temps === dateFin) {
        // libérer un cable
        stockDeCables.push(requetes[i].numeroCable);
      }

      if (temps === dateDebut) {
        // Si un cable est dispo, on affecte
        if (stockDeCables.length > 0) {
          const cable = stockDeCables.pop();
          requetes[i].numeroCable = cable;
          listeCables.push(cable);
        } else {
          console.log("pas possible");
          return;
        }
      }

    }
    temps++;
  }

  console.log(listeCables.join(" "));

}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
