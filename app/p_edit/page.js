'use client'

import React from 'react'
import { useEffect, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

import { doc, addDoc } from "firebase/firestore"; 
import { notes, db } from "../firebase"; 
import matter from 'gray-matter';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export default function Edit() {

  const [contents, setContents] = useState(window.localStorage.getItem('contents') || " ")

  useEffect(() => {
    localStorage.setItem('contents', contents)
  }, [contents])

  async function submit() {
    const date = new Date()
    const mdDoc = matter(contents)
    await addDoc(notes, {
      front: mdDoc.data,
      content: mdDoc.content,
      date : date.toDateString()
    })
  }

  return (
      <div className="container w-full">
          <MDEditor className='mt-2'
              value={contents}
              onChange={setContents}
          />
          <br></br>
          <button onClick={submit}>submit</button>
      </div>
  );
}