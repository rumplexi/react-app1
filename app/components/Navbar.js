import React from 'react'
import {PencilIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import styles from './compo.module.css'
import Link from 'next/link'

const navItems = {
  'Posts': '/',
  'Cards': '/p_cards', 
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
        <div className={`${styles.container} ${styles.navContainer}`}>
            {navMenues}
            <Link href='/p_edit/'><PencilIcon className={styles.icon} /></Link>
            <MagnifyingGlassIcon className={styles.icon} />
            <MoonIcon className={styles.icon} />
        </div>
    )
}