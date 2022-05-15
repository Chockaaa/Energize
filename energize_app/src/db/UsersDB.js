import { db } from "../firebase";

function addUser(email) {
  let data = {
    userName: email,
    creditBalance: 0,
    creditCardInfo: {},
  };
  db.collection("Users")
    .add({
      ...data,
    })
    .catch((err) => console.error(err));
}

function getUserInfo(email) {
  return db
    .collection("Users")
    .where("userName", "==", email)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs[0]?.data();
    })
    .catch((err) => console.error(err));
}

function updateUserCreditBalance(email, updateAmount) {
  return db.collection("Users")
    .where("userName", "==", email)
    .limit(1)
    .get()
    .then((query) => {
      const doc = query.docs[0];
      let user = doc.data();
      user.creditBalance = user.creditBalance + updateAmount;
      doc.ref.update(user);
    });
}

function addCreditCardInfo(email, data){
  return db.collection("Users")
    .where("userName", "==", email)
    .limit(1)
    .get()
    .then((query) => {
      const doc = query.docs[0];
      let user = doc.data();
      user.creditCardInfo = data;
      doc.ref.update(user);
    });
}

export { addUser, getUserInfo, updateUserCreditBalance, addCreditCardInfo };
