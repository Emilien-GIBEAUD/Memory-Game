/* fonction qui crée une carte à partir d'une URL/adresse card_address
<div class="card" data-value="./Adresse/de/l'image.svg">
  <img class="card_content" src="./Adresse/de/l'image.svg">
    <p>nom anglais</p>
    <p><em>(nom français)</em></p>
</div> */
function create_card(card_address, english_name, french_name, card_id) {
  const card = document.createElement("div");           // crée une <div>
  card.classList.add("card");                           // avec la class="card"
  card.dataset.value = card_address;                    // avec la data-value="card_address"
  card.dataset.id = card_id;                            // avec la data-id="card_id"

  const card_content = document.createElement("img");   // crée une <img>
  card_content.classList.add("card_content");           // avec la class="card_content"
  card_content.src = `${card_address}`;                 // avec la src="card_address"
  card.appendChild(card_content);                       // ajoute l'enfant "card_content" à "card"

  const name_en = document.createElement("p");          // crée un <p>
  name_en.classList.add("name_en");                     // avec la class="name_en"
  const txt_en = document.createTextNode(english_name); // nom anglais présent dans la balise <p>
  name_en.appendChild(txt_en);                          // ajoute l'enfant "txt_en" à "name_en"
  card.appendChild(name_en);                            // ajoute l'enfant "name_en" à "card"

  const name_fr = document.createElement("p");
  name_fr.classList.add("name_fr");
  const txt_fr = document.createTextNode(`(${french_name})`);   // nom français
  name_fr.appendChild(txt_fr);
  card.appendChild(name_fr);

  card.addEventListener("click", on_card_click);        // ajoute un écouteur d'événement au click

  return card;
};
/* //Code pour tester la fonction
const game_board = document.getElementById("game_board");
game_board.appendChild(create_card("./Assets/icon/bat.svg"));
game_board.appendChild(create_card("./Assets/icon/bee.svg"));
game_board.appendChild(create_card("./Assets/icon/frog.svg")); */

// fonction qui duplique un tableau A NETTOYER A NETTOYER A NETTOYER A NETTOYER A NETTOYER
function duplicate_array(array_simple) {    // A NETTOYER A NETTOYER A NETTOYER A NETTOYER
  let array_double = [];
  array_double.push(...JSON.parse(JSON.stringify(array_simple))); // Copie profonde
  // ... : ajoute 1 à 1 les cases du tableau, ajoute le tableau complet dans la 1ère case sinon
  // console.log("array_double = " + array_double);    // debug

  let array_simple_clone = JSON.parse(JSON.stringify(array_simple)); // Copie profonde
  for (let i = 0;i < array_simple_clone.length; i++){
    array_simple_clone[i][3] = "carte 2";// pour différencier les 2 cartes
  }
  // console.log("array_simple_clone = " + array_simple_clone);    // debug
  array_double.push(...array_simple_clone);
  // console.log("array_double = " + array_double);    // debug
  
  // array_double.push(...array_simple);   // ... : ajoute une à une les cases du tableau
  // array_double.push(...array_simple);   // ajoute le tableau complet dans la première case sinon
  // console.log("array_double = " + array_double);    // debug
  // for (let i = array_simple.length;i < array_simple.length * 2; i++){
  //   array_double[i][3] = "carte 2";// pour différencier les 2 cartes
  // }
  return array_double;
};

// fonction qui mélange un tableau
function shuffle_array (array) {
  const array_shuffled = array.sort(() => 0.5 - Math.random());
  return array_shuffled
};

// fonction qui renvoie les n premières valeurs d'un tableau
function select_n_cards (array,n) {
  let array_out = [];
  array = shuffle_array(array);
  for(let i = 0; i <n; i++) {
    array_out.push(array[i]);
  }
  return array_out;
}

// fonction qui retourne une carte au click
let click_disabled = false;   // pour désactiver le click durant le setTimeout
function on_card_click(elem){
  if(click_disabled){
    return;
  }

  const card = elem.target.parentElement;   // cible le parent
  card.classList.add("flip");               // ajoute la class="flip" au parent
  console.log(card); // debug

  cards_to_check.push(card);  // ajoute une carte à vérifier
  console.log("cards_to_check premier click = " + cards_to_check[0]); // debug
  
  if(cards_to_check.length === 2) {         // si 2 cartes ont été sélectionnées
    click_disabled = true;                  // click désactivé
    let timer = window.setTimeout(() => {
      if( (cards_to_check[0].dataset.value === cards_to_check[1].dataset.value) && 
          (cards_to_check[0].dataset.id !== cards_to_check[1].dataset.id) ) { // paire trouvée
        // ajoute les class="matched" et supprime les écouteurs d'événement
        cards_to_check[0].classList.add("matched");
        cards_to_check[1].classList.add("matched");
        cards_to_check[0].removeEventListener("click", on_card_click);
        cards_to_check[1].removeEventListener("click", on_card_click);

        nb_cards_discovered++;
        if(nb_cards_discovered === nb_cards) {
          window.alert("Bravo, vous avez gagné !!!");
        }
      }else{
        cards_to_check[0].classList.remove("flip");   // supprime les class="flip"
        cards_to_check[1].classList.remove("flip");   // supprime les class="flip"
      }
      console.log("cards_to_check deuxième click = " + cards_to_check[1]); // debug
      cards_to_check = [];                            // suppression des cartes à vérifier
      console.log("cards_to_check après traitement = " + cards_to_check[0]); // debug
      click_disabled = false;                         // click réactivé
    }, 2000);

    console.log("cards_to_check après vérif = " + cards_to_check.length);
    if(cards_to_check.length === 0) {   // NE FONCTIONNE PAS A VOIR PLUS TARD
      window.clearTimeout(timer);         // pour supprimer la tempo quand les cartes sont trouvées
    }
  }


};

