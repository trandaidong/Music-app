"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listener = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favoriteSong_model_1 = __importDefault(require("../../models/favoriteSong.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slugTopic;
    const topic = yield topic_model_1.default.findOne({
        deleted: false,
        status: "active",
        slug: slug
    });
    let songs = [];
    if (topic) {
        songs = yield song_model_1.default.find({
            deleted: false,
            status: "active",
            topicId: topic.id
        }).select("title avatar singerId like slug");
    }
    for (const song of songs) {
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId
        });
        song["singer"] = singer;
    }
    res.render("client/pages/songs/list.pug", {
        pageTitle: topic.title,
        songs: songs
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        deleted: false,
        status: "active",
        slug: slug
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        deleted: false,
        status: "active",
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    }).select("title");
    const favoriteSong = yield favoriteSong_model_1.default.findOne({
        songId: song.id
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail.pug", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: id,
        status: 'active',
        deleted: false
    });
    const newLike = (typeLike == "like" ? song.like + 1 : song.like - 1);
    if (song) {
        yield song_model_1.default.updateOne({
            _id: song.id
        }, {
            like: newLike
        });
    }
    res.json({
        code: 200,
        message: "Success!",
        like: newLike
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const existFavoriteSong = yield favoriteSong_model_1.default.findOne({
                songId: id,
            });
            if (!existFavoriteSong) {
                const record = new favoriteSong_model_1.default({
                    userId: "",
                    songId: id
                });
                yield record.save();
            }
            break;
        case "unfavorite":
            yield favoriteSong_model_1.default.deleteOne({
                songId: id
            });
            break;
        default:
            res.json({
                code: 400,
                message: "Failed!",
            });
            break;
    }
    res.json({
        code: 200,
        message: "Success!",
    });
});
exports.favorite = favorite;
const listener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: id,
        deleted: false,
        status: "active"
    });
    yield song_model_1.default.updateOne({
        _id: id
    }, {
        listener: song.listener + 1
    });
    const newSong = yield song_model_1.default.findOne({
        _id: id,
        deleted: false,
        status: "active"
    });
    res.json({
        code: 200,
        message: "Success!",
        listener: newSong.listener
    });
});
exports.listener = listener;
