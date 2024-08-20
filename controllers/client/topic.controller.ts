import { Request, Response } from "express"
import Topic from "../../models/topic.model"

// [GET] /api/version_1.0/topics
export const index = async (req: Request, res: Response): Promise<void> => {
    const topics = await Topic.find({
        deleted: false
    })
    res.render("client/pages/topics/index.pug", {
        pageTitle: "Chu de bai hat",
        topics: topics
    });
}