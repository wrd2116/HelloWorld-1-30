'use client'

import { createClient } from '@/lib/supabase/client'

export function GatedUI() {
  async function signIn() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Sign in required</h1>
        <p className="text-gray-500 text-sm mb-4">Sign in with Google to view this page.</p>
        <button
          type="button"
          onClick={signIn}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  )
}
