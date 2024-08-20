import { Router } from "express"
import * as controller from "../../controllers/client/topic.controller"

const router: Router = Router();

router.get("/",controller.index);

export const topicRouter: Router = router;