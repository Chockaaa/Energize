import { db } from "../firebase";

function getPackages() {
  return db
    .collection("Packages")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs;
    })
    .catch((err) => console.error(err));
}

export { getPackages }