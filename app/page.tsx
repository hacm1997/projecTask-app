'use client'

import { Login } from "@/components/login/Login";
import { useEffect } from "react";
import Cookies from 'js-cookie'

export default function Home() {
  useEffect(() => {
    const token = Cookies.get('auth.user')
    if (token) {
      window.location.href = '/dashboard'
    }
  }, [])
  return (
    <>
      <Login />
    </>
  );
}
