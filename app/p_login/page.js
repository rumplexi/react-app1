'use client'
import { React, useState } from 'react'
import { roboto } from '../fonts'
import { auth } from '../configure-fb'
import { signInWithEmailAndPassword } from 'firebase/auth'
import styles from './login.module.css'
import { useRouter } from 'next/navigation'

export default function login() {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, userName, password);
            alert("You are succesfully loggined!! ")
        } catch (e) {
            alert("Login failed with: " + e.message)

        }
        router.push("/")
    }
    return (
        <div className={`${styles.loginContainer} ${roboto.className}`}>
            <h1>Login</h1>
            <div className={styles.formGroup}>
                <label for="email">Email</label>
                <input type="email" id="email" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your email" required />
            </div>
            <div className={styles.formGroup}>
                <label for="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
            </div>
            <button className={styles.loginBtn} onClick={handleLogin}>Login</button>
        </div>
    )
}
