/*
Save didricoin
*/


// Firebase oppsett
const firebaseConfig = {
    apiKey: "", // Removed for github
    authDomain: "ting-659b5.firebaseapp.com",
    projectId: "ting-659b5",
    storageBucket: "ting-659b5.appspot.com",
    messagingSenderId: "307243188120",
    appId: "1:307243188120:web:5bc508d0e196844e4475ed",
    measurementId: "G-P9ZVZF3W4J"
};
firebase.initializeApp(firebaseConfig);

// Lager en referanse til databasen
let db = firebase.firestore();

// Definerer 2 element ved hjelp av queryselector
let didricoinEl = document.querySelector("#didricoin");
let pushButtonEl = document.querySelector("#pushDrc")


// Undersøker om localStorage-variabelen er satt
if (localStorage.antallBesok) {
  // Alt lagres som tekst i localStorage, så vi må gjøre om til tall
  localStorage.antallBesok = Number(localStorage.antallBesok) + 1;
} else {
  // Hvis brukeren aldri har besøkt, skal de ha 0 didricoins
  localStorage.antallBesok = 1;
  localStorage.didricoins = 0;
}

if (localStorage.user){
  didricoinEl.innerHTML = localStorage.user + " : " + localStorage.didricoins + " didricoins"
} else {
  localStorage.didricoins = 0;
  didricoinEl.innerHTML = '<h2>Registrer ny bruker under Scoreboard</h2>'
}




function pushCoin(){

  //let currentId = `-ting_ranking/${localstorage.userTag}/elo`
  //db.ref(currentId).set(Number(localStorage.didricoins));

  db.collection("ting_ranking").get().then((snapshot) => {
  // Henter ut dokumentene
    let dokumenter = snapshot.docs;
  
    
    for (let i = 0; i < dokumenter.length; i++) {
      if (dokumenter[i].data().ting == localStorage.user){

        let id = dokumenter[i].id

        db.collection("ting_ranking").doc(id).update({
          elo: Number(localStorage.didricoins)
        });


        pushButtonEl.innerHTML = "Du har lagret din saldo"
        
        
      }
    } 
});
}



pushButtonEl.addEventListener("click", pushCoin)