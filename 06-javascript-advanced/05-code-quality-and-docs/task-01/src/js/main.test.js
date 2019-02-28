const $ = require('jquery');
import App from './main.js';

test('handle clean form', () => {
  expect(new App()).toBeInstanceOf(App);
});
test('check constructor of the class ', () => {
  const obj = new App();
  expect(obj.checkbox.checked).toBeFalsy();
});
test('isCheckboxClicked should run open details if checkbox is checked', () => {
  document.body.innerHTML = `<input checked id="details_block">`;
  const obj = new App();
  obj.checkbox.is(':checked');
  expect(obj.details).toBeFalsy();
  obj.isCheckboxClicked();
  expect(obj.details).toBeTruthy();
});
test('openDetails should create details', () => {
  document.body.innerHTML = `<input checked id="details_block">`;
  const obj = new App();
  expect(obj.details).toBeFalsy();
  obj.openDetails();
  expect(obj.details).toBeTruthy();
});
test('closeSubmitted should delete successPopup and successHolder', () => {
  document.body.innerHTML = `<input id="success-PopUpOverlay">
<input class="successHolder">`;
  const obj = new App();
  obj.successPopup = $('#success-PopUpOverlay');
  obj.successHolder = $('.successHolder');
  expect(obj.successPopup.attr('id')).toBe('success-PopUpOverlay');
  expect(obj.successHolder.hasClass('successHolder')).toBeTruthy();
  obj.closeSubmitted();
  expect($('#success-PopUpOverlay').attr('id')).not.toBe('success-PopUpOverlay');
  expect($('.successHolder').hasClass('successHolder')).toBeFalsy();
});
test('constructor`s variables', () => {
  document.body.innerHTML = `<input id="details_block">
<input id="name"><input id="second_name"><input class="SubmitButton">`;
  const obj = new App();
  expect(obj.checkbox.attr('id')).toBe('details_block');
  expect(obj.checkbox.checked).toBe(false);
  expect(obj.name.attr('id')).toBe('name');
  expect(obj.secondName.attr('id')).toBe('second_name');
  expect(obj.submitButton.hasClass('SubmitButton')).toBeTruthy();
});
test('ShowErrorName should receive class error when the length of name less then 3', () => {
  document.body.innerHTML = `<input id="name" value="3">`;
  const obj = new App();
  expect(obj.name.hasClass('error')).toBeFalsy();
  obj.showErrorName();
  expect(obj.name.hasClass('error')).toBeTruthy();
});
test('ShowErrorSecondName should receive class error when the length of name less then 3', () => {
  document.body.innerHTML = `<input id="second_name" value="3">`;
  const obj = new App();
  expect(obj.secondName.hasClass('error')).toBeFalsy();
  obj.showErrorSecondName();
  expect(obj.secondName.hasClass('error')).toBeTruthy();
});
test('doSubmit create variables,successPopup,successHolder,successHolderName ', () => {
  const obj = new App();
  obj.showErrorName = jest.fn(()=>true);
  obj.showErrorSecondName = jest.fn(()=>true);
  const e = {};
  e.preventDefault = ()=> true;
  obj.doSubmit(e);
  expect(obj.showErrorName).toHaveBeenCalled();
  expect(obj.showErrorSecondName).toHaveBeenCalled();
  expect(obj.successPopup.attr('id')).toBe('success-PopUpOverlay');
  expect(obj.successHolder).toBeTruthy();
  expect(obj.successHolderName).toBeTruthy();
});

