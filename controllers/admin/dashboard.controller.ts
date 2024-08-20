import { Request, Response } from "express"

// [GET] /api/version_1.0/admin/dashboard
export const dashboard = async (req: Request, res: Response): Promise<void> => {
    res.render('admin/pages/dashboard/index.pug',{
        pageTitle: "Dashboard"
    })
}