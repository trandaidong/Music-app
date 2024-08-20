import { Request, Response } from "express"
import Topic from "../../models/topic.model"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favoriteSong.model";
import { convertToSlug } from "../../Helpers/converToSlug";

// [GET] /api/version_1.0/:type
export const result = async (req: Request, res: Response): Promise<void> => {
    const type: string = req.params.type;
    const keyword: string = req.query.keyword.toString();

    let newSongs = [];

    if (keyword) {
        const keywordRegex: RegExp = new RegExp(keyword, 'i');
        const stringSlug: string = convertToSlug(keyword)
        const stringSlugRegex: RegExp = new RegExp(stringSlug, 'i');

        const songs = await Song.find({
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegex, }
            ],
            deleted: false
        })
        for (const song of songs) {
            const infoSinger = await Singer.findOne({
                _id: song.singerId,
                deleted: false
            }).select("fullName");

            // API không có gáp key value như vậy nên ta cần push 1 object vô
            newSongs.push({
                title: song.title,
                avatar: song.avatar,
                slug: song.slug,
                fullName: infoSinger.fullName
            })
        }
    }
    switch (type) {
        case "result":
            res.render("client/pages/searchs/index.pug", {
                pageTitle: `Kết quả: ${keyword}`,
                keyword: keyword,
                songs: newSongs
            });
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "Success!",
                songs: newSongs
            });
            break;
    }
}
