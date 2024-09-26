'use client'

import React from 'react'
import { AcademicCapIcon } from '@heroicons/react/16/solid'
import styles from './Navbar.module.css'
import Link from 'next/link'

const navItems = {
  'Posts': '/',
  'Cards': '/p_cards', 
  'Tags': '/p_tags',
  'About': '/p_about',
}

const navMenues = Object.entries(navItems).map(([title, path]) => {
    return (
        <Link key={path} href={path} className={styles.menu}>
            {title}
        </Link>
    )
})

export default function Navbar() {
    return (
        <div className={styles.container}>
            <AcademicCapIcon className="size-6 mx-3" />
            {navMenues}
        </div>
    )
}