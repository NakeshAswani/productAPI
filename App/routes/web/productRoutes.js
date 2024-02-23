let express = require("express")
const { addProduct, viewProduct, deleteProduct } = require("../../controller/web/productController")
const multer = require("multer")
let path = require("path")
let productRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/product')
    },
    filename: function (req, file, cb) {
        const fileName = 'product_image_' + Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage }).single('pImage')

productRoutes.post("/add-product/:id?", upload, addProduct)
productRoutes.get("/view-product", viewProduct)
productRoutes.get("/delete-product/:id?", deleteProduct)

module.exports = productRoutes