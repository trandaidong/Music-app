import mongoose from "mongoose"

export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect successfully!");
    } catch {
        console.log("Connect Error!");
    }
}
