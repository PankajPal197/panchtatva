import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        await mongoose.connect(
            "mongodb+srv://panchtatva:uo87NfEJDxL4KsWR@cluster0.64jjtto.mongodb.net/",
            {
                dbName:"Panchtatva_Auth_App",
            }
        );
        console.log("mongodb connected Successfully");
    }
    catch(error){
        console.log(error.message);
    }
}
export default connectDB;