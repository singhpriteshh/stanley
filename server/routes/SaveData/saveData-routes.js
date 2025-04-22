const express = require('express');
const router = express.Router();
const { saveVisitData } = require('../../controller/SaveData/data-controller');

// Route to handle saving visit data
router.post('/save-visit', saveVisitData);

module.exports = router;
