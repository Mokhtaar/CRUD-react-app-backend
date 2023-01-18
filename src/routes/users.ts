import { Router } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find({ relations: { posts: true } });
  res.json({ data: users });
});

router.get("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const user = await User.findOne({ where: { id } }); //select * from User where id = id
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// router.post("/create", (req, res) => {
//   const posts = {
//     id: req.body.id,
//     title: req.body.title,
//   };
//   res.json(posts);
// });

router.post(
  "/signup",
  [
    check("email", "Invalid email :(").isEmail(),
    check("password", "Invalid pw").isLength({ min: 8 }),
  ],
  async (req: any, res: any) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      //validate the inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json(errors);
      }

      //validate if the user doesn't already exist
      const userExists = await User.findOne({ where: { email: email } });
      if (userExists)
        return res.status(404).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await user.save();
      const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
        expiresIn: 36000,
      });
      res.json({ token: token });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword)
      return res.status(404).json({ message: "wrong password" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: 36000,
    });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const user = await User.delete(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
