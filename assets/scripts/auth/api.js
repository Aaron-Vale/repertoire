'use strict'

const config = require('../config')
const store = require('../store')

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up/',
    method: 'POST',
    data
  })
}

const login = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/sign-in/',
    method: 'POST',
    data
  })
}
const logout = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + data.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + data.user.token
    }
  })
}

const changePass = function (data) {
  const id = store.userData.user.id
  const token = store.userData.user.token
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const createSong = function (data) {
  console.log(data)
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

const getSongs = function () {
  const token = store.userData.user.token
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    }
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
  console.log(data)
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

module.exports = {
  signUp,
  login,
  logout,
  changePass,
  createSong,
  getSongs,
  deleteSong,
  editSong
}
