import mongoose from "mongoose";
import slug from "mongoose-slug-updater"

mongoose.plugin(slug);

const songSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    description: String,
    singerId:String,
    topicId:String,
    like: {
        type: Number,
        default: 0
    },
    listener: {
        type: Number,
        default: 0
    },
    lyrics: String,
    audio: String,
    status: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const Song = mongoose.model("Song", songSchema, 'songs');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

export default Song;