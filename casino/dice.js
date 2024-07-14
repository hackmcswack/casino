// Terningkast
/*
I dette spillet setter du inn en egenbestemt mengde didricoin, og triller en terning. Hvis du får 6, får du tilbake 5 gangen av det du satte inn. Hvis du ikke får 6 mister du det du satte inn. Du kan ikke sette inn mer enn det du har, eller negative tall. 
*/

// Her definerer elementer med queryselector
let bodyEl = document.querySelector("body");
let bet = document.querySelector("#bet");
let knappEl = document.querySelector(".button");
let resultatEl = document.querySelector("#resultat");
let payoutEl = document.querySelector("#payout");
let didricoinEl = document.querySelector("#didricoin");
let mainImgEl = document.querySelector("#mainImg");
let diceShadowEl = document.querySelector(".diceShadow");

// Henter din saldo fra local storage
let didricoin = Number(localStorage.didricoins)

// Legger til en eventlistener for start-knappen
knappEl.addEventListener("click", roll);


// Denne funksjonen oppdaterer displayet som viser saldoen din
function updateCoin() {
  localStorage.didricoins = didricoin
  didricoinEl.innerHTML = localStorage.user + " : " + localStorage.didricoins + " didricoins"
}

 
// Dette er hovedfunksjonen til diceroll
function roll() {

  // Passe på at veddemengden er større enn null, men også lik eller mindre enn din nåværende saldo
  if(bet.value <= didricoin && bet.value > 0){ 
    // Bestemmer siden terningen skal lande på
    let terningVerdi = Math.floor(Math.random() * 6) + 1

    // Skriver antallet du veddet i resultat-divven
    resultatEl.innerHTML = "Du veddet " + bet.value + " didricoin"

    // Hvis terningen treffer 6
    if (terningVerdi == 6){
      let winAmount = bet.value * 5 // Tjene 5 ganger ditt innskudd
      payoutEl.innerHTML = "Gratulerer! Terningen rullet en 6er, og du tjente " + winAmount + " didricoin!" // Skrive det til brukeren
      didricoin = didricoin + winAmount // Legge til i didricoin-variabelen
    } 

    // Hvis den ikke treffer 6
    else{
      payoutEl.innerHTML = "Du tapte! Terningen rullet en " + terningVerdi + "er, og du mistet " + bet.value + " didricoin." // Skrive det til brukeren
      didricoin = didricoin - bet.value // Legge til i didricoin-variabelen
    }

    // Bildene til de forskjellige terningverdiene. Her vil også fargen på boxshadow endre seg
    if (terningVerdi == 1){ // 1
      mainImgEl.innerHTML = "<img src='./bilder/dice1.png' width='150px' height='150px'>"
      diceShadowEl.style.boxShadow = "2px 2px 10px 4px red"
    }
    if (terningVerdi == 2){ // 2
      mainImgEl.innerHTML = "<img src='./bilder/dice2.png' width='150px' height='150px'>"
      diceShadowEl.style.boxShadow = "2px 2px 10px 4px red"
    }
    if (terningVerdi == 3){ // 3
      mainImgEl.innerHTML = "<img src='./bilder/dice3.png' width='150px' height='150px'>"
      diceShadowEl.style.boxShadow = "2px 2px 10px 4px red"
    }
    if (terningVerdi == 4){ // 4
      mainImgEl.innerHTML = "<img src='./bilder/dice4.png' width='150px' height='150px'>"
      diceShadowEl.style.boxShadow = "2px 2px 10px 4px red"
    }
    if (terningVerdi == 5){ // 5
      mainImgEl.innerHTML = "<img src='./bilder/dice5.png' width='150px' height='150px'>"
      diceShadowEl.style.boxShadow = "2px 2px 10px 4px red"
    }
    if (terningVerdi == 6){ // 6
      mainImgEl.innerHTML = "<img src='./bilder/dice6.png' width='150px' height='150px'>"
      diceShadowEl.style.boxShadow = "2px 2px 10px 4px green"
    }
 
  }
  else if(bet.value > didricoin){ // Hvis brukeren ikke har nok penger
    payoutEl.innerHTML = "Du har ikke nok penger"
  }
  else{ // Hvis brukeren vedder negativ mengde eller 0
    payoutEl.innerHTML = "Du kan ikke vedde den mengden"
  }
  
  updateCoin() // Kalle oppdateringsfunksjonen 
}

updateCoin() // Starte med å opdatere saldodisplayet