const Storage = {
  LOCAL_STORAGE: 'LS',
  SESSION_STORAGE: 'SS',
  INDEXED_DB: 'IDB',
  _IDB_CONNECTION() {
    const request = indexedDB.open('db', 1);
    request.onerror = function( event) {
      console.log('indexedDB connection lost')
    };
    return request
  }
};



