// import mongoose from "mongoose";
// const connectDB=async()=>{
//     try{
//         await mongoose.connect(
//             "mongodb+srv://panchtatva:uo87NfEJDxL4KsWR@cluster0.64jjtto.mongodb.net/",
//             {
//                 dbName:"Panchtatva_Auth_App",
//             }
//         );
//         console.log("mongodb connected Successfully");
//     }
//     catch(error){
//         console.log(error.message);
//     }
// }
// export default connectDB;
import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        await mongoose.connect(
            "mongodb+srv://panchtatvamart_db_user:qEV72FjPpSLoJa1A@cluster0.b9ujjou.mongodb.net/",
            // "mongodb+srv://panchtatva:uo87NfEJDxL4KsWR@cluster0.64jjtto.mongodb.net/",
            {
                dbName:"Panchtatva",
            }
        );
        console.log("mongodb connected Panchtatva Successfully");
    }
    catch(error){
        console.log(error.message);
    }
}
export default connectDB;