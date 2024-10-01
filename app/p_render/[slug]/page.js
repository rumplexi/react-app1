import React from 'react';
import fs from 'fs';
import path from 'path';
import styles from './posts.module.css'
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';

export default async function Page({params}){ //dynamic routing using /p_render/[slug] pass slug to params.slug to this function

    const fileName = params.slug + ".mdx";
    const pathName = path.join(process.cwd(), 'app', '.posts', fileName)
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
        <div className={styles.article} dangerouslySetInnerHTML={{__html:String(file)}}/>
    )
}
