import { db } from "../firebase";
import firebase from "firebase/compat/app";

function getTransactionsByEmail(email) {
  return db
    .collection("Transactions")
    .where("userName", "==", email)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs;
    })
    .catch((err) => console.error(err));
}

function getPendingTransactionsByEmail(email) {
  return db
    .collection("Transactions")
    .where("userName", "==", email)
    .where("status","==","Pending")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs;
    })
    .catch((err) => console.error(err));
}

function cancelTransaction(id) {
  return db
    .collection("Transactions")
    .doc(id)
    .update({ status: "Cancelled" });
}
function addTransaction(data) {
  db.collection("Transactions")
    .add({
      ...data,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((err) => console.error(err));
}
export { getTransactionsByEmail, cancelTransaction,addTransaction,getPendingTransactionsByEmail };
