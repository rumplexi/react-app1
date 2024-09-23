//'use client'
import React from "react";
import Posts from './posts/Posts'
import {Noto_Serif_KR} from 'next/font/google'
import Link from 'next/link'
//import {useRouter} from 'next/navigation'

const noto_serif = Noto_Serif_KR({
    subsets: ['latin'],
    weight: ['400', '600'],
    variable: '--font-notokr',
})

export default function postPage(props) {

    //const [cardNumber, setNumber] = React.useState(textItem);
    //const router = useRouter()

    //console.log(props.searchParams.a) 
    const posts = Posts.map((item) => {
        return (
            <div>
                <Link href="/p_cards">{item.title}</Link>
                <br></br>
                <p className={noto_serif.className}>{item.text}</p>
                <br></br>
            </div>
        );
    })
    
    return (
        <div className="postSection" key="postList">
            {posts}
        </div>
    )
}