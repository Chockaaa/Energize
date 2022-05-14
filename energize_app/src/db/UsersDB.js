import { db } from "../firebase";

function addUser(email) {
  let data = {
    userName: email,
    creditBalance: 0,
  };
  db.collection("Users")
    .add({
      ...data,
    })
    .catch((err) => console.error(err));
}

function getUserCreditBalance(email) {
  return db
    .collection("Users")
    .where("userName", "==", email)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs[0]?.data().creditBalance;
    })
    .catch((err) => console.error(err));
}

export { addUser, getUserCreditBalance };
