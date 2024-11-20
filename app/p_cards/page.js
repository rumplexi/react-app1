'use client'
import { React, useState } from 'react';
import Card from '../components/card';
import Pagenation from '../components/pagenation';
import styles from './cardList.module.css'
import Link from 'next/link'
import modelMap from '../models/modelMap'

export default function cardPage() {

    const [pageNum, setPageNum] = useState(1)
    const modelsPerPage = 3;
    const nModels = Object.entries(modelMap).length
    const maxPageNumber = Math.ceil(nModels / modelsPerPage)
    const startIndex = (pageNum - 1) * modelsPerPage
    const endIndex = Math.min(startIndex + modelsPerPage, nModels)
    const modelArray = Object.entries(modelMap).slice(startIndex, endIndex)

    const cardList = modelArray.map(([id, modelInfo]) => {
        return (
            <Link href={{pathname: "../p_draw", query: { compNum : id}}}>
                <Card url={modelInfo.image} title={modelInfo.title} />
            </Link>
        )
    })

    return (
        <>
            <div className="w-[768px] flex flex-row items-center justify-between">
                {cardList}
            </div>
            <Pagenation pageNum={pageNum} maxPageNumber={maxPageNumber} onUpdatePage={setPageNum} />
        </>
    )
}