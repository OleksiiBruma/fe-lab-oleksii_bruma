Storage.get = (key,
               storageType = Storage.LOCAL_STORAGE,
               callback) => {

  if (hasStorage(storageType)) {
    return
  }
  try {
    if (!callback && storageType === 'IDB') {
      throw 'callback is required';

    }
  } catch (err) {
    console.error(err);
    return;
  }
this.value = undefined;
  switch (storageType) {
    case 'LS':
      this.value = JSON.parse(localStorage.getItem(key));
      break;
    case 'SS':
      this.value = JSON.parse(sessionStorage.getItem(key));
      break;
    case 'IDB':
      console.log(this.value);
      break;
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
      const getRequest = store.get(key);
      getRequest.onsuccess = (event) => {
        callback(getRequest.result);
      }
    };
  }
  return this.value;
};
