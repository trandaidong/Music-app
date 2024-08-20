import { Request, Response } from "express"
import Topic from "../../models/topic.model"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favoriteSong.model";

// [GET] /api/version_1.0/favorite-song/index
export const index = async (req: Request, res: Response): Promise<void> => {
    const favoriteSongs = await FavoriteSong.find({
        // userId:""
        deleted: false
    });
    for (const item of favoriteSongs) {
        const song = await Song.findOne({
            deleted: false,
            _id: item.songId,
            status: "active"
        }).select("title avatar singerId slug");

        item["infoSong"] = song;

        const singer = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        }).select("fullName")

        item["infoSinger"] = singer;
    }
    res.render("client/pages/favorite-songs/index.pug", {
        pageTitle: "Favorite",
        favoriteSong: favoriteSongs
    });
}