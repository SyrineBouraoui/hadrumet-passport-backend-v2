const express = require('express');
const router = express.Router();
const { getAllRealizedEps, getRealizedEpById, createRealizedEp, updateRealizedEp, deleteRealizedEp } = require('../controllers/realizedEpsController');

router.get('/', getAllRealizedEps);
router.get('/:id', getRealizedEpById);
router.post('/', createRealizedEp);
router.put('/:id', updateRealizedEp);
router.delete('/:id', deleteRealizedEp);

module.exports = router;