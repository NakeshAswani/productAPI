const { ObjectId } = require("mongodb")
const fs = require('fs').promises
let productModel = require("../../model/productModel")

exports.addProduct = async (request, response) => {
    let pName= request.body.pName
    let pCategory= request.body.pCategory
    let pPrice= request.body.pPrice
    let pDescription= request.body.pDescription
    let pImage
    let status= request.body.status
    let URLId=request.params.id ?? ""
    if(request.file===undefined){
        if(URLId!==undefined || URLId!==""){
            try{
                let productData=await productModel.findOne({_id: new ObjectId(URLId)})
                pImage=productData.pImage
            }
            catch(e){
                
            }
        }
        else{
            pImage=""
        }
    }
    else{
        pImage = request.file.filename
    }
    let finalObj = {
        pName,
        pCategory,
        pPrice,
        pDescription,
        pImage,
        status,
    }
    if(URLId===""){
        let finalRes = await productModel(finalObj)
        try {
            let insertData = await finalRes.save()
            response.send({
                status: 1,
                message: "! data inserted !",
                data: insertData
            })
        }
        catch (error) {
            response.send({
                status: 0,
                message: "! fill all fields !",
                data: error
            })
        }
    }
    else{
        try {
            await productModel.findOneAndUpdate({ _id: new ObjectId(URLId) }, { $set: finalObj })
            response.send({
                status: 1,
                message: "! data updated !"
            })
        }
        catch (error) {
            response.send({
                status: 0,
                message: "! id not found !",
                data: error
            })
        }
    }
}

exports.viewProduct = async (request, response) => {
    try{
        let allData = await productModel.find()
        let productImageLink="http://localhost:8000/uploads/product"
        response.send({
            status: 1,
            message: "! data found !",
            productImageLink,
            data: allData
        })
    }
    catch (error) {
        response.send({
            status: 0,
            message: "! data not found !",
            data: error
        })
    }
}

exports.deleteProduct = async (request, response) => {
    let deleteId=request.params.id
    try{
        let productData = await productModel.findOneAndDelete({ _id: new ObjectId(deleteId) });
        if (productData.pImage) {
            let imagePath = `uploads/product/${productData.pImage}`
            await fs.unlink(imagePath);
        }
        response.send({
            status: 1,
            message: "! data deleted !"
        })
    }
    catch (error) {
        response.send({
            status: 0,
            message: "! id not found !",
            data: error
        })
    }
}