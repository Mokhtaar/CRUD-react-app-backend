import { Tag } from './Tag';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Post } from "./Post"
import { Comment } from "./Comment"
import { Votes } from "./Votes"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column({ nullable: true })
    age: number

    @Column({ nullable: true })
    password: string 

    @OneToMany(() => Post, (postX) => postX.user)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Votes, (vote) => vote.user)
    votes: Votes [];

    // @OneToMany(() => Tag, (tag) => tag.user)
    // tags: Tag [];

}
