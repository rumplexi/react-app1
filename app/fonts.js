import {Lora, Noto_Serif_KR} from 'next/font/google'

export const lora = Lora(
    {
        subsets: ['latin'],
        weight: ['400', '600'],
        variable: "--font-lora"
    }
)

export const noto_serif_kr = Noto_Serif_KR(
    {
        subsets: ['latin'],
        weight: ['400', '600'],
        variable: "--font-notoserif"
    }
)