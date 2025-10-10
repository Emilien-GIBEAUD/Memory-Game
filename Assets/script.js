// --- MISE EN PLACE DU JEU -----------------------------------------------------------------------

const game_board = document.getElementById("game_board");
const horizontal = document.getElementById("horizontal");
const vertical = document.getElementById("vertical");

// Déclaration des paramètres de jeu
const timeout = 1000;           // durée d'affichage des cartes non identiques (ms)
const nb_x_min = 3 ;            // nombre de cartes minimun à l'horizontale
const nb_x_max = 8 ;            // nombre de cartes maximun à l'horizontale
const nb_y_min = 3 ;            // nombre de cartes minimun à la verticale
const nb_y_max = 6 ;            // nombre de cartes maximun à la verticale
let nb_x;                       // nombre de cartes à l'horizontale (input utilisateur)
let nb_y;                       // nombre de cartes à la verticale (input utilisateur)
let nb_cards;                   // nombre de cartes à trouver (calculé avec nb_x et nb_y)
let nb_cards_discovered;        // nombre de cartes trouvées
let selected_cards;             // cartes sélectionnées parmis les cartes disponibles
let all_cards;                  // cartes sélectionnées avec les doublons
let cards_to_check;             // paire de cartes en sélection pour vérification

let click_disabled = false;     // Le click est activé au démarrage

// déclaration des cartes disponibles
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

// Lancement du jeu au chargement de la page (ou au rafraîchissement)
start();

// Bouton pour recharger le jeu
const start_button = document.getElementById("start");
start_button.addEventListener("click", start);


// --- DÉBUT DES DECLARATIONS DE FONCTIONS --------------------------------------------------------
/* Carte d'exemple :
<div class="card" data-value="./Assets/icon/grasshopper.svg" data-id="carte 2">
    <img class="card_content" src="./Assets/icon/grasshopper.svg">
    <p class="name_en">grasshopper</p>
    <p class="name_fr">(sauterelle)</p>
</div> */


/**
* Crée une carte avec une image, un nom en anglais, un nom en français et le numéro de carte ("carte 1").
* @param {string} card_address - L'URL de l'image de la carte.
* @param {string} english_name - Le nom de l'animal en anglais.
* @param {string} french_name - Le nom de l'animal en français.
* @param {string} card_id - "carte 1".
*/
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

    card.addEventListener("click", card_check);        // ajoute un écouteur d'événement au click

    return card;
};
/* //Code pour tester la fonction
const game_board = document.getElementById("game_board");
game_board.appendChild(create_card("./Assets/icon/bat.svg"));
game_board.appendChild(create_card("./Assets/icon/bee.svg"));
game_board.appendChild(create_card("./Assets/icon/frog.svg")); */

/**
* Duplique un tableau.
* Le tableau se retrouve avec 2 fois chaque élément ("carte 1" et "carte 2").
* @param {array} array_simple - L'URL de l'image de la carte.
*/
function duplicate_array(array_simple) {
    let array_double = [];
    array_double.push(...JSON.parse(JSON.stringify(array_simple))); // Copie profonde
    // ... : ajoute 1 à 1 les cases du tableau, ajoute le tableau complet dans la 1ère case sinon

    let array_simple_clone = JSON.parse(JSON.stringify(array_simple)); // Copie profonde
    for (let i = 0;i < array_simple_clone.length; i++){
        array_simple_clone[i][3] = "carte 2";                 // pour différencier les 2 cartes
    }
    array_double.push(...array_simple_clone);               // ajoute le clone avec les "carte 2"
    return array_double;
};

/**
* Mélange un tableau.
* @param {array} array - Le tableau à mélanger.
*/
function shuffle_array (array) {
    const array_shuffled = array.sort(() => 0.5 - Math.random());
    return array_shuffled
};

/**
* Retourne un tableau avec les n premières valeurs d'un autre tableau.
* @param {array} array - Le tableau d'où extraire les valeurs.
* @param {integer} n - Le nombre de valeurs à extraire.
* @returns {array} Le tableau avec les n premières valeurs de array.
*/
function select_n_cards (array,n) {
    let array_out = [];
    array = shuffle_array(array);
    for(let i = 0; i <n; i++) {
        array_out.push(array[i]);
    }
    return array_out;
}

