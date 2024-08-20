import { Router } from "express"
import * as controller from "../../controllers/admin/song.controller"
import multer from "multer"
import * as uploadClound from "../../middlewares/admin/uploadClound.middleware";

const upload = multer();

const router: Router = Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",
    upload.fields([
        { name: "avatar", maxCount: 1},
        { name: "audio", maxCount: 1}
    ]),
    uploadClound.uploadFields,
    controller.createPost
);
router.get("/update/:id", controller.update);

router.patch("/update/:id",
    upload.fields([
        { name: "avatar", maxCount: 1},
        { name: "audio", maxCount: 1}
    ]),
    uploadClound.uploadFields,
    controller.updatePost
);
export const songRouter: Router = router;