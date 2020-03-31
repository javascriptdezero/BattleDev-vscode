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
  // Voici une solution plus propre et commentée que celle que j'ai faite
  // en live. Vous pouvez voir le live ici : https://www.youtube.com/watch?v=4KFebrVWZ54

  /*
  Rappel : on récupère les données d'entrée sous la forme d'un tableau
  dans la variable input comme ceci par exemple :
  input = [ "6", "rouge", "jaune", "bleu", "rouge", "jaune", "rouge" ];
  
  On récupère le nombre de couleurs à lire qui est le 1er élément du tableau
  donc à l'index 0 (on compte toujours à partir de 0).
  On transforme la chaîne de caractère en nombre grâce à l'opérateur unaire '+'
  */
  const nombreCouleurs = +input[0];

  /*
  On crée un objet pour compter les couleurs :
  - Chaque clé aura le nom d'une seule couleur ("rouge" par exemple)
  - La valeur associée à une clé (propriété) sera le nombre de fois où cette couleur
  est apparue dans la liste.
  
  Exemple d'un objet qu'on peut construire :

  compteurCouleurs = {
    rouge: 3,
    jaune: 2,
    bleu: 1,
  }

  Cet objet possède 3 clés (aussi appelées propriétés) : rouge, jaune et bleu.
  Les valeurs respectivent de ces clés sont 3, 2 et 1.
  */

  // On définit un objet vide qu'on va venir remplir à mesure qu'on lit chaque couleur
  const compteurCouleurs = {};

  /*
  On parcourt la liste des couleurs, on commence à i = 1 et pas 0, car la
  première ligne (d'index 0) est le nombre de couleurs à lire dont on se
  moque complètement ici.

  L'algorithme qu'on va mettre en place est simple :
  SI on a déjà lu la couleur ALORS
    on ajoute 1 au compteur de couleur (valeur de la clé)
  SINON
    on crée une nouvelle clé pour cette couleur et on lui affecte la valeur 1
    puisqu'on a trouvé cette nouvelle couleur déjà 1 fois
  FINSI
  */
  for (let i = 1; i <= nombreCouleurs; i = i + 1) {
    const couleur = input[i];

    // SI on a déjà lu la couleur ALORS...
    /*
    Pour faire cette partie on utilise l'instruction "in" ("dans" en français)
    qui permet de vérifier si la valeur contenue dans la variable couleur est
    une clé existante dans l'objet compteurCouleurs.

    Ainsi, on vérifie si on a déjà lu cette couleur précédemment ou pas !
    */
    if (couleur in compteurCouleurs) {
      // on ajoute 1 au compteur de couleur (valeur de la clé)
      /*
      On accède à la clé en utilisant la notation avec crochet et pas la notation
      pointée compteurCouleurs.couleur car on ne veut pas lire la clé "couleur" mais
      la clé donc le nom est la valeur de la variable couleur. Par exemple "rouge".
      Donc ici, si couleur vaut "rouge", on va ajouter 1 à sa valeur. C'est comme si
      on avait écrit :
      compteurCouleurs.rouge = compteurCouleurs.rouge + 1;
      */
      compteurCouleurs[couleur] = compteurCouleurs[couleur] + 1;
    } else {
      // SINON
      // on crée une nouvelle clé pour cette couleur et on lui affecte la valeur 1
      /*
      Lorsqu'on affecte une valeur à une clé qui n'existe pas encore, celle-ci est
      immédiatement créée puis on affecte la valeur.
      Donc avec cette seule ligne, on crée une nouvelle clé dont le nom sera le contenu
      de la variable couleur ("rouge" par exemple) et on lui affecte 1.
      */
      compteurCouleurs[couleur] = 1;
    }
  }

  /*
  Maintenant il faut récupérer les couleurs qui ont été le plus comptées !
  
  On va donc devoir trier notre objet de la plus grande valeur à la moins grande valeur de clé.
  
  Malheureusement on ne peut pas utiliser de fontion de tri comme sort() sur un objet mais
  seulement sur un tableau !

  Il faut donc au préalable qu'on transforme notre objet en tableau et c'est ce que permet
  de faire la méthode entries().
  */

  let tableauCouleursComptees = Object.entries(compteurCouleurs);

  /*
  Ici on passe de cet objet :
  
  compteurCouleurs = { rouge: 3, jaune: 2, bleu: 1 }
  
  à ce tableau (qui est un tableau de tableaux, aussi appelé tableau à 2 dimensions):
  
  tableauCouleursComptees = [ [ 'rouge', 3 ], [ 'jaune', 2 ], [ 'bleu', 1 ] ]
  
  Maintenant on va effectuer le tri par valeur avec sort() qui prend en argument une
  fonction prenant 2 paramètres qui représentent 2 éléments du tableau sur lequel on
  travaille. Cette fonction doit retourner une valeur négative, nulle ou positive en
  fonction de comment on veut trier les éléments.

  L'élément a sera trié AVANT b si la fonction renvoie une valeur négative.
  L'élément a sera trié APRÈS b si la fonction renvoie une valeur positive.
  L'ordre de a et b sera laissé tel quel si la fonction renvoie zéro (une valeur nulle).

  Ici on doit trier par ordre décroissant en fonction des valeurs de chaque sous-tableau.
  Dans chaque sous-tableau, par exemple a = ["rouge", 3]. a[0] vaut la valeur "rouge" et
  a[1] vaut la valeur 3.

  Il faut donc trier en fonction de a[1] et b[1] pour comparer les éléments entre eux.

  On veut un ordre décroissant, donc a[1] doit être placé AVANT si sa valeur est plus grande
  que b[1]. 
  Autrement dit, la fonction doit renvoyer une valeur négative si a[1] > b[1].
  
  Là on fait un peu de maths ;-).
  On a l'équation : a[1] > b[1].
  Si on soustrait a[1] de chaque côté on obtient, l'équation reste vraie : a[1] - a[1] > b[1] - a[1].
  Ce qui équivaut à la nouvelle équation : 0 > b[1] - a[1]. (car a[1] - a[1] = 0).
  Donc lorsqu'on calcule b[1] - a[1] on obtient une valeur négative lorsque a[1] est supérieure
  à b[1]. C'est exactement ce qu'on veut ! D'où la fonction qu'on passe à sort() :
  */
  tableauCouleursComptees.sort(function(a, b) {
    return b[1] - a[1];
  });

  /*
  Maintenant notre tableau est trié par ordre décroissant des valeurs !

  Il ne reste plus qu'à afficher les 2 premières couleurs de ce tableau
  */
  console.log(tableauCouleursComptees[0][0] + ' ' + tableauCouleursComptees[1][0]);

}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
