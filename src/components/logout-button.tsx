'use client'

import { supabaseBrowserClient } from '@/lib/client'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    await supabaseBrowserClient.auth.signOut()
    router.push('/')
  }

  return <Button onClick={logout}>Logout</Button>
}
