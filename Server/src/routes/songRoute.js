import { addSong , listSong } from "../controller/songController.js";
import express from 'express'
import upload from "../middleware/multer.js";

const songRouter = express.Router();

// upload which i amde in album
songRouter.post('/add',upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),addSong);
songRouter.get('/list',listSong);

export default songRouter;