let express=require("express")
const router = require("./App/router")
let cors=require("cors")
const { default: mongoose } = require("mongoose")

let server=express()
server.use(router)
server.use(express.json())
server.use(cors())
server.use("/uploads/product", express.static("uploads/product"))

mongoose.connect('mongodb://127.0.0.1:27017/products')
  .then(() => {
    server.listen("8000")
    console.log('Connected!')
})