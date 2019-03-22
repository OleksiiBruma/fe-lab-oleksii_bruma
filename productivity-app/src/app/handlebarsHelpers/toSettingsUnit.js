module.exports = function (settingsName) {
  switch (settingsName) {
    case 'work-time':
    case 'short-break':
    case 'long-break':
      return 'minutes';
      break;
    case 'work-iteration':
      return 'iterations';
      break;
  }
};
