module.exports = function (data) {
  const estimationCount = [];
  for (let i = 1; i < data.estimation + 1; i++) {
    if (data.completedCount.some(number => number === i)) {
      estimationCount.push('timer__estimate--success');
    } else if (data.failedPomodoros.some(number => number === i)) {
      estimationCount.push('timer__estimate--failed');
    } else estimationCount.push('');
  }
  return estimationCount;
};
