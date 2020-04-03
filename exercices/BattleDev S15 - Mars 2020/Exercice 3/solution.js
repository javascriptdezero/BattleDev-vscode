
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
  /*
  Voici *UNE* solution possible à l'exercice 3 de la #BattleDev Saison 15 (26 Mars 2020).

  Je lis l'énoncé et j'explique comment résoudre cet exercice dans la vidéo du live, voici
  le lien direct au bon moment dans la vidéo, regardez là avant de lire la suite !
  https://www.youtube.com/watch?v=4KFebrVWZ54&t=6879

  ===[ PRÉAMBULE ]===
  Ce code a été rédigé pour être lu par des débutants, je n'utilise donc pas
  de structures de contrôle comme for... of, for... in, forEach, le destructuring, les
  fonctions fléchées etc. mais des boucles for classiques et des assignations simples.

  Ce code pourrait être réécrit de façon beaucoup plus concise et "moderne" mais ce
  n'est pas l'objectif. L'objectif est de fournir du matériel pédagogique aux
  débutants pour leur montrer qu'on peut développer des algorithmes complexes sans
  utiliser les fonctionnalités modernes du langage mais juste avec les "bases".

  ===[ ÉNONCÉ ]===
  Les points importants à retenir :
  - Les horaires sont inclus. Pour faire un créneau de 60 minutes, on comptabilise
  toutes les minutes de l'horaire de début et de fin. Autrement dit un créneau de
  8:00 à 8:59 fait 60 minutes (et pas 59 minutes !).
  - Il peut y avoir une partie des horaires superposés dans les entrées, ça on le
  découvre dans les jeux de test (dans input2.txt et d'autres).
  
  Par exemple :
  1 09:20-14:59
  1 12:23-16:27
  
  Ici le second horaire 12:23-16:27 est "à cheval" sur le premier, il faudra gérer
  ces cas particuliers.

  ===[ ALGORITHME COMPLET ]===
  Pour présenter l'algorithme je vais partir d'un exemple qu'on utilisera dans tout
  le reste du code pour expliquer chaque étape.

  Exemple d'entrée :
  7
  1 10:45-14:47
  1 11:10-12:32
  2 08:24-10:54
  1 08:45-12:59
  3 09:56-16:25
  2 11:20-17:10
  1 13:50-17:50

  Comme expliqué dans le live, je vais partir en simplifiant le problème des horaires
  en les ramenant à des minutes. Pour n'avoir à comparer que des nombres uniques et pas
  des heures et des minutes.
  
  Cette simplification permettra de comparer deux horaires entre eux pour déterminer si
  l'un vient avant l'autre dans l'ordre chronologique et pour calculer la durée d'un
  créneau en faisant une simple soustraction.

  Exemple : Est-ce que 09:30 est avant 8:45 ?
  On transforme 9:30 en minutes : 9 * 60 + 30 = 570 min
  On transforme 8:45 en minutes : 8 * 60 + 45 = 525 min

  Il ne reste qu'à comparer ces 2 valeurs. La plus petite valeur sera AVANT la plus grande.
  
  Donc : Est-ce que 09:30 est avant 8:45 ? revient à poser la question suivante :
  Est-ce que 570 < 525 ?
  C'est faux, donc 9:30 est APRÈS 8:45.

  Autre exemple : Quelle est la durée du créneau 08:45-09:30 ?
  Simple, c'est la différence des minutes entre l'heure de fin et celle de début.
  Soit 09:30 - 08:45 => 570 - 525 = 45 min !

  ATTENTION ici la durée de ce créneau pour cet exercice particulier est de 46 min.
  En effet l'énoncé précise que les horaires sont inclus (de 8:00 à 8:59, on considère
  que ça fait 60 min, pas 59 !). Donc il faudra bien faire attention à ça plus tard.

  ===[ ALGORITHME : PHASE 1 - Remaniement des données d'entrées ]===
  On va dans un premier temps transformer les horaires en nombre de minutes pour
  simplifier tout l'exercice et la suite de l'algorithme.
  
  On veut donc passer des données d'entrée brutes comme ça :
  1 10:45-14:47
  1 11:10-12:32
  2 08:24-10:54
  1 08:45-12:59
  3 09:56-16:25
  2 11:20-17:10
  1 13:50-17:50

  À des données en minutes comme ça :
  1 645-887
  1 670-752
  2 504-654
  1 525-779
  3 596-985
  2 680-1030
  1 830-1070

  Pour y arriver c'est assez simple, il faudra prendre chaque horaire séparément,
  extraire le nombre d'heures, le multiplier par 60 pui ajouter les minutes.

  Exemple 10:45 => 10 * 60 + 45 = 645 min.

  ===[ ALGORITHME : PHASE 2 - Rassemblement des créneaux par jour ]===
  Les créneaux sont éparpillés sur chaque ligne, on doit les rassembler pour chaque journée.
  Ce sera plus simple ensuite de parcourir chaque journée pour voir si un créneau de 60 min
  est disponible dans cette journée ou pas.

  On veut donc passer de ça :
  1 645-887
  1 670-752
  2 504-654
  1 525-779
  3 596-985
  2 680-1030
  1 830-1070

  À ça :
  1 645-887 670-752 525-779 830-1070
  2 504-654 680-1030
  3 596-985

  Ainsi on a une vision des indisponibilités pour chaque jour.
  Il suffira de parcourir toutes les lignes de l'entrée, d'extraire le chiffre
  indiquant le jour et d'ajouter par exemple, dans un tableau, les créneaux
  correspondant au jour en question.
  
  Problème, les créneaux ne sont pas dans l'ordre chronologique ! En effet, pour le
  lundi par exemple on a 645-887 670-752 525-779 830-1070, on voit bien que le
  créneau 525-779 devrait être en 1er dans cette liste car il est avant tous les
  autres.

  ===[ ALGORITHME : PHASE 3 - Tri dans l'ordre chronologique ]===
  Il sera plus pratique de parcourir chaque créneau dans l'ordre chronologique pour voir
  s'il y a un "trou" de 60 min quelque part.

  On doit donc réordonner tous les créneaux dans l'ordre chronologique.
  Pour ça, on va les classer par horaire de début de créneau.

  On va passer de ça :
  1 645-887 670-752 525-779 830-1070
  2 504-654 680-1030
  3 596-985

  À ça :
  1 525-779 645-887 670-752 830-1070
  2 504-654 680-1030
  3 596-985

  Deuxième problème : les créneaux peuvent être superposés.

  Par exemple 645-887 et 830-1070 ont une partie en commun, la partie 830-887 !
  Ça va nous poser problème pour la suite.

  En effet, dans la suite de l'algorithme, on va souhaiter pouvoir tester entre chaque créneau
  s'il y a un trou de 60 min.

  Donc pour l'exemple du lundi avec 525-779 645-887 670-752 830-1070, on va devoir chercher
  un trou de 60 min entre chaque créneau. On va donc regarder si un espace de 60 min 
  est disponible entre l'horaire de fin du créneau N et l'horaire de début du créneau N+1.

  On va faire ça pour chaque couple de créneau, dans l'ordre, donc on va tester :
  525-779 645-887, puis
  645-887 670-752, puis
  670-752 830-1070.

  Regardons le dernier cas 670-752 830-1070. Y a-t-il un espace de 60 min entre 752 et 830 ?
  Clairement oui ! Le problème... c'est que le créneau entre 752 et 830 n'est pas disponible !
  En effet regardez le deuxième créneau impossible du lundi, c'est 645-887 qui "couvre" le
  créneau 752 à 830.

  Le fait que les créneaux soit superposés pose donc un problème. Ce qu'il nous faut c'est une
  liste de créneaux non superposés ! Prenons une approche visuelle pour bien comprendre.

  Représentons grossièrement le lundi 1 525-779 645-887 670-752 830-1070 visuellement sur
  une ligne, à gauche le passé, à droite le futur.

  On veut passer de ça (ce schéma n'est pas à l'échelle, peu importe):
         525                779
  --------[xxxxxxxxxxxxxxxxxx]------------------------
              645                 887
  -------------[xxxxxxxxxxxxxxxxxxx]------------------
                670    752  
  ---------------[xxxxxx]-----------------------------
                              830              1070
  -----------------------------[xxxxxxxxxxxxxxxxx]----

  À ça :
         525                                   1070
  --------[xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]----

  On "fusionne" donc les créneaux superposés. Notez qu'ici ça donne un créneau unique, mais on
  pourrait avoir une suite de créneaux comme ceci (exemple fictif mais possible) :
        500     620  670             800 820      950 
  -------[xxxxxxx]----[xxxxxxxxxxxxxxx]---[xxxxxxxx]--

  ===[ ALGORITHME : PHASE 4 - Fusion des créneaux impossibles ]===
  Comme on l'a vu pour s'affranchir des problèmes des créneaux superposés il faut les fusionner
  quand c'est nécessaire pour obtenir une suite de créneaux non superposés.

  Pour ça, il va falloir déterminer si un créneau est superposé ou pas avec un autre.
  Comment faire ? Quels sont les différents cas possibles ? Prenons 2 créneaux pour voir les
  différentes possibilités.

  (NOTE : on travaille sur des créneaux qui ont été ordonné de façon chronologique précédemment.
  Donc le second créneau est toujours décalé sur la droite par rapport au premier.
  Ce qui réduit le nombre de cas possibles. S'ils n'étaient pas déjà ordonnés, on pourrait
  avoir un cas ou le 2ème créneau est à cheval sur la gauche du 1er créneau.)

  * 1er cas : les créneaux ne sont pas superposés : 500-620 et 670-800
        500     620  670             800
  -------[xxxxxxx]----[xxxxxxxxxxxxxxx]---------------

  * 2ème cas : le créneau est à cheval : 525-779 et 645-887
         525                779
  --------[xxxxxxxxxxxxxxxxxx]------------------------
              645                 887
  -------------[xxxxxxxxxxxxxxxxxxx]------------------
  Comment déterminer ce cas particulier ? Eh bien ici on voit que l'horaire de début 645 est 
  comprise entre les horaires du 1er créneau, on a donc : 525 < 645 < 779.
  Donc dès qu'on a cette condition, on détecte une superposition qu'il faudra fusionner !
  
  * 3ème cas : le créneau est PILE à cheval : 525-779 et 525-1087
         525                779
  --------[xxxxxxxxxxxxxxxxxx]------------------------
         525                          1087
  --------[xxxxxxxxxxxxxxxxxxxxxxxxxxxx]--------------
  Ici la condition est 525 <= 525 < 779.
    
  * 4ème cas : le créneau est PILE après le premier : 525-779 et 779-1087
         525                779
  --------[xxxxxxxxxxxxxxxxxx]------------------------ <-- créneau1
                            779      1087
  ---------------------------[xxxxxxxxx]-------------- <-- créneau2
  Ici la condition est 525 < 779 <= 779.

  On peut donc utiliser une condition qui rassemble tous ces cas là sous la forme suivante :
  le créneau de début du second horaire doit être compris dans l'horaire du premier créneau.

  On note créneau1.début l'horaire de début du créneau1 (525).
  On note créneau1.fin l'horaire de fin du créneau1 (779).
  On note créneau2.début l'horaire de début du créneau2 (779).
  On note créneau2.fin l'horaire de fin du créneau2 (1087).

  On aura donc une condition du type :
  SI créneau1.début <= créneau2.début && créneau2.début <= créneau1.fin ALORS
    on a détecté une superposition !
  FINSI

  Attardons-nous une seconde sur cette condition, elle peut être simplifiée.

  En effet, comme on a classé par ordre chronologique les débuts des horaires, on aura de
  toujours vraie la sous-condition créneau1.début <= créneau2.début ! Par conséquent on pourra
  donc tester uniquement si créneau2.début <= créneau1.fin, soit :

  SI créneau2.début <= créneau1.fin ALORS
    on a détecté une superposition !
  FINSI

  On est donc mainteant capable de détecter une superposition... il faut maintenant fusionner
  les créneaux qui sont superposés.

  Jusqu'à présent j'ai toujours fait varier uniquement le début du créneau2 mais la fin peut
  aussi varier. Voici toutes les possibilités de superpositions avec le résultat qu'on
  souhaite obtenir une fois les créneaux fusionnés :

  On fixe le début du créneau2 pile sur le début du créneau1 :
  ----[xxxxxx]---- <-- créneau1
  ----[xxxx]------ <-- créneau2
  ----[xxxxxx]---- <-- RESULTAT APRES FUSION

  ----[xxxxxx]----
  ----[xxxxxx]----
  ----[xxxxxx]---- <-- RESULTAT APRES FUSION

  ----[xxxxxx]----
  ----[xxxxxxxxx]-
  ----[xxxxxxxxx]- <-- RESULTAT APRES FUSION

  On fixe le début du créneau2 à l'intérieur du créneau1 :
  ----[xxxxxx]---- <-- créneau1
  ------[xx]------ <-- créneau2
  ----[xxxxxx]---- <-- RESULTAT APRES FUSION

  ----[xxxxxx]----
  ------[xxxx]----
  ----[xxxxxx]---- <-- RESULTAT APRES FUSION

  ----[xxxxxx]----
  ------[xxxxxx]--
  ----[xxxxxxxx]-- <-- RESULTAT APRES FUSION

  On fixe début créneau2 pile à la fin de créneau1 :
  ----[xxxxxx]---- <-- créneau1
  -----------[xx]- <-- créneau2
  ----[xxxxxxxxx]- <-- RESULTAT APRES FUSION

  Il existe un second cas où le début et la fin de créneau2 sont pile à la fin du créneau1.
  Mais ce cas n'a pas de sens dans la réalité (créneau de 0 min !) donc on ne le prends pas en compte.
  ----[xxxxxx]---- <-- créneau1
  -----------[]--- <-- créneau2
  ----[xxxxxx]---- <-- RESULTAT APRES FUSION

  Ici il faut déterminer une façon de créer un nouveau créneau qui fusionnera les 2 superposés
  en 1 seul ! Appelons ce nouveau créneau le créneau fusionné. Créons-le !

  Occupons nous du début du créneau fusionné, visuellement, on voit que celui-ci est toujours
  le début du créneau1 ! Autrement dit, créneauFusionné.début sera toujours égal à créneau1.début.

  Et pour la fin du créneau fusionné ?

  Eh bien c'est toujours celui qui est le plus à "droite" à chaque fois !
  Autrement dit, c'est l'horaire le plus grand entre les fins de créneau1 et 2.
  Donc c'est la valeur MAX entre créneau1.fin et créneau2.fin.

  Au final, on a donc créé un nouveau créneau fusionné avec comme horaires :
  créneauFusionné.début = créneau1.début
  créneauFusionné.fin = MAX entre créneau1.fin et créneau2.fin;

  Dernière chose à faire, il faudra supprimer ces 2 créneaux pour les remplacer par un unique
  créneau fusionné et recommencer l'opération avec un nouveau couple de créneau.

  Avec notre exemple du lundi voici ce que ça donne, étape par étape :
  
  On part du 1er créneau => 525-779 645-887 670-752 830-1070
  Couple à analyser : 525-779 645-887
  Superposition détectée OUI, il faut fusionner ! => créneauFusionné = 525-887
  
  Nouveau contenu du lundi : 525-887 670-752 830-1070
  
  On recommence !

  On part toujours du 1er créneau puisqu'il a été mis à jour !
  On part du 1er créneau => 525-887 670-752 830-1070
  Couple à analyser : 525-887 670-752
  Superposition détectée OUI, il faut fusionner ! => créneauFusionné = 525-887

  Nouveau contenu du lundi : 525-887 830-1070
  
  On recommence !

  On part toujours du 1er créneau puisqu'il a été mis à jour !
  On part du 1er créneau => 525-887 830-1070
  Couple à analyser : 525-887 830-1070
  Superposition détectée OUI, il faut fusionner ! => créneauFusionné = 525-1070

  Nouveau contenu du lundi : 525-1070

  C'est fini car il n'y a plus qu'un seul créneau.

  À nouveau, ici ça ne donne qu'un seul créneau, mais on aurait pu avoir des créneaux sans
  superpositions. Voici ce que ça donne avec un exemple fictif : 550-612 700-850 840-930 1000-1050.

  On part du 1er créneau => 550-612 700-850 840-930 1000-1050
  Couple à analyser : 550-612 700-850
  Superposition détectée NON, on avance alors d'un créneau

  On part du 2ème créneau => => 550-612 700-850 840-930 1000-1050
  Couple à analyser : 700-850 840-930
  Superposition détectée OUI, il faut fusionner ! => créneauFusionné = 700-930

  Nouveau contenu : 550-612 700-930 1000-1050

  On recommence !

  On part toujours du 2ème créneau puisqu'il a été mis à jour !
  On part du 2ème créneau => 550-612 700-930 1000-1050
  Couple à analyser : 700-930 1000-1050
  Superposition détectée NON, on avance alors d'un créneau

  On tombe sur le dernier créneau donc on arrête là, c'est fini !
  On obtient les créneaux sans superpositions : 550-612 700-930 1000-1050.

  ===[ ALGORITHME : PHASE 5 - Détection de créneaux possibles ]===
  Maintenant qu'on a fusionné tous les créneaux, on a quelque chose comme ça :
  1 525-1070
  2 504-654 680-1030
  3 596-985

  Il ne reste plus qu'à prendre chaque jour et à vérifier si on trouve un trou
  de 60 min entre les créneaux.

  Pour ça il faut commencer au début de la journée de travail à 08:00 (soit 480 min)
  et vérifier à chaque fois la quantité de temps disponible entre chaque créneau pour
  trouver une valeur supérieure ou égale à 60 minutes.

  Exemple du lundi, on a 525-1070 comme créneau.
  On part de 8:00 (480) et on regarde le temps disponible avant le début du 1er créneau
  impossible (525).
  On fait 525 - 480 = 45 min.

  ATTENTION : Ce calcul n'est pas totalement juste pour cet exercice !
  Eh oui souvenez-vous, les horaires sont INCLUS.
  Et un créneau de 8:00 à 8:59 *vaut* 60 min. Or si on fait la différence de 
  8:59 (539) - 8:00 (480) ça fait 539 - 480 = 59 minutes !

  Il va donc falloir faire très attention à ça, sinon on aura une erreur de décalage à 1.
  Pour revenir à notre exemple, la minute 525 est impossible, donc il faudra faire le
  calcul avec la minute d'avant, soit (525 - 1) - 480 = 44 min.

  Dans la suite de l'algorithme, on va utiliser principalement des valeurs d'horaires
  IMPOSSIBLES. En effet, comme les horaires sont inclus (cf énoncé), tous les horaires
  qu'on aura pour un jour donné devront être exclus du résultat.

  Exemple avec un jour fictif : 08:20-09:59 11:00-11:40. Ici il y a un créneau de
  disponible entre ces 2 créneaux, celui de 10:00-10:59 (qui est considéré comme faisant
  bien 60 min souvenez-vous de l'énoncé !).
  
  Comme on peut le voir l'horaire de fin du créneau1 (09:59) et l'horaire de début du
  créneau2 (11:00) ne peuvent pas être utilisées dans le résultat.

  Autrement dit, on va faire la différence entre 11:00 et 09:59, soit la différence
  entre 660 et 599, c'est-à-dire 660 - 599 = 61. Donc pour détecter un trou de 60 min
  valide en utilisant des horaires interdits on peut utiliser la condition suivante :

  créneau1.fin - créneau2.début >= 61
  
  On peut simplifier cette condition pour rappeler le 60 minutes de l'énoncé en :
  
  créneau1.fin - créneau2.début > 60
  
  Comme on devra utiliser des horaires IMPOSSIBLES dans cette condition, il faudra
  penser à utiliser les horaires impossibles aussi pour le début de la journée de
  travail (8:00) et la fin de la journée de travail (18:00).

  Donc pour le début de journée on n'utilisera pas l'horaire de 8:00 qui est autorisée
  mais 7:59 qui est impossible soit 7 * 60 + 59 = 479.
  Même chose pour la fin de journée, il faut utiliser 18:00 (cf énoncé), car 17:59 est
  la dernière autorisée. Soit 18:00 => 18 * 60 = 1080.

  Voici l'algorithme en pseudo-code que je propose pour détecter un trou de 60 minutes.
  (NOTE: La flèche '<-' signifie une affectation de valeur)

  -- ALGORITHME Détection de trou de 60 minutes

  finJourneeTravail <- 1080
  debut <- 479  
  POUR i ALLANT DE 0 A nombreDeCreneaux - 1 PAR PAS DE 1 FAIRE
    fin <- créneau[i].début
    SI fin - debut > 60 ALORS
      on a trouvé un trou de 60 minutes !
      afficher le résultat
      quitter
    SINON
      debut <- créneau[i].fin
    FINSI
  FINTANTQUE

  SI finJourneeTravail - debut > 60 ALORS
    on a trouvé un trou de 60 minutes !
    afficher le résultat
    quitter
  FINSI

  -- FIN DE L'ALOGRITHME

  Dans un premier temps, on vient tester le couple début journée de travail et créneau1.début.
  On cherche à savoir s'il y a un trou AVANT le tout premier horaire indiqué, entre le début
  de la journée et le début de ce 1er créneau. On effectue cette étape grâce à l'initialisation
  de la variable debut à l'horaire de début de journée et à la 1ère itération de la boucle.

  Si on ne trouve pas de trou à ce moment là, on commence à comparer les créneaux entre eux.
  C'est ce qu'on fait dans le SINON en affectant à la variable debut l'horaire de fin
  du 1er créneau : debut <- créneau[0].fin
  
  On arrive à la fin de la boucle et on itère une seconde fois. On a i qui vaut alors 1 et on
  affecte la variable fin à :
  fin <- créneau[1].début

  Donc dans debut on a créneau[0].fin et dans fin on a créneau[1].début, on compare donc le
  premier couple des 2 premiers créneaux. On vérifie qu'entre eux, il y a un trou.

  On continue cette boucle jusqu'à la fin. Si on ne trouve aucun trou, lors de notre dernière
  itération, la valeur de la variable debut vaut l'horaire de fin de notre dernier créneau.

  On en profite alors pour la comparer avec l'horaire de fin de journée pour vérifier s'il y a
  un trou de 60 min entre la fin du dernier créneau et la fin de journée :
  SI finJourneeTravail - debut > 60 ALORS
    on a trouvé un trou de 60 minutes !
    afficher le résultat
    quitter
  FINSI

  Ainsi on couvre toutes les possibilités.

  Maintenant passons à l'implémentation de ces différentes parties.

  */
  
  // ===[ ALGORITHME : PHASE 1 - Remaniement des données d'entrées ]===
  const nombreCreneauxImpossibles = +input[0];

  // On va stocker l'ensemble des créneaux dans un tableau de tableaux.
  const listeCreneauxImpossiblesSemaine = [
    [], // Celui-ci contiendra les créneaux du lundi (index 0)
    [], // Celui-ci contiendra les créneaux du mardi (index 0)
    [], // Celui-ci contiendra les créneaux du mercredi (index 0)
    [], // Celui-ci contiendra les créneaux du jeudi (index 0)
    [], // Celui-ci contiendra les créneaux du vendredi (index 0)
  ]

  // On commence à i = 1 car la ligne 0 d'input est le nombre de créneaux à lire
  for (let i = 1; i <= nombreCreneauxImpossibles; i = i + 1) {
    // input[i] vaut par exemple "1 10:45-14:47"
    // On découpe cette chaîne en tableau
    const tableauJourEtHoraires = input[i].split(" ");
    // tableauJourEtHoraires vaut ["1", "10:45-14:47"]
    const numeroJour = +tableauJourEtHoraires[0];
    // numeroJour vaut 1
    const horaires = tableauJourEtHoraires[1];
    // horaires vaut "10:45-14:47"
    
    // On découpe à nouveau cette chaîne en tableau
    const tableauHoraires = horaires.split("-");
    // tableauHoraires vaut ["10:45", "14:47"]
    const horaireDebut = tableauHoraires[0];
    // horaireDebut vaut "10:45"
    const horaireFin = tableauHoraires[1];
    // horaireFin vaut "14:47"

    // On découpe à nouveau cette chaîne en tableau
    const tableauHorairesDebut = horaireDebut.split(":");
    // tableauHorairesDebut vaut ["10", "45"]
    const debutHeures = +tableauHorairesDebut[0];
    // debutHeures vaut 10
    const debutMinutes = +tableauHorairesDebut[1];
    // debutHeures vaut 45
    
    // On recommence pour l'horaire de fin "14:47"
    const tableauHorairesFin = horaireFin.split(":");
    const finHeures = +tableauHorairesFin[0];
    const finMinutes = +tableauHorairesFin[1];

    // On transforme les heures et minutes en minutes
    const debutEnMinutes = debutHeures * 60 + debutMinutes;
    const finEnMinutes = finHeures * 60 + finMinutes;

    /*
    ===[ ALGORITHME : PHASE 2 - Rassemblement des créneaux par jour ]===
    On rassemble tous les créneaux dans un tableau de tableaux.

    Pour accéder au tableau du lundi il faut utiliser l'indice 0 or
    numeroJour vaur 1 pour lundi, donc il faut soustraire 1 pour obtenir 0.
    
    Pareil pour mardi, mercredi etc. Donc il faut faire numeroJour - 1 pour
    écrire dans le bon tableau correspondant au jour associé.
    
    On va alors obtenir un tableau de tableaux... de tableaux !
    
    Comme ceci par exemple :
    [ 
      [ [ 525, 779 ], [ 885, 887 ] ], <-- créneaux du lundi
      [ [ 504, 654 ] ], <-- créneaux du mardi
      [], <-- créneaux du mercredi
      [], <-- créneaux du jeudi
      [], <-- créneaux du vendredi
    ]
    */
    // A chaque ligne qu'on lit on pousse (push), on ajoute le créneau
    // sous la forme d'un tableau contenu 2 valeurs, l'horaire de début et de fin.
    listeCreneauxImpossiblesSemaine[numeroJour - 1].push(
      [debutEnMinutes, finEnMinutes]
    );
  }

  // ===[ ALGORITHME : PHASE 3 - Tri dans l'ordre chronologique ]===
  for (let jour = 0; jour < listeCreneauxImpossiblesSemaine.length; jour = jour + 1) {
    // Pour chaque jour...
    const creneauxJour = listeCreneauxImpossiblesSemaine[jour];
    /*
    On trie les créneaux dans l'ordre chronologique. Explications...
    creneauxJour vaut par exemple : [ [645,887], [670,752], [525,779], [830,1070] ]
    Il faut le trier selon l'horaire de début, donc pour un créneau donné [645,887], il
    faut accéder à sa première valeur soit creneau[0].
    On trie du plus petit au plus grand, donc la fonction passée à sort() doit renvoyer
    une valeur négative si creneau1 doit être placé avant creneau2.
    Voir la doc MDN : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/sort
    */
    creneauxJour.sort(function(creneau1, creneau2) {
      return creneau1[0] - creneau2[0];
    });
  }

  // ===[ ALGORITHME : PHASE 4 - Fusion des créneaux impossibles ]===
  for (let jour = 0; jour < listeCreneauxImpossiblesSemaine.length; jour = jour + 1) {
    // Pour chaque jour...
    const creneauxJour = listeCreneauxImpossiblesSemaine[jour];

    // RAPPEL : les horaires sont déjà triées dans l'ordre croissant.
    // S'il y a plus d'un créneau, il se peut que des horaires soient superposées
    if (creneauxJour.length > 1) {
      let positionPremierCreneauDuCouple = 0;
      while (positionPremierCreneauDuCouple < creneauxJour.length - 1) {
        const creneauActuel = creneauxJour[positionPremierCreneauDuCouple];
        const creneauSuivant = creneauxJour[positionPremierCreneauDuCouple + 1];

        // Si on détecte une superposition, il faut réécrire ce créneau
        // Exemple : [ 480, 1079 ], [ 743, 987 ]
        // creneauActuel vaut [ 480, 1079 ]
        // creneauSuivant vaut [ 743, 987 ]
        if (creneauSuivant[0] <= creneauActuel[1]) {
          const creneauFusionne = [creneauActuel[0], Math.max(creneauActuel[1], creneauSuivant[1])];
          // On utilise splice pour supprime les créneaux du couple et les remplacer par creneauFusionne
          creneauxJour.splice(positionPremierCreneauDuCouple, 2, creneauFusionne);
        } else {
          // S'il n'y a pas de superposition, on avance d'un cran (cf algorithme)
          positionPremierCreneauDuCouple++;
        }
      }
    }
  }
  
  // ===[ ALGORITHME : PHASE 5 - Détection de créneaux possibles ]===
  // On utilise les horaires IMPOSSIBLES pour le début et la fin de journée de travail
  let debutJourneeTravail = 7 * 60 + 59; // Soit 7:59
  let finJourneeTravail = 18 * 60;       // Soit 18:00

  for (let jour = 0; jour < listeCreneauxImpossiblesSemaine.length; jour = jour + 1) {
    // Pour chaque jour...
    const creneauxJour = listeCreneauxImpossiblesSemaine[jour];
    // On initialise le début au début de la journée de travail
    let debut = debutJourneeTravail;

    // Pour chaque créneau de ce jour donné...
    for (let i = 0; i < creneauxJour.length; i = i + 1) {
      const creneau = creneauxJour[i];
      // On initialise fin à l'horaire de début du créneau actuel
      let fin = creneau[0];

      // Si on détecte un trou de 60 minutes...
      if (fin - debut > 60) {
        // On affiche le résultat
        afficherResultat(jour, debut);
        // ... et on quitte !
        // Ce return permet de sortir de la fonction ContestResponse()
        return;
      } else {
        // Sinon on se préparer à comparer le prochain couple de créneaux entre eux
        debut = creneau[1];
      }
    }

    // Ici on teste s'il y a un trou entre la fin du dernier créneau et la fin de la journée
    if (finJourneeTravail - debut > 60) {
      afficherResultat(jour, debut);
      return;
    }
  }
}

