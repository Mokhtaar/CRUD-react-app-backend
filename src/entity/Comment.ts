import { Post } from "./Post";
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
} from "typeorm";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", onUpdate: "current_timestamp" })
  updatedAt: Date;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false, onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  user: User;   
}
