import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL);
var conn = mongoose.connection;
conn.on("connected", () => {
  console.log("database connected", );
  
});
conn.on("disconnected", () => {
  console.log("database disconnected");
});
conn.on("error", (error) => {
  console.error("Database Conection Failed", error);
  process.exit(1);
});
export default conn;
