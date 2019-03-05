Storage.getAll = (storageType = Storage.LOCAL_STORAGE, callback) => {
  if(hasStorage(storageType)) {
    return
  }
  try {
    if (!callback && storageType === 'IDB') {
      throw 'callback is required';
    }
    let value;
    switch (storageType) {
      case 'LS':
        value = ({localStorage: localStorage});
        break;
      case 'SS':
        value = ({sessionStorage: sessionStorage});
        break;
      case 'IDB':
        break;
    }
  } catch (err) {
    console.error(err);
  }
  if (callback) {

    let promise = new Promise(
        function (resolve, reject) {
          switch (storageType) {
            case 'LS':
              resolve(JSON.parse(localStorage.getItem(key)));
              break;
            case 'SS':
              resolve(JSON.parse(sessionStorage.getItem(key)));
              break;
            case 'IDB':
              resolve('idb value');
              break;
          }

        });
    promise
        .then(
            result => callback(result)
        )
  }
  if (storageType === 'IDB' && callback) {
    const request = Storage._IDB_CONNECTION();
    request.onsuccess = () => {
      const db = event.target.result;
      const tx = db.transaction('store');
      const store = tx.objectStore('store');
      const getRequest = store.getAll();
      getRequest.onsuccess = (event) => {
        callback(getRequest.result);
      }
    };
  }
  return value;
};