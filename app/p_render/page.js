import React from 'react'

export default function Render(props){
    const postId = props.searchParams.id
    return(
        <>
            <p>This is a rendering markdown page </p>
            <p>query is {postId}</p>
        </>
    )
}