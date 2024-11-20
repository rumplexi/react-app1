/* listing posts */
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Pagenation from '../components/pagenation'
import { lora } from '../fonts'
import { CalendarDateRangeIcon } from '@heroicons/react/24/outline'
import styles from './posts.module.css'
import { notesCollection } from '../configure-fb'
import { onSnapshot } from 'firebase/firestore'

export default function Post() {

    const [notesArray, setNotesArray] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotesArray(notesArr)
        })
        return unsubscribe
    }, [])

    function onRender(id) {
        const uri = 'p_view?id=' + id;
        router.push(uri)
    }

    const nPosts = notesArray.length
    const postsPerPage = 3
    const maxPageNumber = Math.ceil(nPosts / postsPerPage)
    const startIndex = (pageNum - 1) * postsPerPage
    const endIndex = Math.min(startIndex + postsPerPage, nPosts)

    const posts = notesArray.slice(startIndex, endIndex).map((note) => {
        return (
            <div key={note.id} className={`${styles.postInfo} ${lora.className}`}>
                <h1 onClick={() => onRender(note.id)}>{note.front.title}</h1>
                <p>{note.front.author}</p>
                <div className={styles.dateDiv}>
                    <CalendarDateRangeIcon className={styles.icon} />
                    <p>{note.front.date}</p>
                </div>
                <p>{note.front.excerpt}</p>
            </div>
        );
    })
    return (
        <>
            <div className={styles.postList}>
                {posts}
            </div>
            <Pagenation pageNum={pageNum} maxPageNumber={maxPageNumber} onUpdatePage={setPageNum} />
        </>
    )
}