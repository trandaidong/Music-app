import { Router } from "express"
import * as controller from "../../controllers/client/song.controller"

const router: Router = Router();

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

router.patch("/like/:typeLike/:idSong", controller.like);

router.patch("/favorite/:typeFavorite/:idSong", controller.favorite);

router.patch("/listener/:idSong", controller.listener);

export const songRouter: Router = router;