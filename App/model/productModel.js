const { default: mongoose, model } = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    pName:{
        type:String,
        required:true
    },
    pCategory:{
        type:String,
        required:true
    },
    pPrice:{
        type:String,
        required:true
    },
    pDescription:{
        type:String,
        required:true
    },
    pImage:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true
    },
})

let productModel=model("productTable",productSchema)

module.exports=productModel