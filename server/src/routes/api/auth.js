import express from 'express';
import AuthController from '../../controllers/AuthController.js';
import verifyJWT from '../../middleware/verifyJWT.js';

const router = express.Router()

router.post('/register', (req, res) => AuthController.register(req, res));
router.post('/login', (req, res) => AuthController.login(req, res));
router.post('/token', (req, res) => AuthController.regenToken(req, res));
router.post('/verify', (req, res) => AuthController.verifyAccount(req, res));

router.post('/info', verifyJWT, (req, res) => AuthController.getUserInfo(req, res));
router.delete('/logout', verifyJWT, (req, res) => AuthController.logout(req, res));

router.post('/check', verifyJWT, (req, res) => {
    res.send('OK');
});

export default router;