/**
* Vérifie une paire de carte.
* Si une carte est cliquée, elle est rendue visible.
* Si une deuxième carte est cliquée, elle est également rendue visible.
* Si elles sont identiques, elles sont encadrées en vert immédiatement et conservées visibles.
* Si elles sont différentes, une tempo de 2s s'enclenche pour mémorisation puis les cartes sont masquées.
* Si toutes les paires sont trouvées, une alerte de félicitations s'affiche.
* @param {HTMLElement} elem - L'élément HTML à rendre visible.
*/
function card_check(elem){
    if(click_disabled){
        return;
    }

    const card = elem.target.parentElement;     // cible le parent
    card.classList.add("flip");                 // ajoute la class="flip" au parent
    cards_to_check.push(card);                  // ajoute une carte à vérifier

    if(cards_to_check.length === 2) {
        click_disabled = true;                // click désactivé si 2 cartes sont en sélection

        let timer = window.setTimeout(() => { // démarre un timer de 2 secondes
                cards_to_check[0].classList.remove("flip");   // supprime les class="flip"
                cards_to_check[1].classList.remove("flip");
                cards_to_check = [];                            // suppression des cartes à vérifier
                click_disabled = false;                         // click réactivé
            }, timeout);

        if( (cards_to_check[0].dataset.value === cards_to_check[1].dataset.value) && 
            (cards_to_check[0].dataset.id !== cards_to_check[1].dataset.id) ) { // paire trouvée
            window.clearTimeout(timer);
            // ajoute les class="matched" et supprime les écouteurs d'événement
            cards_to_check[0].classList.add("matched");
            cards_to_check[1].classList.add("matched");
            cards_to_check[0].removeEventListener("click", card_check);
            cards_to_check[1].removeEventListener("click", card_check);

            nb_cards_discovered++;
            cards_to_check = [];                            // suppression des cartes à vérifier
            click_disabled = false;                         // click réactivé
            if(nb_cards_discovered === nb_cards) {
            window.alert("Bravo, vous avez gagné !!!");
            }
        }
    }
};


/**
* Relance le jeu (en utilisant les paramètres saisis).
*/
function start() {
    nb_cards_discovered = 0;
    // Suppression des cartes
    const div_card = document.querySelectorAll(".card");
    div_card.forEach(div => {
        div.remove();
    })

    // Récupération et validation des paramètres
    nb_x = parseInt(escapeHTML(horizontal.value));
    nb_x = nb_x < nb_x_min ? (nb_x_min , horizontal.value = nb_x_min) : nb_x;
    nb_x = nb_x > nb_x_max ? (nb_x_max , horizontal.value = nb_x_max) : nb_x;

    nb_y = parseInt(escapeHTML(vertical.value));
    nb_y = nb_y < nb_y_min ? (nb_y_min , vertical.value = nb_y_min) : nb_y;
    nb_y = nb_y > nb_y_max ? (nb_y_max , vertical.value = nb_y_max) : nb_y;

    nb_cards = ((nb_x * nb_y) / 2) - ((nb_x * nb_y) % 2);

    // Mise en place de la grille
    game_board.style.gridTemplateColumns    = `repeat(${nb_x}, 100px)`;
    game_board.style.gridTemplaterows       = `repeat(${nb_y}, 100px)`;

    selected_cards = select_n_cards(available_cards,nb_cards);
    all_cards = duplicate_array(selected_cards);
    all_cards = shuffle_array(all_cards);
    cards_to_check = [];

    // Affichage des cartes
    all_cards.forEach(card_to_create => {
        const card_html = create_card(card_to_create[0],card_to_create[1],card_to_create[2],card_to_create[3]);
        game_board.appendChild(card_html);
    });
}

/**
* Échappe le HTML d'un input pour éviter les attaques XSS.
* Convertit les caractères spéciaux (<, >, &, etc.) en entités HTML.
* @param {string|number} input - L'input à échapper.
* @returns {string} L'input avec les caractères HTML échappés.
*/
function escapeHTML(text){
    const tempHtml = document.createElement("div");
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}

// --- FIN DES DECLARATIONS DE FONCTIONS ----------------------------------------------------------



