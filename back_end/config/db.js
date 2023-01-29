const mongoose = require("mongoose")

//connection - conexão: 

const dbUser = ""
const dbPassword = ""

const conn = async () => {
    try {
        
        const dbConn = await mongoose.connect(
          `mongodb+srv://katiaW:<password>@cluster0.oxktkis.mongodb.net/?retryWrites=true&w=majority`
        )
        console.log("Conectou com o banco!")

        return dbConn

    } catch (error) {
        
    }

}