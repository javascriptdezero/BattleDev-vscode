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
  // Voici le code revisité de ma solution du live, plus propre et commenté
  // Il est plus propre car il prend en compte directement le cas difficile
  // de la 1ère itération en "simulant" une valeur précédente à la toute 1ère
  // véritable valeur.

  // Note: les 4 jeux de tests originaux ne prenaient pas en compte les cas
  // particuliers où il n'y a aucun tirage, 1 seul tirage et N tirages identiques.
  // J'ai donc ajouté 3 jeux de test supplémentaires : input5.txt, input6.txt,
  // et input7.txt avec leur réponse associée output5.txt, output6.txt et output7.txt.

  /*
  Rappel : on récupère les données d'entrée sous la forme d'un tableau
  dans la variable input comme ceci par exemple :
  input = ["10", "5", "3", "3", "4", "9", "9", "9", "9", "9", "6"];

  On récupère le nombre de tirages passés qui est le 1er élément du tableau
  donc à l'index 0 (on compte toujours à partir de 0).
  On transforme la chaîne de caractère en nombre grâce à l'opérateur unaire '+'
  */
  const nombreDeTirages = +input[0];
  
  /*

  Voici l'idée de l'algorithme de base sur un exemple de tirages :

  Etape N                   Etape N+1                    Etape N+2                   

  5                           5                            5                         
  3 <-- valeurPrecedente      3                            3                         
  3 <-- valeurActuelle        3 <-- valeurPrecedente       3    
  4                           4 <-- valeurActuelle         4 <-- valeurPrecedente    
  9                           9                            9 <-- valeurActuelle                           
  9                           9                            9                         
  9                           9                            9                         
  9                           9                            9                         
  9                           9                            9                         
  6                           6                            6                         

  L'algorithme est très simple au final. On utilise un compteur et un compteurMax.
  On va compter le nombre de fois que valeurPrecedente est égale à valeurActuelle et
  ce pour toutes les valeurs comme ceci :

  SI valeurPrecedente = valeurActuelle ALORS
    compteur = compteur + 1
  SINON
    compteur = 1
  FINSI

  SI compteur > compteurMax ALORS
    compteurMax = compteur
  FINSI

  On devra faire ça pour toutes les valeurs des tirages dans une boucle.
  A la fin de la boucle on affecte la valeur de valeurActuelle dans valeurPrecedente
  puis on recommence.

  La difficulté est comment gérer la toute première itération de la boucle ?
  
  Car au début on se retrouve comme ça :

  Etape 1

  ? <-- valeurPrecedente // Qu'est-ce qu'on met pour valeur précédente ?
  5 <-- valeurActuelle                        
  3 
  3 
  4                      
  9                      
  9                      
  9                      
  9                      
  9                      
  6                      

  La solution est dans l'énoncé, les valeurs vont de 1 à 9, donc on peut initialiser
  valeurPrecedente à 0 ! Comme ça on s'assure qu'elle est forcément différente de
  la toute première véritable valeur.

  Cette solution est élégante car elle prend en compte les cas particuliers où il
  n'y a aucun tirage ou seulement 1 seul tirage. C'est ce qui m'avait posé problème
  lors du live.

  */

  // On initialise la valeurPrecedente à 0 pour être sûr qu'elle soit différente
  // de la valeur du 1er tirage.
  let valeurPrecedente = 0;

  // Notre résultat final sera stocké dans compteurMax.
  let compteur = 0;
  let compteurMax = 0;

  // On parcourt tous les tirages, on commence à i = 1 car l'index 0 de input contient
  // le nombre de tirages, ce qui ne nous intéresse pas dans cette boucle.
  for (let i = 1; i <= nombreDeTirages; i = i + 1) {
    // On récupère la valeur de la ligne i sur laquelle on se trouve, on transforme
    // la chaîne de caractères en nombre avec l'opérateur unaire '+'
    const valeurActuelle = +input[i];

    /*
    Lors de la 1ère itération valeurPrecedente vaut 0 donc elle est forcément
    différente de valeurActuelle, cette condition ne sera donc pas respectée, on ira
    dans les instructions du "else" et compteur vaudra alors 1, ce qui est cohérent.
    */
    if (valeurActuelle === valeurPrecedente) {
      compteur = compteur + 1;
    } else {
      compteur = 1;
    }

    if (compteur > compteurMax) {
      compteurMax = compteur;
    }

    valeurPrecedente = valeurActuelle;
  }

  console.log(compteurMax);

}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
