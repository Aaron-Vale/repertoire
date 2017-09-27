'use strict'

const showSongsTemplate = require('../templates/song-table.handlebars')
const iTunesSongSearchTemplate = require('../templates/itunes-song-search.handlebars')
const api = require('./api')

const onCreateSongSuccess = function () {
  $('.create-song-form').find('input[type=text]').val('')
  $('#app-alert-div').html('<p>Song Created!</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-success')
  $('#app-alert-div').removeClass('alert-danger')
  $('#app-alert-div').delay(2000).fadeOut('2000')

  clearTable()
  api.getSongs()
    .then(onGetSongsSuccess)
    .catch(onGetSongsFailure)
}

const onCreateSongFailure = function () {
  $('#app-alert-div').html('<p>Unable to create song.</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
}

const onGetSongsSuccess = function (data) {
  const showSongsHtml = showSongsTemplate({ songs: data.songs })
  $('.table-body').append(showSongsHtml)
  $('td').each(function () {
    let text = $(this).html()
    text = text.replace(/&amp;/g, '&')
    $(this).html(text)
  })
  // Add Emojis to Instrument
  $('.table-instrument').each(function () {
    let instrument = $(this).html()
    instrument = instrument.toLowerCase()
    if (instrument === 'piano' || instrument === 'keyboard') {
      $(this).append(' 🎹')
    }
    if (instrument === 'saxophone' ||
      instrument === 'alto saxophone' ||
      instrument === 'tenor saxophone' ||
      instrument === 'soprano saxophone' ||
      instrument === 'baritone saxophone') {
      $(this).append(' 🎷')
    }
    if (instrument === 'guitar' ||
      instrument === 'electric guitar' ||
      instrument === 'acoustic guitar' ||
      instrument === 'spanish guitar' ||
      instrument === 'classical guitar') {
      $(this).append(' 🎸')
    }
    if (instrument === 'vocals' ||
      instrument === 'vocal' ||
      instrument === 'voice') {
      $(this).append(' 🎙️')
    }
    if (instrument === 'violin') {
      $(this).append(' 🎻️')
    }
  })
  $('.edit-song-btn').on('click', onEditSong)
  $('.delete-song-btn').on('click', onDeleteSong)
}

const onGetSongsFailure = function () {
  $('#app-alert-div').html('<p>Unable to get songs.</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
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
  $(instrument).css('background-color', 'rgba(255, 255, 0, 0.5)') // Show user editable fields
  $(name).css('background-color', 'rgba(255, 255, 0, 0.5)')
  $(composer).css('background-color', 'rgba(255, 255, 0, 0.5)')
  $(instrument).keydown(function (e) { // Prevent user from adding new lines in table
    if (e.which === 13) { // 13 --> enter key
      instrument.blur()
    }
  })
  $(name).keydown(function (e) {
    if (e.which === 13) {
      name.blur()
    }
  })
  $(composer).keydown(function (e) {
    if (e.which === 13) {
      composer.blur()
    }
  })
  $(this).next().hide() // Hide delete button
  $(this).parent().append('<button class="cool-btn btn-info confirm-song-btn">Confirm</button>')
  $(this).hide()
  $('.confirm-song-btn').on('click', function () {
    onConfirmSong(elementId, instrument, name, composer)
  })
}

const onDeleteSong = function () {
  const elementId = $(this).parent().parent().attr('data-id')
  $(this).parent().append('<button class="cool-btn btn-danger confirm-delete-btn">Confirm</button>')
  $(this).parent().append('<button class="cool-btn btn-default cancel-delete-btn">Cancel</button>')
  const editBtn = $(this).siblings()[0]
  $(editBtn).remove()
  $(this).remove()
  $('.confirm-delete-btn').on('click', function () {
    api.deleteSong(elementId)
      .then(onDeleteSongSuccess)
      .catch(onDeleteSongFailure)
  })
  $('.cancel-delete-btn').on('click', function () {
    $(this).siblings().each(function () {
      $(this).remove()
    })
    $(this).parent().append('<button class="cool-btn edit-song-btn">Edit</button>')
    $(this).parent().append('<button class="cool-btn delete-song-btn">Delete</button>')
    $('.edit-song-btn').on('click', onEditSong)
    $('.delete-song-btn').on('click', onDeleteSong)
    $(this).remove()
  })
}

const onDeleteSongSuccess = function () {
  $('#app-alert-div').html('<p>Song Deleted!</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-success')
  $('#app-alert-div').removeClass('alert-danger')
  $('#app-alert-div').delay(2000).fadeOut('2000')
  clearTable()
  api.getSongs()
    .then(onGetSongsSuccess)
    .catch(onGetSongsFailure)
}

const onDeleteSongFailure = function () {
  $('#app-alert-div').html('<p>Unable to delete song.</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
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
  $('#app-alert-div').html('<p>Table change complete!</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-success')
  $('#app-alert-div').removeClass('alert-danger')
  $('#app-alert-div').delay(2000).fadeOut('2000')
  clearTable()
  api.getSongs()
    .then(onGetSongsSuccess)
    .catch(onGetSongsFailure)
}

const onEditSongFailure = function () {
  $('#app-alert-div').html('<p>Unable to edit song.</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
}

const onSearchItunesSuccess = function (data) {
  const search = JSON.parse(data)
  const showSongsHtml = iTunesSongSearchTemplate({ songs: search.results })
  $('.itunes-search-results').append(showSongsHtml)
}

const onSearchItunesFailure = function () {
  $('#itunesModal').modal('hide')
  $('#app-alert-div').html('<p>Unable to search iTunes</p>')
  $('#app-alert-div').show()
  $('#app-alert-div').removeClass('hidden')
  $('#app-alert-div').addClass('alert-danger')
  $('#app-alert-div').removeClass('alert-success')
  $('#app-alert-div').delay(2000).fadeOut('2000')
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
