'use client'
import { React, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PencilIcon, MoonIcon, MagnifyingGlassIcon, UserIcon as UserIconOut } from '@heroicons/react/24/outline'
import { UserIcon as UserIconIn } from '@heroicons/react/24/solid'
import styles from './compo.module.css'
import Link from 'next/link'
import { auth } from '../configure-fb'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function Navbar() {

    const navItems = {
        'Posts': '/p_list',
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

    const [loggedIn, setLoggedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        })
    }, [])

    async function handleLogout() {
        await signOut(auth)
        setLoggedIn(false)
        alert("You are logged out.")
        router.push('/')
    }

    function handleLogin() {
        router.push('../p_login')
    }
    return (
        <div className={`${styles.container} ${styles.navContainer}`}>
            {navMenues}
            {loggedIn ?
                <Link href='/p_edit/'><PencilIcon className={styles.icon} /></Link> :
                <></>
            }
            <MagnifyingGlassIcon className={styles.icon} />
            <MoonIcon className={styles.icon} />
            {loggedIn ?
                <UserIconIn onClick={handleLogout} className={styles.icon} /> :
                <UserIconOut onClick={handleLogin} className={styles.icon} />
            }
        </div>
    )
}