// --- FIN DES DECLARATIONS DE FONCTIONS ----- FIN DES DECLARATIONS DE FONCTIONS --------------

// déclaration des 30 cartes disponnibles
const available_cards = [
  ["./Assets/icon/ant.svg",         "ant",         "fourmi",        "carte 1"],
  ["./Assets/icon/bat.svg",         "bat",         "chauve-souris", "carte 1"],
  ["./Assets/icon/bear.svg",        "bear",        "ours",          "carte 1"],
  ["./Assets/icon/bee.svg",         "bee",         "abeille",       "carte 1"],
  ["./Assets/icon/butterfly.svg",   "butterfly",   "papillon",      "carte 1"],
  ["./Assets/icon/cat.svg",         "cat",         "chat",          "carte 1"],
  ["./Assets/icon/cow.svg",         "cow",         "vache",         "carte 1"],
  ["./Assets/icon/dog.svg",         "dog",         "chien",         "carte 1"],
  ["./Assets/icon/donkey.svg",      "donkey",      "âne",           "carte 1"],
  ["./Assets/icon/duck.svg",        "duck",        "canard",        "carte 1"],
  ["./Assets/icon/eel.svg",         "eel",         "anguille",      "carte 1"],
  ["./Assets/icon/falcon.svg",      "falcon",      "faucon",        "carte 1"],
  ["./Assets/icon/fish.svg",        "fish",        "poisson",       "carte 1"],
  ["./Assets/icon/fly.svg",         "fly",         "mouche",        "carte 1"],
  ["./Assets/icon/fox.svg",         "fox",         "renard",        "carte 1"],
  ["./Assets/icon/frog.svg",        "frog",        "grenouille",    "carte 1"],
  ["./Assets/icon/goat.svg",        "goat",        "chèvre",        "carte 1"],
  ["./Assets/icon/grasshopper.svg", "grasshopper", "sauterelle",    "carte 1"],
  ["./Assets/icon/horse.svg",       "horse",       "cheval",        "carte 1"],
  ["./Assets/icon/ladybug.svg",     "ladybug",     "coccinelle",    "carte 1"],
  ["./Assets/icon/monkey.svg",      "monkey",      "singe",         "carte 1"],
  ["./Assets/icon/otter.svg",       "otter",       "loutre",        "carte 1"],
  ["./Assets/icon/pig.svg",         "pig",         "cochon",        "carte 1"],
  ["./Assets/icon/rabbit.svg",      "rabbit",      "lapin",         "carte 1"],
  ["./Assets/icon/shark.svg",       "shark",       "requin",        "carte 1"],
  ["./Assets/icon/sheep.svg",       "sheep",       "mouton",        "carte 1"],
  ["./Assets/icon/snail.svg",       "snail",       "escargot",      "carte 1"],
  ["./Assets/icon/snake.svg",       "snake",       "serpent",       "carte 1"],
  ["./Assets/icon/spider.svg",      "spider",      "araignée",      "carte 1"],
  ["./Assets/icon/whale.svg",       "whale",       "baleine",       "carte 1"]
];
// Récupère l'ID "game_board"
const game_board = document.getElementById("game_board");

// récupère n cartes parmis les 30 disponnibles
let nb_cards = 4 ;// let nb_cards = window.prompt("Saisir le nombre de cates à trouver (min : 4 ; max : 9)");  // Déclare le nombre de cartes à trouver
// if(nb_cards > 9) {
//   nb_cards = 9;
// }else if(nb_cards < 4){
//   nb_cards = 4;
// }
// window.alert(`Le jeux est créé avec ${nb_cards} cartes.`)

let nb_cards_discovered = 0;
let selected_cards = select_n_cards(available_cards,nb_cards);
// console.log("selected = " + selected_cards);    // debug
let all_cards = duplicate_array(selected_cards);  // duplication des cartes
all_cards = shuffle_array(all_cards);             // mélange des cartes
let cards_to_check = [];                          // cartes sélectionnées pour vérification
// console.log("all_cards = " + all_cards);    // debug

// affichage des cartes dans le html
all_cards.forEach(card_to_create => {
  const card_html = create_card(card_to_create[0],card_to_create[1],card_to_create[2],card_to_create[3]);
  // Pas vraiment compris la logique derrière le "card_to_create" et "card_to_create[i]"
  // Fonctionne très bien en mettant card_to_create[integer, i] d'ailleur ...
  game_board.appendChild(card_html);
});
