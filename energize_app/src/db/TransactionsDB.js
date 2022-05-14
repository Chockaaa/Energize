import { db } from "../firebase";

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

export { getTransactionsByEmail };
