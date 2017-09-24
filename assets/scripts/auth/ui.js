'use strict'

const store = require('../store')

// const api = require('./api')

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
}

const onLoginFailure = function () {
  console.log('didnt work bro')
}

const onLogoutSuccess = function () {
  $('#alert-div').html('<p>Logged Out Successfully!</p>')
  $('#alert-div').removeClass('hidden')
  $('#alert-div').addClass('alert-success')
  $('#alert-div').removeClass('alert-danger')
  $('.app-view').addClass('hidden')
  $('.login-view').removeClass('hidden')
  store.userData = null
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

const onCreateSongSuccess = function () {
  console.log('YOU DID IT!!!')
}

const onCreateSongFailure = function () {
  console.log('damn.')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onLoginSuccess,
  onLoginFailure,
  onLogoutSuccess,
  onLogoutFailure,
  onChangePassSuccess,
  onChangePassFailure,
  onCreateSongSuccess,
  onCreateSongFailure
}
