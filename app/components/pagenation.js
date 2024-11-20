'use client'
import { React, useState} from 'react'
import styles from './pagenation.module.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'

export default function Pagenation({pageNum, maxPageNumber, onUpdatePage}){
    
    return(
        <div className={styles.pagenation}>
                {pageNum > 1 ?
                    <ChevronLeftIcon onClick={() => onUpdatePage(pageNum-1)} className={styles.icon} /> :
                    <ChevronLeftIcon className={styles.iconDisabled} />}
                <p>{pageNum} / {maxPageNumber}</p>
                {pageNum < maxPageNumber ?
                    <ChevronRightIcon onClick={() => onUpdatePage(pageNum+1)} className={styles.icon} /> :
                    <ChevronRightIcon className={styles.iconDisabled} />}
        </div>
    )
}