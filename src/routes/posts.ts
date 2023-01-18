import { Votes } from "./../entity/Votes";
import { Router } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Comment } from "../entity/Comment";
import { Tag } from "../entity/Tag";
import { In } from "typeorm";

const router = Router();

router.get("/", async (req, res) => {
  const posts = await Post.find({
    relations: { user: true, comments: { user: true } },
  });
  res.json({ data: posts });
});

router.post("/", async (req, res) => {
  try {
    const { title, body, userId, tagIds } = req.body;

    const userX = await User.findOneBy({ id: +userId }); //
    const tags = await Tag.find({ where: { id: In(tagIds || []) } });
  
    if (!userX) return res.status(404).json({ message: "User not found" });

    const post = Post.create({
      title: title,
      body: body,
      user: userX,
      tags: tags,
    });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// router.post("/create", async (req, res) => {
//   try {
//     const posts = Post.create({
//       title: req.body.title,
//       body: req.body.body,
//     });
//     await posts.save();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const post = await Post.findOne({
      where: { id: id },
      relations: { user: true },
    });
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const post = await Post.delete(id);
    console.log(post);
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/:id/comment", async (req, res) => {
  try {
    const postId = +req.params.id;
    const { body, userId } = req.body;

    const user = await User.findOne({ where: { id: userId },});
    if (!user) return res.status(404).json({ message: "User not found" });

    const post = await Post.findOne({where: { id: postId },});
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = Comment.create({
      body,
      user: user,
      post: post,
    });
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/:id/vote", async (req, res) => {
  try {
    const postId = +req.params.id;
    const { value, userId } = req.body;

    const userX = await User.findOne({
      where: { id: userId },
    });
    if (!userX) return res.status(404).json({ message: "User not found" });

    const postX = await Post.findOne({
      where: { id: postId },
    });
    if (!postX) return res.status(404).json({ message: "Post not found" });

    const vote = Votes.create({
      value,
      user: userX,
      post: postX,
    });
    await vote.save();
    res.json(vote);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
