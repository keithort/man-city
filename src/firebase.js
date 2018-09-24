import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBIG809ilQ8Zi1z9kKJKiemHhZq_h7ivHA",
  authDomain: "mancity-a1bbe.firebaseapp.com",
  databaseURL: "https://mancity-a1bbe.firebaseio.com",
  projectId: "mancity-a1bbe",
  storageBucket: "mancity-a1bbe.appspot.com",
  messagingSenderId: "799272409731"
};

firebase.initializeApp(config);

const db = firebase.database();
const dbMatches = db.ref("matches");
const dbPromotions = db.ref("promotions");
const dbTeams = db.ref("teams");
const dbPlayers = db.ref("players");

export { db, firebase, dbMatches, dbPromotions, dbTeams, dbPlayers };
