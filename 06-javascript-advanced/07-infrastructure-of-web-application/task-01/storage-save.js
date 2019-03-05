Storage.save = (key, value,
     storageType = Storage.LOCAL_STORAGE, callback)=> {
  try {
    if (!callback && storageType === 'IDB') {
      throw 'callback is required';
    }

  }
  catch(err) {
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
            case 'IDB':
              resolve('saved');
              break;
            default:
              alert('Please specify correct type');
          }

        });
    promise
        .then(
            result => callback(result)
        )
  }


};