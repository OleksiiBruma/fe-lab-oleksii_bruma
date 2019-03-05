Storage.getAll = (storageType = Storage.LOCAL_STORAGE, callback) => {
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
  return value;
};