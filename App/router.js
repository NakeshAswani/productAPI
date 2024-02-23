let express=require("express")
const productRoutes = require("./routes/web/productRoutes")
let router=express.Router()

router.get("/",(request,response)=>{
    response.send({
        status: 1,
        message: "! server is working fine !"
    })
})
router.use("/product",productRoutes)

module.exports=router