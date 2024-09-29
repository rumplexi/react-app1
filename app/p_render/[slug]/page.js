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
import { noto_serif_kr, lusitana } from '@/app/fonts';

export default async function Page({params}){

    const fileName = params.slug + ".mdx";
    const pathName = path.join(process.cwd(), 'app', '.posts', fileName)
    const doc = await fs.readFileSync(pathName) // await을 하지 않으면 String(file) 안됨

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
