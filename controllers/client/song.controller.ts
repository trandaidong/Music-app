import { Request, Response } from "express"
import Topic from "../../models/topic.model"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favoriteSong.model";

// [GET] /api/version_1.0/songs/list
export const list = async (req: Request, res: Response): Promise<void> => {
    const slug: string = req.params.slugTopic;

    const topic = await Topic.findOne({
        deleted: false,
        status: "active",
        slug: slug
    })
    let songs = [];

    if (topic) {
        songs = await Song.find({
            deleted: false,
            status: "active",
            topicId: topic.id
        }).select("title avatar singerId like slug")
    }
    for (const song of songs) {
        const singer = await Singer.findOne({
            _id: song.singerId
        })
        song["singer"] = singer;
    }

    res.render("client/pages/songs/list.pug", {
        pageTitle: topic.title,
        songs: songs
    });
}
// [GET] /api/version_1.0/songs/detail
export const detail = async (req: Request, res: Response): Promise<void> => {
    const slug: string = req.params.slugSong;

    const song = await Song.findOne({
        deleted: false,
        status: "active",
        slug: slug
    })

    const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
        status: "active",
    }).select("fullName");

    const topic = await Topic.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    }).select("title")

    const favoriteSong = await FavoriteSong.findOne({
        songId: song.id
    })
    song["isFavoriteSong"] = favoriteSong ? true : false;

    res.render("client/pages/songs/detail.pug", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic
    });
}

// [PATCH] /api/version_1.0/songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.idSong;
    const typeLike: string = req.params.typeLike;

    const song = await Song.findOne({
        _id: id,
        status: 'active',
        deleted: false
    })
    const newLike = (typeLike == "like" ? song.like + 1 : song.like - 1);
    if (song) {
        await Song.updateOne({
            _id: song.id
        }, {
            like: newLike
        })
    }

    res.json({
        code: 200,
        message: "Success!",
        like: newLike
    })
}
// [PATCH] /api/version_1.0/songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.idSong;
    const typeFavorite: string = req.params.typeFavorite;

    switch (typeFavorite) {
        case "favorite":
            const existFavoriteSong = await FavoriteSong.findOne({
                songId: id,
            })
            if (!existFavoriteSong) {
                const record = new FavoriteSong({
                    userId: "",
                    songId: id
                })
                await record.save();
            }
            break;
        case "unfavorite":
            await FavoriteSong.deleteOne({
                songId: id
            })
            break;
        default:
            res.json({
                code: 400,
                message: "Failed!",
            })
            break;
    }

    res.json({
        code: 200,
        message: "Success!",
    })
}
// [PATCH] /api/version_1.0/songs/listener/:idSong
export const listener = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.idSong;

    const song = await Song.findOne({
        _id: id,
        deleted: false,
        status: "active"
    })

    await Song.updateOne({
        _id: id
    }, {
        listener: song.listener + 1
    })

    const newSong=await Song.findOne({
        _id: id,
        deleted: false,
        status: "active"
    })

    res.json({
        code: 200,
        message: "Success!",
        listener: newSong.listener
    })
}