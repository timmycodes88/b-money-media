'use client'
import { likePost } from "@/lib/actions/thread.actions"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface LikePostProps {
    threadId: string
    userId:string
    liked: boolean
    count: number
}

export default function LikePost({threadId, userId, liked, count}: LikePostProps) {
    const path = usePathname()
    const [optimisicLike, setOptimisticLike] = useState(false)

    const like = async () => {
        setOptimisticLike(true)
        await likePost(JSON.parse(threadId), JSON.parse(userId), path)
    }

  return (
    <button className="flex flex-col justify-center items-center " disabled={liked} onClick={like}>
        <Image
        src={liked || optimisicLike ? '/assets/heart-filled.svg' : '/assets/heart-gray.svg'}
        alt='heart'
        width={24}
        height={24}
        className='cursor-pointer object-contain'
  />
  <p className="text-subtle-semibold text-center mx-auto text-gray-1">{count}</p>
  </button>
  )
}