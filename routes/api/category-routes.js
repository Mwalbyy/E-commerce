const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    })
    if(!categoryData) {
      res.status(404).json({ message: 'no Category found with this id found, check to see if you typed the right one'})
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});


router.post('/',async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  const categoryData = await Category.update(
    {
      category_id: req.body.id,
      category_name: req.category_name
    },
    {
      where: {
        category_id: req.params.id
      }
    }
  )
  return res.json(categoryData)
});

router.delete('/:id',async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        category_id: req.params.id
      }
    })
    if(!categoryData) {
      res.status(404).json({ message: 'no Category found with this id found, check to see if you typed the right one'});
      return;
    }
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(200).json(err)
  }
});

module.exports = router;
