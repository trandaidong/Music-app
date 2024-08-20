import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema({
    userId: String,
    songId: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const FavoriteSong = mongoose.model("FavoriteSong", favoriteSongSchema, 'favorite-songs');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

export default FavoriteSong;