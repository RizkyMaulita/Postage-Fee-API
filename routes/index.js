const route = require('express').Router()
const Controller = require('../controllers')

route.get('/expeditions', Controller.getExpeditions)
route.get('/expeditions/costs', Controller.getCost)
route.get('/expeditions/several', Controller.getSeveralExpeditions)

module.exports = route