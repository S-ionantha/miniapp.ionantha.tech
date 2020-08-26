const express = require('express')
const {getAuthorizeURL} = require('../utils/auth')
const router = express.Router()



router.get('/', (req, res) => {
	const { backurl } = req.query
	const jumpUrl = getAuthorizeURL(backurl)
	res.redirect(jumpUrl)
})

module.exports = router
