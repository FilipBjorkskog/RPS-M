import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    remove,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJtEV2rI9Pqz0s4q1P-qGGBiqbFV1gbt0",
    authDomain: "bingos-3a550.firebaseapp.com",
    projectId: "bingos-3a550",
    storageBucket: "bingos-3a550.appspot.com",
    messagingSenderId: "147720804378",
    appId: "1:147720804378:web:2ccdc36d24dd56b18c59a3",
    databaseURL: "https://multiplayer-rps-422a9-default-rtdb.europe-west1.firebasedatabase.app"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


let p1
let p2
let wins = 0
let losses = 0
let ties = 0

onChildAdded(ref(db, "/"), function (data) {
    // Check who made move
    if (data.key == "P1") {
        p1 = data.val()
        document.getElementById("H2").innerText = "Player 1 has chosen"
    }

    if (data.key == "P2") {
        p2 = data.val()
    }

    // Do calculation
    if (p1 && p2) {
        //P1 Wins
        if (p1 == "rock" && p2 == "scissors") {
            losses++;
            document.getElementById('losses').innerText = losses;

        } else if (p1 == "paper" && p2 == "rock") {
            losses++;
            document.getElementById('losses').innerText = losses;
        } else if (p1 == "scissors" && p2 == "rock") {
            losses++;
            document.getElementById('losses').innerText = losses;
        }
        // P1 Losses
        else if (p1 == "rock" && p2 == "paper") {
            wins++;
            document.getElementById('wins').innerText = wins;
        } else if (p1 == "paper" && p2 == "scissors") {
            wins++;
            document.getElementById('wins').innerText = wins;
        } else if (p1 == "scissors" && p2 == "rock") {
            wins++;
            document.getElementById('wins').innerText = wins;
        }
        // P1 & P2 ties
        else if (p1 == "rock" && p2 == "rock") {
            ties++;
            document.getElementById('ties').innerText = ties;
        } else if (p1 == "paper" && p2 == "paper") {
            ties++;
            document.getElementById('ties').innerText = ties;
        } else if (p1 == "scissors" && p2 == "scissors") {
            ties++;
            document.getElementById('ties').innerText = ties;
        }

        p1 = null
        p2 = null
        remove(ref(db, "P2/"))
        document.getElementById("H2").innerHTML = " "
    }

});


document.getElementById('Rock2').addEventListener("click", function () {
    set(ref(db, "P2/"), "rock")
});

document.getElementById('Paper2').addEventListener("click", function () {
    set(ref(db, "P2/"), "paper")
});

document.getElementById('Scissors2').addEventListener("click", function () {
    set(ref(db, "P2/"), "scissors")
});