const fs = require("fs");

const NUMERO_DEPART_FICHIERS_TEST = 1;
const PREFIXE_FICHIER_INPUT = "input";
const PREFIXE_FICHIER_OUTPUT = "output";

const ICONE_SUCCES = "👍👌🎉🤘😎💪👊🤙🍾👏🙌🙏";

// Importe code.js pour pouvoir tester notre code
const code = require("./code");

// Retourne les chemins relatifs des fichiers de tests d'entrée et de sortie
function cheminsFichiersDeTest(numero) {
  return [`tests/${PREFIXE_FICHIER_INPUT}${numero}.txt`, `tests/${PREFIXE_FICHIER_OUTPUT}${numero}.txt`];
}

// Retourne une icône aléatoire de succès
function iconeAleatoireSucces() {
  // Les emojis sont composés d'une paire de "code point", la position doit
  // être le début d'une paire, donc un chiffre pair.
  let positionAleatoire = 0;
  do {
    positionAleatoire = Math.floor(Math.random() * ICONE_SUCCES.length);
  } while (positionAleatoire % 2 === 1);
  return String.fromCodePoint(ICONE_SUCCES.codePointAt(positionAleatoire));
}

// Calcule le nombre de tests à passer
let nombreTotalDeTests = 0;
let numero = NUMERO_DEPART_FICHIERS_TEST;
let [fichierDeTest] = cheminsFichiersDeTest(numero);

console.log("> Recherche de tests...");
while (fs.existsSync(fichierDeTest)) {
  nombreTotalDeTests++;
  numero++;
  [fichierDeTest] = cheminsFichiersDeTest(numero);
}

if (nombreTotalDeTests > 0) {
  console.log(
    `> ${nombreTotalDeTests} fichier${nombreTotalDeTests > 1 ? "s" : ""} de test trouvés${
      nombreTotalDeTests > 1 ? "s" : ""
    }.`
  );
  console.log("> Lancement des tests...");
} else {
  console.log("Aucun test trouvé. Copiez vos fichiers dans le répertoire ./tests.");
  return;
}

let numeroTest = NUMERO_DEPART_FICHIERS_TEST;
let nombreDeTestsReussis = 0;
let succes = true;
let [fichierEntree, fichierSortie] = cheminsFichiersDeTest(numeroTest);

// On parcourt tous les tests, on s'arrête dès qu'un test ne passe pas
while (fs.existsSync(fichierEntree) && fs.existsSync(fichierSortie) && succes) {
  let contenuEntree = fs.readFileSync(fichierEntree).toString();
  let contenuSortie = fs.readFileSync(fichierSortie).toString();
  console.log(`\n=======[ Test ${numeroTest} ]=======`);
  console.log(`-- Valeurs d'entrée --\n${contenuEntree}`);

  // On travaille avec des lignes sous forme de tableaux
  contenuEntree = contenuEntree.split(/\r?\n/g);
  contenuSortie = contenuSortie.split(/\r?\n/g);

  // On fournit à code.js les valeurs d'entrée
  code.initInput(contenuEntree);

  // On affiche la sortie correcte attendue
  console.log(`-- Sortie attendue --\n${contenuSortie}`);

  // On met en place un proxy sur console.log() pour écouter la sortie de code.js
  let contenuConsole = [];
  const proxyDeConsole = new Proxy(console.log, {
    apply(cible, leThis, listeArgs) {
      contenuConsole.push(...listeArgs);
    }
  });

  // On stocke l'ancienne méthode log() pour la réutiliser plus tard
  const fonctionConsoleLog = console.log;

  // On met en place notre proxy à la place de console.log
  console.log = proxyDeConsole;

  // On appelle le code à tester qui fait appel à console.log (notre proxy !)
  // Tout ce qui sera affiché via console.log depuis code.js va être stocké dans contenuConsole
  code.ContestResponse();

  // On remet console.log normal (on retire le proxy) pour afficher les résultats
  console.log = fonctionConsoleLog;

  // On affiche la valeur reçue
  console.log("-- Valeur reçue (de code.js) --");
  if (contenuConsole.length <= 0) {
    console.log("ERREUR: Aucune sortie reçue. Utilisez console.log() dans code.js pour soumettre votre réponse !");
    succes = false;
  } else {
    // On affiche et on teste les lignes reçues
    contenuConsole.map(ligne => console.log(ligne));
    contenuConsole.forEach((ligne, index) => {
      if (ligne != contenuSortie[index]) {
        console.log(`ERREUR: '${contenuSortie[index]}' != '${ligne}'`);
        succes = false;
      }
    });
  }

  if (succes) {
    nombreDeTestsReussis++;
    console.log(`✅ Test ${numeroTest} réussi`);
  }

  // On passe aux prochains fichiers de test
  numeroTest++;
  [fichierEntree, fichierSortie] = cheminsFichiersDeTest(numeroTest);
}

// Affiche le taux de réussite
console.log("");
const messagePourcentage =
  "Tests réussis : [" +
  "✅".repeat(nombreDeTestsReussis) +
  "❌".repeat(nombreTotalDeTests - nombreDeTestsReussis) +
  `] ${((nombreDeTestsReussis * 100) / nombreTotalDeTests).toFixed(2)} %`;

if (nombreDeTestsReussis === nombreTotalDeTests) {
  const emojiSucces = iconeAleatoireSucces();
  const messageSucces = "{ 100% des tests réussis }";
  console.log(emojiSucces.repeat(messageSucces.length / 2 + 2));
  console.log(messageSucces);
  console.log(emojiSucces.repeat(messageSucces.length / 2 + 2));
} else {
  console.log(messagePourcentage);
}
