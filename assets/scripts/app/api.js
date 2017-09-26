'use strict'

const config = require('../config')
const store = require('../store')

const createSong = function (data) {
  const token = store.userData.user.token
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const deleteSong = function (id) {
  const token = store.userData.user.token
  return $.ajax({
    url: config.apiOrigin + '/songs/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const editSong = function (id, data) {
  const token = store.userData.user.token
  return $.ajax({
    url: config.apiOrigin + '/songs/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const getSongs = function () {
  const order = $('.order-by').val()
  const token = store.userData.user.token
  const data =
    {
      order: order
    }
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const searchItunes = function (search) {
  return $.ajax({
    url: 'https://itunes.apple.com/search?term=' + search + '&entity=song&limit=10',
    method: 'GET'
  })
}

module.exports = {
  createSong,
  deleteSong,
  editSong,
  getSongs,
  searchItunes
}
