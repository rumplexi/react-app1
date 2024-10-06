import React from 'react';
import path from 'path';
import Link from 'next/link';
import styles from './posts.module.css'
import matter from 'gray-matter';
import { CalendarDateRangeIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import hljs from 'highlight.js/lib/common'
import "highlight.js/styles/atom-one-light.css";
import markdownit from 'markdown-it'

export default async function Page({params}){ //dynamic routing using /p_render/[slug] pass slug to params.slug to this function

    const fileName = params.slug + ".mdx";
    const pathName = path.join(process.cwd(), 'app', '.posts', fileName)
    const {content, data} = matter.read(pathName)

    const md = markdownit({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre><code class="hljs">' +
                        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                        '</code></pre>';
                } catch (__) { }
            }

            return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })

    return(
            <>
                <div className="flex flex-col justify-start items-start p-4 mt-2 w-[768px]">
                    <h1 className="text-2xl text-amber-700 font-bold mb-4">{data.title}</h1>
                    <div className="flex justify-start items-center my-1">
                        <CalendarDateRangeIcon className="size-6 mr-1"/>
                        <p className='mr-3'>{data.date}</p>
                        <Link href="/p_edit"><PencilSquareIcon className="size-6"/></Link>
                    </div>
                </div>
                <div className={styles.article} dangerouslySetInnerHTML={{__html:md.render(content)}}/>
            </>
        
    )
}