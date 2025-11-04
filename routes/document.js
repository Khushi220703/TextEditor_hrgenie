const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const {authenticateJWT} = require("../middleware/authMiddleware");

router.post('/', documentController.createDocument);
router.get('/', documentController.getDocuments);
router.put('/:id', documentController.updateDocument);  // Update route
router.delete('/:id',authenticateJWT, documentController.deleteDocument); // Delete route
router.post('/share/:id', authenticateJWT, documentController.shareDocument);
router.get('/shared/:token',authenticateJWT, documentController.getDocumentByShareToken);

module.exports = router;
