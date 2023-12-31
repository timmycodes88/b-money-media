'use client'

import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MediaRoomProps {
  user: any
  video: boolean
  audio: boolean
}

export default function MediaRoom({ user, video, audio }: MediaRoomProps) {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const safeRoom = process.env.NEXT_PUBLIC_PG

  const chatId = safeRoom
    ? 'safe-room-829137982u3281730123'
    : 'squad-12371023782123123'

  useEffect(() => {
    let name = 'Anonymous'
    if (user.username) name = user.username
    ;(async () => {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await res.json()

        setToken(data.token)
      } catch (error: any) {
        console.log(error)
        setError(error?.message || error)
      }
    })()
  }, [chatId, user?.name, user.username])

  if (error)
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <p className=' text-zinc-500 '>{error}</p>
      </div>
    )

  if (!token)
    return (
      <div className='flex h-full w-full flex-col flex-1 justify-center items-center'>
        <Loader2 className='w-10 h-10 text-zinc-500 animate-spin my-4' />
        <p className=' text-zinc-500 '>Loading...</p>
      </div>
    )

  return (
    <LiveKitRoom
      data-lk-theme='default'
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
