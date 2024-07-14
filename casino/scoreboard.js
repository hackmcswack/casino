// Firebasekonfigurasjonen vår
const firebaseConfig = {
    apiKey: "", // Removed for github
    authDomain: "ting-659b5.firebaseapp.com",
    projectId: "ting-659b5",
    storageBucket: "ting-659b5.appspot.com",
    messagingSenderId: "307243188120",
    appId: "1:307243188120:web:5bc508d0e196844e4475ed",
    measurementId: "G-P9ZVZF3W4J"
};

// Initialisering av Firebase, og lage en referanse til firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

// Elementer fra DOM
let hovedEl = document.querySelector("#hoved")
let tingEl = document.querySelector("#ting")
let nybrukerEl = document.querySelector("#nybruker")
let registrerBtn = document.querySelector("#registrer")

// Legger til lytter
registrerBtn.addEventListener("click", addUser)

// Lage referanse til navnet på collectionen
let collectionName = "ting_ranking"



// Funksjon som legger til ny bruker i databasen
function addUser() {
  let unik = 1 // Variabel som brukes til å sjekke om et brukernavn er tatt
  
  db.collection(collectionName).orderBy("elo", "desc").get().then((snapshot) => {
    // Referanse til snapshottet
    let dokumenter = snapshot.docs;

    // Går gjennom dokumentene
    for (let i = 0; i < dokumenter.length; i++) {
      // Sjekker om det du har skrevet inn er det samme som noe i databasen
      if (tingEl.value == dokumenter[i].data().ting){
        unik = 0 // Sette unik til 0 hvis den oppdager to like navn
      }
    }

    // Hvis to like navn ble oppdaget
    if (unik == 0){
      tingEl.value = "" // Tømme feltet
      nybrukerEl.innerHTML += "Brukernavnet er tatt. Refresh siden" // Knappen ville ikke la meg registrere en gang til etter dette skjedde. Forteller brukeren at de må refreshe. Kan fikses i fremtiden.
    }

    // Hvis navnet er unikt
    else {
      db.collection(collectionName).add({ 
          ting: tingEl.value, // Legge til verdien til inputfeltet ditt
          elo: Number(1000) // Alle starter med 1000
      })
  
      // Fjerner input-felt, og forteller brukeren deres eget brukernavn
      nybrukerEl.innerHTML = `<p>Bruker: ${tingEl.value}</p>`

      // Lagrer begge verdiene i localstorage
      localStorage.user = tingEl.value
      localStorage.didricoins = 1000

      // Tømme input felt
      tingEl.value = ""
      
      // Console log for utviklere
      console.log("Brukeren er lagt inn i databasen")
      
      // Henter brukerene på nytt
      getUsers()
    }
  });
}

// Denne funksjonen henter alle brukerene og skriver dem inn på nettsiden
function getUsers() {
    db.collection(collectionName).orderBy("elo", "desc").get().then((snapshot) => {
        let dokumenter = snapshot.docs;
        hovedEl.innerHTML = ""

        // Går gjennom dokumentene
        for (let i = 0; i < dokumenter.length; i++) {
            // Henter data for en enkelt bruker
            let bruker = dokumenter[i].data()

            let id = dokumenter[i].id

            hovedEl.innerHTML += `<h2 style='text-decoration: underline;'>Rank ${i + 1}</h2>`
            hovedEl.innerHTML += `<p>Brukernavn: ${bruker.ting}</p>`
            hovedEl.innerHTML += `<p>Didricoins: ${bruker.elo}</p>`
            hovedEl.innerHTML += "<br>"  
        }
    });
}

// Starter med å hente brukerene
getUsers()