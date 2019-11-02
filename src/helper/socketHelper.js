
let pushSocketIdToArray = (clients, currentId, socketId) => {
  if (clients[currentId]) {
    clients[currentId].push(socketId);
  } else {
    clients[currentId] = [socketId];
  }

  return clients;
};

let removeSocketIdFromArray = (clients, currentId , socketIdCurrent) => {
  clients[currentId] = clients[currentId].filter( socketId => socketId !== socketIdCurrent );
  if (!clients[currentId].length) {
    delete clients[currentId];
  }
  return clients;
};

module.exports = {
  pushSocketIdToArray,
  removeSocketIdFromArray
}