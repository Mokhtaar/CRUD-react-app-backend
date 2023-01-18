import { User } from './../entity/User';
import { Router } from "express";
import { Tag } from "../entity/Tag";

const router = Router();

router.get("/", async (req, res) => {
  const tags = await Tag.find({});
  res.json({ data: tags });
});

router.post("/create", async (req, res) => {
    try {
      const { tagName } = req.body;
      const tag = Tag.create({
        tagName,
      });
      await tag.save();
      res.json(tag);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    try {
      const id = +req.params.id;
      const tag = await Tag.delete(id);
      res.json({ tag });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

export default router;
