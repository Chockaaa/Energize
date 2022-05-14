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

function updateUserCreditBalance(email, creditBalance) {
  db.collection("Users")
    .where("userName", "==", email)
    .limit(1)
    .get()
    .then((query) => {
      const doc = query.docs[0];
      let user = doc.data();
      user.creditBalance = creditBalance;
      doc.ref.update(user);
    });
}

export { addUser, getUserCreditBalance, updateUserCreditBalance };
