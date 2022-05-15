import { db } from "../firebase";

function getHubs(){
    return db.collection('Hubs').get().then((querySnapshot) => {
        return querySnapshot.docs;
      })
      .catch((err) => console.error(err));
}

export {getHubs}

function getHubFromName(name){
    return db
    .collection("Hubs")
    .where('hubName','==',name)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs;
    })
    .catch((err) => console.error(err));
}
export {getHubFromName}