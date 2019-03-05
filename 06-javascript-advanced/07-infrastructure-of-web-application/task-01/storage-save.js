Storage.save = (key, value,
                storageType = Storage.LOCAL_STORAGE, callback) => {
  if (hasStorage(storageType)) {
    return
  }
  try {
    if (!callback && storageType === 'IDB') {
      throw 'callback is required';
    }

  } catch (err) {
    console.error(err);
  }
  if (callback) {
    let promise = new Promise(
        function (resolve, reject) {
          switch (storageType) {
            case 'LS':
              localStorage.setItem(key, JSON.stringify(value));
              resolve('saved');
              break;
            case 'SS':
              sessionStorage.setItem(key, JSON.stringify(value));
              resolve('saved');
              break;
          }
        });
    promise
        .then(
            result => callback(result)
        );
  }
    if (storageType === 'IDB' && callback) {
     const request = Storage._IDB_CONNECTION();
     request.onupgradeneeded = ()=>{
       const db = event.target.result;
       const objectStore = db.createObjectStore('store', {
         autoIncrement: false
       });
       objectStore.add(value,key);
     };
      request.onsuccess = ()=>{
      callback();
      }

    }
};