const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res
        .status(404)
        .json({
          message:
            "no Tag found with this id found, check to see if you typed the right one",
        });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const tagData = await Tag.update(
    {
      tag_id: req.body.id,
      tag_name: req.body.tag_name,
    },
    {
      where: {
        tag_id: req.params.id,
      },
    }
  );
  return res.json(tagData);
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      tag_id: req.params.id
    },
  })
    .then((updatedTags) => res.json(updatedTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
