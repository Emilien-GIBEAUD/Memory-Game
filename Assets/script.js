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
  return card;
}

//Code pour tester la fonction
const game_board = document.getElementById("game_board");
game_board.appendChild(create_card("./Assets/icon/bat.svg"));
game_board.appendChild(create_card("./Assets/icon/bee.svg"));
game_board.appendChild(create_card("./Assets/icon/frog.svg"));
