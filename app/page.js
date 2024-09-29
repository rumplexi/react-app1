import React from 'react'
import { redirect } from 'next/navigation'
import { getPosts} from './utils'

export default function postPage(props) {
    const post = getPosts();
    console.log(post);

    return (
        redirect('/p_posts')
    )

}