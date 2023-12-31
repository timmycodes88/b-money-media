"use client"

import useHydrated from "@/hooks/useHydrated"
import { urlB64ToUint8Array } from "@/lib/utils"
import { Bell, BellMinus, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function EnableNotifications() {
  const [status, setStatus] = useState(
    typeof Notification === "undefined" ? null : Notification.permission
  )

  useEffect(() => {
    if (status === "default")
      toast("Click the Bell Icon to enable notifications", {
        icon: "🔔",
      })
  }, [])

  useEffect(() => {
    ;(async () => {
      await navigator.serviceWorker.register("/x2-sw.js")
    })()
  }, [])

  const onSubscribe = async () => {
    const perm = await Notification.requestPermission()
    setStatus(perm)
    if (perm === "granted") {
      await navigator.serviceWorker.ready
      const reg = await navigator.serviceWorker.getRegistration()
      if (!reg) return alert("No Service Worker found")

      const options = {
        applicationServerKey: urlB64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
        ),
        userVisibleOnly: true,
      }

      const subscription = await reg.pushManager.subscribe(options)
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      })
      const { error, user } = await res.json()
      console.log(user)
      if (error) return toast.error(error)
      reg.showNotification("Notifications Activated", {
        body: "Welcome to the future of X2 - More coming...!",
      })
    }
  }

  if (useHydrated())
    return (
      <>
        {!status ? (
          <div className="fixed inset-0 bg-white z-50">
            <Image
              src="/add-to-home.png"
              alt="add to home"
              width={500}
              height={500}
              className="fixed top-0"
            />
            <button
              className="absolute z-10 top-2 right-2"
              onClick={() => setStatus("denied")}
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>
        ) : status === "denied" ? (
          <BellMinus className="w-5 h-5 text-white" />
        ) : status === "granted" ? null : (
          <button className="w-fit" onClick={onSubscribe}>
            <Bell className="w-5 h-5 text-white" />
          </button>
        )}
      </>
    )
}
