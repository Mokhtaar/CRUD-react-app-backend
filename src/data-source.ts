import { Post } from './entity/Post';
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Comment } from './entity/Comment';
import { Votes } from './entity/Votes';
import { config } from "dotenv";
import { Tag } from './entity/Tag';

config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Post, Comment, Votes, Tag],
    migrations: [],
    subscribers: [],
})
