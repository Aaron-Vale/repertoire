'use strict'

const store = require('../store')
const appApi = require('../app/api')
const appUi = require('../app/ui')

const onSignUpSuccess = function (data) {
  $('#signup-form').find('input[type=email], input[type=password]').val('')
  $('#alert-div').html('<p>You have successfully registered!<p>')
  $('#alert-div').removeClass('hidden')
  $('#alert-div').addClass('alert-success')
  $('#alert-div').removeClass('alert-danger')
}

const onSignUpFailure = function () {
  $('#alert-div').html('<p>Something went wrong. Either you have already registered or your passwords don\'t match!</p>')
  $('#alert-div').removeClass('hidden')
  $('#alert-div').addClass('alert-danger')
  $('#alert-div').removeClass('alert-success')
}

const onLoginSuccess = function (data) {
  $('#login-form').find('input[type=email], input[type=password]').val('')
  store.userData = data
  $('.login-view').addClass('hidden')
  $('.app-view').removeClass('hidden')
  appApi.getSongs()
    .then(appUi.onGetSongsSuccess)
    .catch(appUi.onGetSongsFailure)
}

const onLoginFailure = function () {
  $('#alert-div').html('<p>Something went wrong. Either you haven\'t registered or your password is incorrect.')
  $('#alert-div').removeClass('hidden')
  $('#alert-div').addClass('alert-danger')
  $('#alert-div').removeClass('alert-success')
}

const onLogoutSuccess = function () {
  $('#alert-div').html('<p>Logged Out Successfully!</p>')
  $('#alert-div').removeClass('hidden')
  $('#alert-div').addClass('alert-success')
  $('#alert-div').removeClass('alert-danger')
  $('.app-view').addClass('hidden')
  $('.login-view').removeClass('hidden')
  store.userData = null
  appUi.clearTable()
  $('.itunes-search-results').html('')
  $('.itunes-search-song').find('input[type=text]').val('')
}

const onLogoutFailure = function () {
  $('#app-alert-div').html('<p>Unable to log out</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
}

const onChangePassSuccess = function () {
  $('#change-pass').find('input[type=password]').val('')
  $('#app-alert-div').html('<p>Password Successfully Changed!</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-success')
  $('#app-alert-div').removeClass('alert-danger')
  $('#app-alert-div').delay(2000).fadeOut('2000')
}

const onChangePassFailure = function () {
  $('#app-alert-div').html('<p>Unable to change password. Please try again!</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onLoginSuccess,
  onLoginFailure,
  onLogoutSuccess,
  onLogoutFailure,
  onChangePassSuccess,
  onChangePassFailure
}
