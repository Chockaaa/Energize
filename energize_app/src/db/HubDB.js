import { db } from "../firebase";

function getHubs(){
    return db.collection('Hubs').get().then((querySnapshot) => {
        return querySnapshot.docs;
      })
      .catch((err) => console.error(err));
}

export {getHubs}

function getHubFromID(id){
    return db
    .collection("Hubs")
    .doc(id)
    .get()
    .then((doc) => {
      return doc;
    })
    .catch((err) => console.error(err));
}
export {getHubFromID}