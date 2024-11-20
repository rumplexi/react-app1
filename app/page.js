import { redirect } from 'next/navigation'

export default function postPage(props) {
    return (
        redirect('/p_list')
    )
}