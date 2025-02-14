//const { products, categories } = require("../old_database");
const { Product, Category, Subcategory, Sequelize, ProductImage } = require("../database/models");
const { Op } = Sequelize;

module.exports = {
  detail: (req, res) => {
    let productId = Number(req.params.id);

    const productimg = ProductImage.findOne({
      where: { product_id: productId}});

    const PRODUCT_PROMISE = Product.findByPk(productId, {
      include: [{ association: "images" }],
    });

    const ALL_PRODUCTS_PROMISE = Product.findAll({
      where: {
        discount: {
          [Op.gte]: 10,
        },
      },
      include: [{ association: "images" }],
    });

    Promise.all([PRODUCT_PROMISE, ALL_PRODUCTS_PROMISE,productimg])
      .then(([product, sliderProducts,productoimage]) => {
        console.log(productoimage.image)
        res.render("productDetail", {
          sliderTitle: "Productos en oferta",
          sliderProducts,
          product,
          productoimage,
          session: req.session,
          
        });
      })
      .catch((error) => console.log(error));
  },
  category: (req, res) => {
    const categoryId = req.params.id;

    Category.findByPk(categoryId, {
      include: [
        {
          association: "subcategories",
          include: {
            association: "products",
            include: { association: "images" },
          },
        },
      ],
    })
      .then((category) => {
        const PRODUCTS = category.subcategories.map(
          (subcategory) => subcategory.products
        );
        return res.render("categories", {
          category,
          subcategories: category.subcategories,
          products: PRODUCTS.flat(),
          session: req.session,
        });
      })
      .catch((error) => console.log(error));
  },
  subcategory: async (req,res) => {
    Subcategory.findByPk(req.params.id, {
      include: [
        {
          association: "products",
          include: [
            {
              association: "images",
            },
          ],
        },
      ],
    })
      .then((subcategory) => {
        Category.findByPk(subcategory.category_id, {
          include: [{ association: "subcategories" }],
        }).then((category) =>
          res.render("subcategory", {
            category,
            products: subcategory.products,
            session: req.session,
            user: req.session.user?.id || null, 
          })
        );
      })
      .catch((err) => console.log(err));
  },

  search: (req, res) => {
    Product.findAll({
      where: {
        name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
      include: [{ association: "images" }],
    }).then((result) =>
      res.render("searchResult", {
        result,
        session: req.session,
        search: req.query.search,
      })
    );
  },
  

  


  

};
