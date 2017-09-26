'use strict'

const store = require('../store')
const appApi = require('../app/api')
const appUi = require('../app/ui')

const onSignUpSuccess = function (data) {
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
  store.userData = data
  $('.login-view').addClass('hidden')
  $('.app-view').removeClass('hidden')
  appApi.getSongs()
    .then(appUi.onGetSongsSuccess)
    .catch(appUi.onGetSongsFailure)
}

const onLoginFailure = function () {
  console.log('login no work bro')
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
}

const onLogoutFailure = function () {
  console.log('didnt work bro')
}

const onChangePassSuccess = function () {
  console.log('Password successfully changed.')
}

const onChangePassFailure = function () {
  console.log('Something went wrong. Please try again.')
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
