'use strict'

const store = require('../store')
const api = require('./api')
const showSongsTemplate = require('../templates/song-table.handlebars')

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
  api.getSongs()
    .then(onGetSongsSuccess)
    .catch(onGetSongsFailure)
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
  clearTable()
  api.getSongs()
    .then(onGetSongsSuccess)
    .catch(onGetSongsFailure)
}

const onCreateSongFailure = function () {
  console.log('damn.')
}

const onGetSongsSuccess = function (data) {
  const showSongsHtml = showSongsTemplate({ songs: data.songs })
  $('.table-body').append(showSongsHtml)
  $('.edit-song-btn').on('click', onEditSong)
  $('.delete-song-btn').on('click', onDeleteSong)
}

const onGetSongsFailure = function () {
  console.log('nope.')
}

const clearTable = function () {
  $('.table-body').html('')
}

const onEditSong = function () {
  const elementId = $(this).parent().parent().attr('data-id')
}

const onDeleteSong = function () {
  const elementId = $(this).parent().parent().attr('data-id')
  api.deleteSong(elementId)
    .then(onDeleteSongSuccess)
    .catch(onDeleteSongFailure)
}

const onDeleteSongSuccess = function () {
  console.log('he gone!')
  clearTable()
  api.getSongs()
    .then(onGetSongsSuccess)
    .catch(onGetSongsFailure)
}

const onDeleteSongFailure = function () {
  console.log('didnt work bro')
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
