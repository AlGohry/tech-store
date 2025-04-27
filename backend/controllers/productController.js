import Product from '../models/Product.js'

// @desc Create a new product
export const createProduct = async (req, res) => {
  const { name, image, description, brand, category, price, countInStock } = req.body

  const product = new Product({
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
}

// @desc Get all products
export const getProducts = async (req, res) => {
  const products = await Product.find({})
  res.json(products)
}

// @desc Get single product by ID
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Public
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: '❌ Product not found' });
    }

    const forbiddenFields = ['_id', 'createdAt', 'updatedAt', '__v'];

    Object.keys(updates).forEach((key) => {
      if (!forbiddenFields.includes(key)) {
        product[key] = updates[key];
      }
    });

    const updatedProduct = await product.save();

    res.json({
      message: '✅ Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    res.status(500).json({ message: `🚨 ${error.message}` });
  }
}


// @desc Delete a product
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.deleteOne()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}
