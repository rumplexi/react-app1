'use client'

import Test from '@/markdown/page.mdx'
import {Noto_Serif_KR} from 'next/font/google'

const noto_serif = Noto_Serif_KR({
    subsets: ['latin'],
    weight: ['400', '600'],
})

function CustomH1({ children }) {
  return <h2 style={{ color: 'blue', fontSize: '1.1rem', fontWeight:'600' }}>{children}</h2>
}

function CustomP({ children }) {
  return <p style={{ color: 'red'}}>{children}</p>
}
 
const overrideComponents = {
  h2: CustomH1,
  p: CustomP,
}

export default function Page() {
  
  return (
    <div className={`${noto_serif.className} content`}>
      <Test components={overrideComponents} />
    </div>
  )
}