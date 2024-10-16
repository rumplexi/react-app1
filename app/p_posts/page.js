// listing posts and rendering

import Post from '../components/post'
import { querySnapshot } from '../configure-fb'

export default async function Page(){

    // ad firebase document id
    const noteObjects = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        }
    })

    // send database snapshot as prop to client component
    return (
        <Post notes={noteObjects}/>
    )
}