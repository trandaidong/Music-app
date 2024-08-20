import { Request, Response } from "express"
import Topic from "../../models/topic.model"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import { systemConfig } from "../../config/system"

// [GET] /api/version_1.0/admin/songs/index
export const index = async (req: Request, res: Response): Promise<void> => {
    const songs = await Song.find({
        deleted: false
    })

    res.render('admin/pages/songs/index.pug', {
        pageTitle: "Quản lý bài hát",
        songs: songs
    })
}
// [GET] /api/version_1.0/admin/songs/create
export const create = async (req: Request, res: Response): Promise<void> => {
    const topics = await Topic.find({
        deleted: false,
        status: "active"
    }).select("title");

    const signers = await Singer.find({
        deleted: false,
        status: "active"
    }).select("fullName");


    res.render('admin/pages/songs/create.pug', {
        pageTitle: "Tạo mới bài hát",
        topics: topics,
        singers: signers
    })
}
// [POST] /api/version_1.0/admin/songs/create
export const createPost = async (req: Request, res: Response): Promise<void> => {
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio: audio
    }
    // tạo ra object như này để lưu dữ liệu trách việc người đùng 
    // f12 lên để cập nhận lại các name: value
    const song = new Song(dataSong);
    await song.save();
    //res.redirect(`back`);
    res.redirect(`${systemConfig.prefixAdmin}/songs`)
}

// [GET] /api/version_1.0/admin/songs/update
export const update = async (req: Request, res: Response): Promise<void> => {
    const song = await Song.findOne({
        _id: req.params.id,
        deleted: false
    })
    const topics = await Topic.find({
        deleted: false,
        status: "active"
    }).select("title");

    const singers = await Singer.find({
        deleted: false,
        status: "active"
    }).select("fullName");


    res.render('admin/pages/songs/update.pug', {
        pageTitle: "Cập nhật bài hát",
        song: song,
        topics: topics,
        singers: singers
    })
}
// [POST] /api/version_1.0/admin/songs/update
export const updatePost = async (req: Request, res: Response): Promise<void> => {
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics
    }
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0];
    }
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio[0];
    }

    await Song.updateOne({
        _id: req.params.id
    }, dataSong);
    res.redirect(`back`);
}