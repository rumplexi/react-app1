import { redirect } from 'next/navigation'
import { getPosts} from './utils'

export default function postPage(props) {
    const post = getPosts();

    return (
        redirect('/p_posts?pageNumber=1')
    )

}