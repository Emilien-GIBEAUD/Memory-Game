const available_cards = [
  // "./Assets/icon/ant.svg", "./Assets/icon/bat.svg", "./Assets/icon/bear.svg", "./Assets/icon/bee.svg", "./Assets/icon/butterfly.svg", "./Assets/icon/cat.svg", "./Assets/icon/cow.svg", "./Assets/icon/dog.svg", "./Assets/icon/donkey.svg", "./Assets/icon/duck.svg", "./Assets/icon/eel.svg", "./Assets/icon/falcon.svg", "./Assets/icon/fish.svg", "./Assets/icon/fly.svg", "./Assets/icon/fox.svg", "./Assets/icon/frog.svg", "./Assets/icon/goat.svg", "./Assets/icon/grasshopper.svg", "./Assets/icon/horse.svg", "./Assets/icon/ladybug.svg", "./Assets/icon/monkey.svg", "./Assets/icon/otter.svg", "./Assets/icon/pig.svg", "./Assets/icon/rabbit.svg", "./Assets/icon/shark.svg", "./Assets/icon/sheep.svg", "./Assets/icon/snail.svg", "./Assets/icon/snake.svg", "./Assets/icon/spider.svg", "./Assets/icon/whale.svg"
  ["./Assets/icon/ant.svg",         "ant",         "fourmi"       ],
  ["./Assets/icon/bat.svg",         "bat",         "chauve-souris"],
  ["./Assets/icon/bear.svg",        "bear",        "ours"         ],
  ["./Assets/icon/bee.svg",         "bee",         "abeille"      ],
  ["./Assets/icon/butterfly.svg",   "butterfly",   "papillon"     ],
  ["./Assets/icon/cat.svg",         "cat",         "chat"         ],
  ["./Assets/icon/cow.svg",         "cow",         "vache"        ],
  ["./Assets/icon/dog.svg",         "dog",         "chien"        ],
  ["./Assets/icon/donkey.svg",      "donkey",      "âne"          ],
  ["./Assets/icon/duck.svg",        "duck",        "canard"       ],
  ["./Assets/icon/eel.svg",         "eel",         "anguille"     ],
  ["./Assets/icon/falcon.svg",      "falcon",      "faucon"       ],
  ["./Assets/icon/fish.svg",        "fish",        "poisson"      ],
  ["./Assets/icon/fly.svg",         "fly",         "mouche"       ],
  ["./Assets/icon/fox.svg",         "fox",         "renard"       ],
  ["./Assets/icon/frog.svg",        "frog",        "grenouille"   ],
  ["./Assets/icon/goat.svg",        "goat",        "chèvre"       ],
  ["./Assets/icon/grasshopper.svg", "grasshopper", "sauterelle"   ],
  ["./Assets/icon/horse.svg",       "horse",       "cheval"       ],
  ["./Assets/icon/ladybug.svg",     "ladybug",     "coccinelle"   ],
  ["./Assets/icon/monkey.svg",      "monkey",      "singe"        ],
  ["./Assets/icon/otter.svg",       "otter",       "loutre"       ],
  ["./Assets/icon/pig.svg",         "pig",         "cochon"       ],
  ["./Assets/icon/rabbit.svg",      "rabbit",      "lapin"        ],
  ["./Assets/icon/shark.svg",       "shark",       "requin"       ],
  ["./Assets/icon/sheep.svg",       "sheep",       "mouton"       ],
  ["./Assets/icon/snail.svg",       "snail",       "escargot"     ],
  ["./Assets/icon/snake.svg",       "snake",       "serpent"      ],
  ["./Assets/icon/spider.svg",      "spider",      "araignée"     ],
  ["./Assets/icon/whale.svg",       "whale",       "baleine"      ]
];

let selected_cards = [
  // "./Assets/icon/butterfly.svg", "./Assets/icon/cat.svg", "./Assets/icon/duck.svg", "./Assets/icon/eel.svg", "./Assets/icon/falcon.svg", "./Assets/icon/fly.svg", "./Assets/icon/frog.svg", "./Assets/icon/grasshopper.svg", "./Assets/icon/horse.svg"
  ["./Assets/icon/butterfly.svg",   "butterfly",   "papillon"     ],
  ["./Assets/icon/cat.svg",         "cat",         "chat"         ],
  ["./Assets/icon/duck.svg",        "duck",        "canard"       ],
  ["./Assets/icon/eel.svg",         "eel",         "anguille"     ],
  ["./Assets/icon/falcon.svg",      "falcon",      "faucon"       ],
  ["./Assets/icon/fly.svg",         "fly",         "mouche"       ],
  ["./Assets/icon/frog.svg",        "frog",        "grenouille"   ],
  ["./Assets/icon/grasshopper.svg", "grasshopper", "sauterelle"   ],
  ["./Assets/icon/horse.svg",       "horse",       "cheval"       ],
];
console.log(selected_cards);
const game_board = document.getElementById("game_board");   // Récupère l'ID "game_board"

/* fonction qui crée une carte à partir d'une URL/adresse card_address
<div class="card" data-value="./Adresse/de/l'image.svg">
  <img class="card_content" src="./Adresse/de/l'image.svg">
    <p>nom anglais</p>
    <p><em>(nom français)</em></p>
</div> */
function create_card(card_address, english_name, french_name) {
  const card = document.createElement("div");           // crée une <div>
  card.classList.add("card");                           // avec la class="card"
  card.dataset.value = card_address;                    // avec la data-value="card_address"

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

  card.addEventListener("click", on_card_click);

  return card;
};
/* //Code pour tester la fonction
const game_board = document.getElementById("game_board");
game_board.appendChild(create_card("./Assets/icon/bat.svg"));
game_board.appendChild(create_card("./Assets/icon/bee.svg"));
game_board.appendChild(create_card("./Assets/icon/frog.svg")); */

// fonction qui duplique un tableau
function duplicate_array(array_simple) {
  let array_double = [];
  array_double.push(...array_simple);   // ... : ajoute une à une les cases du tableau
  array_double.push(...array_simple);   // ajoute le tableau complet dans la première case sinon
  return array_double;
};

// fonction qui mélange le tableau
function shuffle_array (array) {
  const array_shuffled = array.sort(() => 0.5 - Math.random());
  return array_shuffled
};

// fonction qui retourne une carte au click
function on_card_click(elem){
  const card = elem.target.parentElement;   // cible le parent
  card.classList.add("flip");               // ajoute la class="flip" au parent
};

// création des n cartes
let all_cards = duplicate_array(selected_cards);
console.log(all_cards);

// mélange des cartes
all_cards = shuffle_array(all_cards);
console.log(all_cards);

// affichage des cartes dans le html
all_cards.forEach(card_to_create => {
  const card_html = create_card(card_to_create[0],card_to_create[1],card_to_create[2]);
  // Pas vraiment compris la logique derrière le "card_to_create" et "card_to_create[i]"
  // Fonctionne très bien en mettant card_to_create[integer, i] d'ailleur ...
  game_board.appendChild(card_html);
});
