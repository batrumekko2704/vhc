'use client'

import {useRouter} from 'next/navigation'

export default function Home() {
    const router = useRouter()
    return (
        <button type="button" onClick={() => router.push('/manage/import/read')}>
            Dashboard
        </button>
    )
}
