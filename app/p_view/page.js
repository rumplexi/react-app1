/* listing or rendering posts */
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
//import { lora, noto_serif_kr } from '../fonts'
import { PencilSquareIcon, ArrowUturnLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import styles from './view.module.css'
import { md } from '../utils'
import { auth, db } from '../configure-fb'
import { doc, deleteDoc, getDoc } from 'firebase/firestore'

export default function view() {
    const searchParams = useSearchParams();
    const docID = searchParams.get('id')
    const user = auth.currentUser
    const [note, setNote] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchDoc = async () => {
            const docRef = doc(db, 'notes', docID);
            const docSnapshot = await getDoc(docRef)
            setNote(docSnapshot.data()) 
            setLoaded(true);
        } 
        fetchDoc()
    }, [])

    function onList() {
        router.push("../p_list")
    }
    async function onDelete() {
        const docRef = doc(db, "notes", docID)
        await deleteDoc(docRef)
        onList()
    }
    function onEdit() { // check login for write mode access
        const url = '../p_edit?id=' + docID
        router.push(url)
    }

    if(loaded===false) return (<p>loading...</p>)
    return (
        <>  
            <div className={styles.postHeader}>
                <div className={`${styles.postTitle}`}>
                    <h1>{note.front.title}</h1>
                    <div className={styles.postHeaderNav}>
                        { user !== null ? 
                            <>
                                <PencilSquareIcon onClick={onEdit} className={styles.icon} />
                                <TrashIcon onClick={onDelete} className={styles.icon} />
                            </> :
                            <></>
                        }
                    </div>
                </div>
                <div className={styles.dateDiv}>
                    <p>{note.front.date}</p>
                </div>
            </div>
            <div className={styles.postBody} dangerouslySetInnerHTML={{ __html: md.render(note.content) }} />
            <div className={styles.postHeaderNav}>
                <ArrowUturnLeftIcon onClick={onList} className={styles.icon} />
            </div>
        </>
    )
}
//  ${noto_serif_kr.className}