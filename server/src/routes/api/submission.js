import express from 'express';
import multer from 'multer';
import SubmissionController from '../../controllers/SubmissionController.js';
import verifyJWT from '../../middleware/verifyJWT.js';
// import verifyAdmin from '../../middleware/verifyAdmin.js';


const router = express.Router();
const upload = multer({
    dest: './public/uploads/submissions'
});

router.post('/new/one', [verifyJWT], (req, res) => SubmissionController.stepOne(req, res));
router.post('/new/two', [verifyJWT], (req, res) => SubmissionController.stepTwo(req, res));
router.post('/new/three', [verifyJWT], (req, res) => SubmissionController.stepThree(req, res));
router.post('/new/image', [verifyJWT, upload.single("file")], (req, res) => SubmissionController.setImage(req, res));


export default router;