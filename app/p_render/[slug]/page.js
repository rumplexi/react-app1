import React from 'react';
import fs from 'fs';
import path from 'path';
import styles from './posts.module.css'
import { unified } from 'unified';
import matter from 'gray-matter';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { CalendarDateRangeIcon } from '@heroicons/react/16/solid';

export default async function Page({params}){ //dynamic routing using /p_render/[slug] pass slug to params.slug to this function

    const fileName = params.slug + ".mdx";
    const pathName = path.join(process.cwd(), 'app', '.posts', fileName)
    const meta = matter.read(pathName).data

    const doc = await fs.readFileSync(pathName) // await FileSync를 하지 않으면 String(file) 안됨 NOT SURE WHY IS THIS!!!

    const file = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkRehype)
        .use(rehypePrettyCode, {
            theme: "one-light",
        })
        .use(rehypeStringify)
        .process(doc) 
    
        return(
            <>
                <div className="flex flex-col justify-start items-start p-4 mt-2 w-[768px]">
                    <h1 className="text-2xl text-amber-700 font-bold mb-4">{meta.title}</h1>
                    <div className="flex justify-start items-center my-1">
                        <CalendarDateRangeIcon className="size-6 mr-2"/>
                        <p>{meta.date}</p>
                    </div>
                </div>
                <div className={styles.article} dangerouslySetInnerHTML={{__html:String(file)}}/>
            </>
        
    )
}