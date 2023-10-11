import express from 'express';
import {validate} from "../middlewares/validate";
import {loginUserSchema} from "../dto/auth.dto";
import {loginHandler} from "../controllers/auth.controller";

const router = express.Router();
router.post('/login', validate(loginUserSchema), loginHandler);

export default router;