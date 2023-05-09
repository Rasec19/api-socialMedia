import mongoose from "mongoose";

export const dbConnection = async() => {
    

    try {
        
        await mongoose.connect( "mongodb+srv://raseccamacho:Ia4kjfEe2lcWj3DM@miclustercafe.kldoi52.mongodb.net/Nextia");

        console.log("Base de datos online")

    } catch (error) {
        console.log(`Error: ${error}`)
        throw new Error(`Error al inicialziar la base de datos`);
    }
}