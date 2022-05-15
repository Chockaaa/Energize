import { db } from "../firebase";

function getHubs() {
  return db
    .collection("Hubs")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs;
    })
    .catch((err) => console.error(err));
}

export { getHubs };

function getHubFromName(name) {
  return db
    .collection("Hubs")
    .where("hubName", "==", name)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs;
    })
    .catch((err) => console.error(err));
}
export { getHubFromName };

function updateHubEnergyCapacity(updateAmount, hubId) {
  var hubName =""
  if (hubId === 1001) {
    hubName = "Alpha";
  } else if (hubId === 1002) {
    hubName = "Bravo";
  } else if (hubId === 1003) {
    hubName = "Charlie";
  } else {
    hubName = "Delta";
  }
  return db
    .collection("Hubs")
    .where("hubName", "==", hubName)
    .limit(1)
    .get()
    .then((query) => {
      const doc = query.docs[0];
      let Hub = doc.data();
      Hub.hubCurrentCapacity = Hub.hubCurrentCapacity + updateAmount;
      doc.ref.update(Hub);
    });
}
export { updateHubEnergyCapacity };
