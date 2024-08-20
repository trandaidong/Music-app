import { Router } from "express"
import * as controller from "../../controllers/admin/upload.controller"
import multer from "multer"
import * as uploadClound from "../../middlewares/admin/uploadClound.middleware";

const upload = multer();

const router: Router = Router();

router.post("/",
    upload.single("file"),
    uploadClound.uploadSingle,
    controller.index
);

export const uploadRouter: Router = router;