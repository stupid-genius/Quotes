const express = require('express');
const path = require('path');
const config = require('./config');
const Logger = require('./logger');

/* eslint-disable-next-line no-undef */
const logger = new Logger(path.basename(__filename));
const router = express.Router();

router.get('/', (req, res) => {
	logger.info('Hello, Winston!');
	res.render('index', {
		text: 'We can at least start from a sane place.',
		title: config.appDescription
	});
});

module.exports = router;

