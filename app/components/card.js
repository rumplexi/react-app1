import React from 'react'
import styles from './card.module.css'
import Image from 'next/image'
//import {lora, roboto} from '../fonts'

export default function Card(props) {
    return(
        <div className={styles.cardContainer}>
            <div className={styles.cardImg}> 
                <Image width="300" height="300" src={props.url}/>
            </div>
            <div className={`${styles.cardTextContainer}`}>
                <h2>{props.title}</h2>
                <p>2024-11-18 hell world</p>
            </div>
        </div>

    )
}