'use strict';

/**
 * Represents a form.
 * @class
 */
class Form {
  /**
   * Represents a book.
   * @constructor
   */
  constructor() {
    this.checkbox = $('#details_block');
    this.checkbox.checked = false;
    this.body = $('body');
    this.name = $('#name');
    this.secondName = $('#second_name');
    this.submitButton = $('.SubmitButton');
    this.openDetails = this.openDetails.bind(this);
    this.isCheckboxClicked = this.isCheckboxClicked.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
    this.closeSubmitted = this.closeSubmitted.bind(this);
    this.showErrorName = this.showErrorName.bind(this);
    this.showErrorSecondName = this.showErrorSecondName.bind(this);
    this.initializeCloseButton = this.initializeCloseButton.bind(this);
  }
  /**
   * Method that opens details window
   * @method
   */
  openDetails() {
    this.checkbox.after('<div class=\'details\' id=\'details\'><p>' +
        '<textarea id=\'txtArea\'></textarea></p></div>');
    this.details = $('.details');
  }
  /**
   * Method that checks whether checkbox
   * @method
   */
  isCheckboxClicked() {
    if (this.checkbox.is(':checked')) {
      this.openDetails();
    } else {
      this.details.remove();
    }
  }
  /**
   * Method that closes submitted
   * @method
   */
  closeSubmitted() {
    this.successPopup.remove();
    this.successHolder.remove();
  }
  /**
   * Method that initializes close button
   * @method
   */
  initializeCloseButton() {
    this.closeButton = $('.close-button');
    this.closeButton.on('click', this.closeSubmitted);
  }
  /**
   * Method that show error when name`s length less then 3
   * @method
   * @return {boolean}
   */
  showErrorName() {
    if (this.name.val().length < 3) {
      this.name.addClass('error');
    } else {
      this.name.removeClass('error');
      return true;
    }
  }
  /**
   * Method that show error when second name`s length less then 3
   * @method
   * @return {boolean}
   */
  showErrorSecondName() {
    if (this.secondName.val().length < 3) {
      this.secondName.addClass('error');
    } else {
      this.secondName.removeClass('error');
      return true;
    }
  };
  /**
   * Method that show error when name`s length less then 3
   * @method
   * @param {object} e for preventing default action.
   */
  doSubmit(e) {
    e.preventDefault();
    if (this.showErrorName() && this.showErrorSecondName()) {
      this.body.append('<div class=\'success-PopUpOverlay\' ' +
          'id=\'success-PopUpOverlay\'></div>' +
          '<div class=\'successHolder\'>' +
          '<span class="successHolder__name">' +
          '</span>thanks for your request!</div>');
      this.successPopup = $('#success-PopUpOverlay');
      this.successHolder = $('.successHolder');
      this.successHolderName = $('.successHolder__name');
      this.successHolder.append('<button ' +
          'class=\'close-button\'>Close</button>');
      this.successHolderName.html(this.name.val() +
          ',<br><br>');
      this.initializeCloseButton();
    }
  }
  /**
   * Method that initializes listeners
   * @method
   */
  initListeners() {
    this.name.on('change', this.showErrorName);
    this.secondName.on('change', this.showErrorSecondName);
    this.submitButton.on('click', this.doSubmit);
    this.checkbox.on('click', this.isCheckboxClicked);
  }
}

const form = new Form();
form.initListeners();

