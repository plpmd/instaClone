import { User } from "./user"

export type Post = {
    id: string
    image: string
    image_url: string
    caption: string,
    user: User
}
