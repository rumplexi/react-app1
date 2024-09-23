import React from 'react'
import Link from 'next/link'

export default function cardPage() {

    return (
        <div className="bg-red-200 mt-20 p-4">
            <h1>This is a card page</h1>
            <Link href='/'> Home</Link>
        </div>
    )
}