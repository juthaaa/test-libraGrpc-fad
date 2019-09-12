const express = require('express');
const router = express.Router();

const controller = require('../controllers/ExprolerLibra')
/*for connect local node*/
// const controller = require('../controllers/Exproler')

router.get(`/accountState/:address`,controller.getAccountState);
router.get(`/transactions`,controller.getTransaction);
router.get(`/event/:address`,controller.getEvent);
router.get(`/addresstran/:address`,controller.getTransactionbyAddress)
router.get(`/addressversion/:version`,controller.getTransactionbyVersion)
router.get(`/getbalance/:address`,controller.getBalance)
router.use(`/`, (req, res) => res.send('Hello!'));




module.exports = router;