'use client'

import React from 'react'
import { AcademicCapIcon } from '@heroicons/react/24/solid'
import styles from './Navbar.module.css'

export default function Navbar() {

    return (
        <div className={styles.container}>
            <AcademicCapIcon className="size-6 mx-3" />
            <button className={styles.menu}>Posts</button>
            <button className={styles.menu}>Cards</button>
            <button className={styles.menu}>Tags</button>
            <button className={styles.menu}>Abouts</button>
        </div>
    )
}