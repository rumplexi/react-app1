// Create and edit note
'use client'

import React from 'react'
import { useEffect, useState } from "react";
//import "@uiw/react-md-editor/markdown-editor.css";
//import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { addDoc, onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import { db, notesCollection } from "../configure-fb";
import matter from 'gray-matter';
import { useSearchParams } from 'next/navigation';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export default function Edit() {
  const searchParams = useSearchParams();
  const docID = searchParams.get('id')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (docID !== null) {
      const unsub = onSnapshot(doc(db, "notes", docID), function (doc) {
        const note = doc.data()
        setTitle(note.front.title)
        setDate(note.front.date)
        setContent(note.content)
      })
      return unsub;
    } else {
      const date = new Date()
      setDate(date.toDateString())
    }
  }, []);

  async function uploadNote() {
    if (docID === null) {
      const newNote = {
        front: {
          title: title,
          date: date,
          excerpt: 'no excerpt'
        },
        content: content
      }

      try {
        const docRef = await addDoc(notesCollection, newNote);
        alert("New Note added with ID: " + docRef.id)
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("Failed to add document: " + e)
      }

    } else {
      try {
        const docRef = doc(db, "notes", docID)
        await setDoc(docRef, { front: { title: title }, content: content }, { merge: true })
        alert("Document updated with ID: " + docRef.id)

      } catch (e) {
        console.error("Error adding document: ", e);
        alert("Failed to add document: " + e)
      }
    }
  }

  function onUpdate(content) {
    setContent(content)
  }

  const onTitleChanged = (event) => {
    const { name, value } = event.target;
    setTitle(value)
  }

  return (
    <div className="container">
      <input className="bg-slate-100 mt-2" onChange={onTitleChanged} placeholder="edit title" type='text' value={title} size='50' />
      <p>{date}</p>
      <MDEditor className='mt-2'
        value={content}
        onChange={onUpdate}
        height={600}
      />
      <button className="bg-indigo-700 text-white p-2 rounded-full" onClick={uploadNote}>Upload Note!!</button>
    </div>
  );
}