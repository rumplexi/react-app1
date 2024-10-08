// listing posts and rendering

import Post from '../components/post'
import { notesCollection } from '../configure-fb'; 
import { getDocs } from 'firebase/firestore';

export default async function Page(){

    // move this code to utils.js and use React cache module  
    const querySnapshot = await getDocs(notesCollection)
    let frontMatter = []
    querySnapshot.forEach((doc) => {
        frontMatter.push(doc.data().front)
    })
    
    return (
        <Post frontMatter={frontMatter}/>
    )
}