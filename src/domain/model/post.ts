import { User } from "./user"

export type Post = {
    id: string
    title?: string
    image: string
    image_url: string
    caption: string,
    user: User,
    my_likes: any,
    likes: PostLike[]
}

type PostLike = {
    count: number
}
