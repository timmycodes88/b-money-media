import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// generated by shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// created by chatgpt
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/
  return base64Regex.test(imageData)
}

export const urlB64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// created by chatgpt
export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString(undefined, options)

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })

  const now = new Date()
  // is it today?
  if (date.getDate() === now.getDate()) {
    return time
  }
  // is it yesterday?
  if (date.getDate() === now.getDate() - 1) {
    return 'Yesterday'
  }
  // was it longer than a week ago?
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(now.getDate() - 7)
  if (!(date >= oneWeekAgo && date <= now)) {
    return formattedDate
  }

  // was it this week?
  if (date.getDate() > now.getDate() - 7) {
    return `${date.toLocaleDateString(undefined, { weekday: 'short' })}`
  }

  return formattedDate
}

// created by chatgpt
export function formatThreadCount(count: number): string {
  if (count === 0) {
    return 'No Threads'
  } else {
    const threadCount = count.toString().padStart(2, '0')
    const threadWord = count === 1 ? 'Thread' : 'Threads'
    return `${threadCount} ${threadWord}`
  }
}
