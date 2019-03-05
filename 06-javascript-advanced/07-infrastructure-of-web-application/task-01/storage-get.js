Storage.get = (key,
               storageType = Storage.LOCAL_STORAGE,
               callback) => {
  try {
    if (!callback && storageType === 'IDB') {
      throw 'callback is required';
    }
  }
  catch(err) {
    console.error(err);
  }
  let value;
  switch (storageType) {
    case 'LS':
      value = JSON.parse(localStorage.getItem(key));
      break;
    case 'SS':
      value = JSON.parse(sessionStorage.getItem(key));
      break;
    case 'IDB':
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
  return value;
};
