import mongoose from "mongoose";



export async function connect(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
       
        const connection = mongoose.connection;
        connection.on("connected", () => console.log("Connected to MongoDB successfully"))
        connection.on("error", (error) => console.log("MongoDB Error: ", error)
    )
    } catch (error) {
        console.log("Something went wrong")
        console.log(error)
    }
}