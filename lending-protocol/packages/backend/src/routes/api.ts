import express from 'express';
import { lend, borrow, getUserPosition } from '../services/protocolService';

const router = express.Router();

// Route for lending assets
router.post('/lend', async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const result = await lend(userId, amount);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for borrowing assets
router.post('/borrow', async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const result = await borrow(userId, amount);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for getting user leverage position
router.get('/position/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const position = await getUserPosition(userId);
        res.status(200).json(position);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;