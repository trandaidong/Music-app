import mongoose from "mongoose";

const singerSchema = new mongoose.Schema({
    fullName: String,
    avatar: String,
    status: String,
    slug: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const Singer = mongoose.model("Singer", singerSchema, 'singers');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

export default Singer;