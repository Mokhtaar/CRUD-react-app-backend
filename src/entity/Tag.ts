import { User } from './User';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Post } from "./Post"
import { Comment } from "./Comment"
import { Votes } from "./Votes"

@Entity()
export class Tag extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tagName: string

    @ManyToMany(() => Post)
    posts: Post[]

    // @ManyToOne(() => Post, (post) => post.tags,{ nullable: false })
    // post: Post;

    // @ManyToOne(() => User, (user) => user.tags,{ nullable: false })
    // user: User;

}