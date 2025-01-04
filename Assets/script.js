const available_cards = [
  "./Assets/icon/ant.svg", "./Assets/icon/bat.svg", "./Assets/icon/bear.svg", "./Assets/icon/bee.svg", "./Assets/icon/butterfly.svg", "./Assets/icon/cat.svg", "./Assets/icon/cow.svg", "./Assets/icon/dog.svg", "./Assets/icon/donkey.svg", "./Assets/icon/duck.svg", "./Assets/icon/eel.svg", "./Assets/icon/falcon.svg", "./Assets/icon/fish.svg", "./Assets/icon/fly.svg", "./Assets/icon/fox.svg", "./Assets/icon/frog.svg", "./Assets/icon/goat.svg", "./Assets/icon/grasshopper.svg", "./Assets/icon/horse.svg", "./Assets/icon/ladybug.svg", "./Assets/icon/monkey.svg", "./Assets/icon/otter.svg", "./Assets/icon/pig.svg", "./Assets/icon/rabbit.svg", "./Assets/icon/shark.svg", "./Assets/icon/sheep.svg", "./Assets/icon/snail.svg", "./Assets/icon/snake.svg", "./Assets/icon/spider.svg", "./Assets/icon/whale.svg"
];

let selected_cards = [
  "./Assets/icon/butterfly.svg", "./Assets/icon/cat.svg", "./Assets/icon/duck.svg", "./Assets/icon/eel.svg", "./Assets/icon/falcon.svg", "./Assets/icon/fly.svg", "./Assets/icon/frog.svg", "./Assets/icon/grasshopper.svg", "./Assets/icon/horse.svg"
];
const game_board = document.getElementById("game_board");   // Récupère l'ID "game_board"

/* fonction qui crée une carte à partir d'une URL/adresse card_address
<div class="card" data-value="./Adresse/de/l'image.svg">
  <img class="card_content" src="./Adresse/de/l'image.svg">
</div> */
function create_card(card_address) {
  const card = document.createElement("div");           // crée une <div>
  card.classList.add("card");                           // avec la class="card"
  card.dataset.value = card_address;                    // avec la data-value="card_address"

  const card_content = document.createElement("img");   // crée une <img>
  card_content.classList.add("card_content");           // avec la class="card_content"
  card_content.src = `${card_address}`;                 // avec la src="card_address"
  card.appendChild(card_content);                       // ajoute l'enfant "card_content" à "card"

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
// mélange des cartes
all_cards = shuffle_array(all_cards);
// affichage des cartes dans le html
all_cards.forEach(card_to_create => {
  const card_html = create_card(card_to_create);
  game_board.appendChild(card_html);
});
