'use client'

import React from 'react'
import styles from './PostSection.module.css'
import Posts from '../posts/Posts'

export default function PostSection() {

    //const [cardNumber, setNumber] = React.useState(textItem);
    const posts = Posts.map((item) => {
        return (
            <div className={styles.post}>
                <h4>{item.title}</h4>
                <br></br>
                <p>{item.text}</p>
                <br></br>
            </div>
        );
    })
    
    return (
        <div className={styles.postSection}>
            {posts}
        </div>
    )
}