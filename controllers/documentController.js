// controllers/documentController.js
const Document = require('../models/document');
const crypto = require('crypto'); // for generating token

exports.createDocument = async (req, res) => {
  try {
    const newDoc = new Document(req.body);
    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({});
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Update document by ID
exports.updateDocument = async (req, res) => {
  try {
    const documentId = req.params.id;
    // Find document first
    const doc = await Document.findById(documentId);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    console.log(doc);
    
    // Check if req.user.id matches owner or role allows update
    if (doc.owner.toString() !== req.user.id && req.user.role !== 'owner' && req.user.role !== 'editor') {
      return res.status(403).json({ message: 'You do not have permission to update this document' });
    }

    // If authorized, proceed update
    const updatedDoc = await Document.findByIdAndUpdate(
      documentId,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete document by ID
exports.deleteDocument = async (req, res) => {
  try {
    const deletedDoc = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDoc) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.shareDocument = async (req, res) => {
 
  try {
    const docId = req.params.id;
    // Find doc to ensure it exists
   
    const doc = await Document.findById(docId);
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    // Generate a share token (e.g. random hex string)
    const shareToken = crypto.randomBytes(16).toString('hex');

    // Store shareToken in document or a new Share model (simplest inline here)
    doc.shareToken = shareToken;
    await doc.save();

    // Compose full URL for sharing
    const shareUrl = `${process.env.APP_BASE_URL}/shared/${docId}`;
    res.json({ shareUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/documentController.js

exports.getDocumentByShareToken = async (req, res) => {
  try {
    
    
    const shareToken = req.params.token;
    console.log(req.params.token);
    
    const doc = await Document.findOne({_id: shareToken });
    
    
    if (!doc) return res.status(404).json({ message: 'Document not found or expired' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
