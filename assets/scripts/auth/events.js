'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onLogin = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.login(data)
    .then(ui.onLoginSuccess)
    .catch(ui.onLoginFailure)
}

const onLogout = function () {
  const data = store.userData
  api.logout(data)
    .then(ui.onLogoutSuccess)
    .catch(ui.onLogoutFailure)
}

const onChangePass = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePass(data)
    .then(ui.onChangePassSuccess)
    .catch(ui.onChangePassFailure)
  $('#changePassModal').modal('hide')
}

const onCreateSong = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  data.song.user_id = store.userData.user.id
  api.createSong(data)
    .then(ui.onCreateSongSuccess)
    .catch(ui.onCreateSongFailure)
}

const setEventListeners = function () {
  $('#signup-form').on('submit', onSignUp)
  $('#login-form').on('submit', onLogin)
  $('.logout-btn').on('click', onLogout)
  $('#change-pass').on('submit', onChangePass)
  $('.create-song-form').on('submit', onCreateSong)
}

module.exports = {
  setEventListeners
}
