//import { Post } from './Post';
import { Comment } from "./Comment";
import { User } from "./User";
import { Post } from "./Post";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  Unique,
  Check
} from "typeorm";

/*
})
	userId: number;
	@ManyToOne(() => User, user => user.votes, { nullable: false })
	@JoinColumn({ name: 'userId' })
	user: User;

	@PrimaryColumn({
		nullable: false,
	})
	postId: number;
	@ManyToOne(() => Post, post => post.votes, { nullable: false })
	@JoinColumn({ name: 'postId' })
	post: Post;

*/

@Entity()
@Unique(["user","post"])
@Check(`"value" = 1 or "value" = -1`)
export class Votes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @ManyToOne(() => User, (user) => user.votes, { nullable: false })
  user: User;

  @ManyToOne(() => Post, (post) => post.votes, { nullable: false})
  post: Post;
}
