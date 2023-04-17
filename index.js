const express=require("express")
const { connection } = require("./db")
const {userRoute}=require("./route/user.route")
const {blacklist}=require("./blacklist")
const {blogRouter}=require("./route/blog.route")

require("dotenv").config()

const app=express()
app.use(express.json())
app.use("/user",userRoute)
app.use("/blog",blogRouter)

app.listen(process.env.port,async()=>{
try {
    await connection
    console.log("connected to DB")
} catch (error) {
    console.log("error in connection to DB")
}
console.log("server is running")
})