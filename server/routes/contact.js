const express = require('express');
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST — Submit form
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const submission = new Submission(req.body);
      await submission.save();
      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET — All submissions (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH — Mark as read (admin only)
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(submission);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE — Delete submission (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;