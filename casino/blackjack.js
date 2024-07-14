/* 
Dette er koden for blackjack-spillet vårt. Du må satse en sum med penger for å kunne spille (mengden kan ikke være negativ eller mer enn det du har), og hvis du slår dealeren får du tilbake det dobbelte av det du satset. Hvis du får blackjack får 1.5x det du satset. Du kan selv velge om du vil ha et nytt kort, men hvis du går over 21 taper du automatisk.
*/

// Definering av element
let betBoxEl = document.querySelector("#betBox");
let betBox2El = document.querySelector("#betBox2");
let knappEl = document.querySelector(".button");
let resultatEl = document.querySelector("#resultat");
let dealerTallEl = document.querySelector("#dealerTall");
let spillerTallEl = document.querySelector("#spillerTall");
let didricoinEl = document.querySelector("#didricoin");
let bet = document.querySelector("#bet");


// Henting av didricoins fra local storage
let didricoin = Number(localStorage.didricoins)

// Eventlistener til knappen
knappEl.addEventListener("click", startHand);

// En klasse for kortstokken
class Deck{
  constructor(){
    this.deck = [];
    this.reset();
    this.shuffle();
  }

  reset(){
    this.deck = [];

    // Suit
    const typer = ['Hjerter', 'Spar', 'Kløver', 'Ruter'];

    // Verdi
    const verdier = ['Ess', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Knekt', 'Dronning', 'Konge'];

    // 2 for-løkker for å lage 52 kort
    for (let suit in typer) {
      for (let value in verdier) {
        this.deck.push(`${typer[suit]} ${verdier[value]}`);
      }
    }
  }

  // Funksjon som stokker kortene
  shuffle(){
    const { deck } = this;
    let m = deck.length, i;

    while(m){
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return this;
  }
}

// Definering av variabler og lister
let dealerTall = 0
let dealerTallSlutt = 0
let spillerTall = 0
let kortstokk = []
let husKort = []
let husKortNavn = []
const deck = new Deck();


// Oppdatering av didricoin-displayet
function updateCoin() {
  localStorage.didricoins = didricoin
  didricoinEl.innerHTML = localStorage.user + " : " + localStorage.didricoins + " didricoins"
}

updateCoin()

// Startinga av hånden
function startHand() {
  bet = document.querySelector("#bet");
  let betV = Number(bet.value)

  console.log(betV)
  console.log(typeof(betV))

  // Pass på at veddemengde er mer enn 0, og mindre eller lik det du allerede har
  if(betV <= didricoin && betV > 0){
    resultatEl.innerHTML = ""
    dealerTall = 0
    spillerTall = 0
    husKort = []
    husKortNavn = []
  
    // Fortelle brukeren hvilke kort som blir lagt opp
    resultatEl.innerHTML = ""
    dealerTallEl.innerHTML = "Dealeren har " + dealerTall
    spillerTallEl.innerHTML = "Du har " + spillerTall
  
    // Stokke kortene
    deck.reset();
    deck.shuffle();
    kortstokk = deck.deck

    // Du mister antallet du veddet
    didricoin -= bet.value
    updateCoin()
  
    // Legge til ny knapp for nytt kort
    betBoxEl.innerHTML = '<button id="nyttKortKnapp">Nytt Kort</button>'
    let nyttKortKnappEl = document.querySelector("#nyttKortKnapp")
    nyttKortKnappEl.addEventListener("click", dealKort);

    // Legge til ny knapp for å holde kortene
    betBox2El.innerHTML += '<button id="nyHoldeKnapp">Holde Kortene</button>'
    let nyHoldeKnappEl = document.querySelector("#nyHoldeKnapp")
    nyHoldeKnappEl.addEventListener("click", visHusKort);
  
    // Deale kort for huset og deg selv
    dealHusKort()
    dealKort()  

    // Oppdatere coindisplayet
    updateCoin()
  }
  else  {
    // Hvis du ikke kan vedde mengden din
    resultatEl.innerHTML = "Du kan ikke vedde denne mengden"
  }
}

// Dette er en funksjon som omgjør fjeskortene om til verdi. Knekt, dronning og konge returnerer 10, og ess returnerer 11. Vanlige tall returnerer sin egen verdi som integer
function kortVerdi(navn) {
  if (navn == "Ess"){
    return 11
  }
  else if (navn == "Knekt"){
    return 10
  }
  else if (navn == "Dronning"){
    return 10
  }
  else if (navn == "Konge"){
    return 10
  } else {
    return Number(navn)
  }
}

// Funksjon som dealer ut kort
function dealKort() {
  // Dette passer på at det samme kortet ikke blir delt ut to ganger
  let tempKort = kortstokk.pop()
  
  let tempSpillerVerdi = tempKort.split(" ")
  let tempSpillerTall = tempSpillerVerdi[1]
  
  tempSpillerTall = kortVerdi(tempSpillerTall)

  spillerTall += Number(tempSpillerTall)

  
  
  
  // Skrive til spilleren
  resultatEl.innerHTML += "Ditt kort er " + tempKort + "<br>"
  dealerTallEl.innerHTML = "Dealeren har " + dealerTall
  spillerTallEl.innerHTML = "Du har " + spillerTall

  
  // Hvis spilletallet er over 21, har spilleren tapt
  if(spillerTall > 21){    
    resultatEl.innerHTML += "<h3>Du har over 21! Du tapte!</h3>"
    betBoxEl.innerHTML = " "
    betBox2El.innerHTML = ''
    updateCoin()

    // Legge til ny knapp for å spille på nytt
    betBoxEl.innerHTML = '<label for="bet">Current Bet</label>'
    betBoxEl.innerHTML += '<input type="number" id="bet" placeholder="0"> <br>'
    betBoxEl.innerHTML += '<button id="nyHandKnapp">Spille på nytt?</button>'
    let nyHandKnappEl = document.querySelector("#nyHandKnapp")
    nyHandKnappEl.addEventListener("click", startHand);
  } 

  // Hvis du treffer 21, får du 1.5 innsatsen
  else if (spillerTall == 21){
    resultatEl.innerHTML += "<h3>BLACKJACK</h3>"
    betBoxEl.innerHTML = " "
    didricoin += Number(bet.value) * 2.5
    updateCoin()

    // Fjerne alt i betbox og betbox2
    betBoxEl.innerHTML = " "
    betBox2El.innerHTML = ''
    updateCoin()

    // Ny knapp for å spille på nytt
    betBoxEl.innerHTML = '<label for="bet">Current Bet</label>'
    betBoxEl.innerHTML += '<input type="number" id="bet" placeholder="0"> <br>'
    betBoxEl.innerHTML += '<button id="nyHandKnapp">Spille på nytt?</button>'
    let nyHandKnappEl = document.querySelector("#nyHandKnapp")
    nyHandKnappEl.addEventListener("click", startHand);
    }
}

// Denne funksjonen gir kort til huset
function dealHusKort() {
  // Definering av variabler
  let tempHusKort = 0
  let tempHusVerdi = 0
  let tempHusTall = 0
  let i = 0

  // Denne loopen skal kjøre helt til huset har 16 eller over i verdi
  while(i < 16){
    tempHusKort = kortstokk.pop()
    tempHusVerdi = tempHusKort.split(" ")
    tempHusTall = tempHusVerdi[1]
    tempHusTall = kortVerdi(tempHusTall)
    husKort.push(tempHusTall)
    husKortNavn.push(tempHusKort)
    i += tempHusTall
  }
  dealerTall = husKort[0]
  console.log(husKortNavn)
  dealerTallSlutt = i
}

// Denne funksjonen viser verdien huset har
function visHusKort() {
  for (let k=0; k < husKortNavn.length; k++){
    resultatEl.innerHTML += "<h3> Huset hadde " + husKortNavn[k] + "</h3>"
  }

  resultatEl.innerHTML += "<h2> Huset endte opp på " + dealerTallSlutt + "</h2>"
  resultatEl.innerHTML += "<h2> Du endte opp på " + spillerTall + "</h2>"
  
  if(dealerTallSlutt < spillerTall || dealerTallSlutt > 21){  
    resultatEl.innerHTML += "<h3>\n Du vant!</h3>"
    didricoin += Number(bet.value)*2
  } else if(dealerTallSlutt > spillerTall){
    resultatEl.innerHTML += "<h3>\n Du tapte!</h3>"
  } else if(dealerTallSlutt == spillerTall){
    resultatEl.innerHTML += "<h3>Uavgjort!</h3>"
    didricoin += Number(bet.value)
  }

  // Fjerning av betbox og betbox2
  betBoxEl.innerHTML = " "
  betBox2El.innerHTML = ''
  updateCoin()

  // Ny knapp
  betBoxEl.innerHTML = '<label for="bet">Current Bet</label>'
  betBoxEl.innerHTML += '<input type="number" id="bet" placeholder="0"> <br>'
  betBoxEl.innerHTML += '<button id="nyHandKnapp">Spille på nytt?</button>'
  let nyHandKnappEl = document.querySelector("#nyHandKnapp")
  nyHandKnappEl.addEventListener("click", startHand);
}