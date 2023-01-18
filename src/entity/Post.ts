import { Tag } from "./Tag";
import { Votes } from "./Votes";
//import { Post } from './Post';
import { Comment } from "./Comment";
import { User } from "./User";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", onUpdate: "current_timestamp" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Votes, (vote) => vote.post)
  votes: Votes[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  //   @OneToMany(() => Tag, (tag) => tag.post)
  //   tags: Tag[];
}