// On affiche le numéro du jour et du créneau qui est possible
function afficherResultat(indexJour, debut) {
  // On reçoit l'index du tableau dans indexJour (qui commence à 0 pour le lundi) donc
  // il faut le reconvertir au format ISO lundi = 1 (et pas 0) etc.
  let numeroJour = indexJour + 1;
  // L'horaire de début ici est en minutes et est IMPOSSIBLE, il faut donc prendre la
  // minute d'après pour l'heure de début du créneau disponible
  debut = debut + 1;
  // L'heure de fin est 59 min plus tard, souvenez-vous, 8:00 à 8:59 c'est 60 min !
  const fin = debut + 59;

  // On reconvertit les minutes au format HH:MM. Le padStart permet d'ajouter un 0 si
  // le chiffre est inférieur à 10, pour éviter d'afficher par exemple 8:3 au lieu de 08:03
  const heureDebut = String(Math.floor(debut / 60)).padStart(2, '0');
  const minutesDebut = String(debut % 60).padStart(2, '0');
  const heureFin = String(Math.floor(fin / 60)).padStart(2, '0');
  const minutesFin = String(fin % 60).padStart(2, '0');

  // On affiche le résultat sous la forme souhaitée par l'énoncé
  console.log(numeroJour + ' ' + heureDebut + ':' + minutesDebut + '-' + heureFin + ':' + minutesFin);
}
// -- Fin de votre code

// Ne supprimez pas ces lignes
exports.ContestResponse = ContestResponse;
exports.initInput = initInput;
