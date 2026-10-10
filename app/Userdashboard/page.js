"use client";
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Userdashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/Userdashboard/Home");
  },[router])
  return null
}

export default Userdashboard
