import { Request, Response } from "express"
import Topic from "../../models/topic.model"

// [GET] /api/version_1.0/admin/topics/index
export const index = async (req: Request, res: Response): Promise<void> => {
    const topics =await Topic.find({
        deleted: false
    })
   
    res.render('admin/pages/topics/index.pug',{
        pageTitle: "Quản lý chủ đề",
        topics:topics
    })
}