import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    description: String,
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
const Topic = mongoose.model("Topic", topicSchema, 'topics');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

export default Topic;