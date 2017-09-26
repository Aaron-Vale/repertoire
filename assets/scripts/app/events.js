'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

const onSearchItunes = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  $('.itunes-search-results').html('')
  api.searchItunes(data.search)
    .then(ui.onSearchItunesSuccess)
    .catch(ui.onSearchItunesFailure)
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
  $('.itunes-search-song').on('submit', onSearchItunes)
  $('.create-song-form').on('submit', onCreateSong)
  $('.itunes-search-results').on('submit', '.itunes-create-song-form', onCreateSong)
}

module.exports = {
  setEventListeners
}
