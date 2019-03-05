function hasStorage(storageType) {
  switch (storageType) {
    case 'LS':
      try {
        if(!('localStorage' in window)) {
          throw 'localStorage is not supported in this browser';
        }
      } catch (exception) {
        console.error(exception);
        return false

      }
      break;
    case 'SS':
      try {
        if(!('sessionStorage' in window)) {
          throw 'sessionStorage is not supported in this browser';
        }
      } catch (exception) {
       console.error(exception);
        return false;
      }
      break;
    case 'IDB':
      try {
        if(!('indexedDB' in window)) {
          throw 'indexedDB is not supported in this browser';
        }
      } catch (exception) {
        console.error(exception);
        return false
      }
      break;
  }
}