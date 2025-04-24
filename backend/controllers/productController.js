import Product from '../models/Product.js'

// @desc    Get all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
}

// @desc    Get single product by ID
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}
