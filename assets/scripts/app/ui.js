'use strict'

const showSongsTemplate = require('../templates/song-table.handlebars')
const iTunesSongSearchTemplate = require('../templates/itunes-song-search.handlebars')
const api = require('./api')

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
}

const clearTable = function () {
  $('.table-body').html('')
}

const onEditSong = function () {
  const elementId = $(this).parent().parent().attr('data-id')
  const instrument = $(this).parent().siblings()[0]
  const composer = $(this).parent().siblings()[1]
  const name = $(this).parent().siblings()[2]
  instrument.contentEditable = true
  name.contentEditable = true
  composer.contentEditable = true
  $(instrument).css('background-color', 'rgba(255, 255, 0, 0.5)')
  $(name).css('background-color', 'rgba(255, 255, 0, 0.5)')
  $(composer).css('background-color', 'rgba(255, 255, 0, 0.5)')
  $(this).next().hide() // Hide delete button
  $(this).parent().append('<button class="btn btn-info confirm-song-btn">Confirm</button>')
  $(this).hide()
  $('.confirm-song-btn').on('click', function () {
    onConfirmSong(elementId, instrument, name, composer)
  })
}

const onDeleteSong = function () {
  const elementId = $(this).parent().parent().attr('data-id')
  api.deleteSong(elementId)
    .then(onDeleteSongSuccess)
    .catch(onDeleteSongFailure)
}

const onDeleteSongSuccess = function () {
  clearTable()
  api.getSongs()
    .then(onGetSongsSuccess)
    .catch(onGetSongsFailure)
}

const onDeleteSongFailure = function () {
  console.log('didnt work bro')
}

const onConfirmSong = function (elementId, instrument, name, composer) {
  const newInstrument = $(instrument).html()
  const newComposer = $(composer).html()
  const newName = $(name).html()
  const data =
    {
      song: {
        instrument: newInstrument,
        composer: newComposer,
        name: newName
      }
    }
  api.editSong(elementId, data)
    .then(onEditSongSuccess)
    .catch(onEditSongFailure)
}

const onEditSongSuccess = function () {
  clearTable()
  api.getSongs()
    .then(onGetSongsSuccess)
    .catch(onGetSongsFailure)
}

const onEditSongFailure = function () {
  console.log('nope')
}

const onSearchItunesSuccess = function (data) {
  const search = JSON.parse(data)
  const showSongsHtml = iTunesSongSearchTemplate({ songs: search.results })
  $('.itunes-search-results').append(showSongsHtml)
}

const onSearchItunesFailure = function () {
  console.log('nope')
}

module.exports = {
  onCreateSongSuccess,
  onCreateSongFailure,
  onGetSongsSuccess,
  onGetSongsFailure,
  onSearchItunesSuccess,
  onSearchItunesFailure,
  clearTable,
  onEditSongSuccess
}
