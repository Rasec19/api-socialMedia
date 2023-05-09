import mongoose from "mongoose";

export const dbConnection = async() => {
    

    try {
        
        await mongoose.connect( process.env.MONGODB_CNN!);

        console.log("Base de datos online")

    } catch (error) {
        console.log(`Error: ${error}`)
        throw new Error(`Error al inicialziar la base de datos`);
    }
}