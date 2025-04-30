"use client"
import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    useClerk,
    useUser,
  } from '@clerk/nextjs'
import { ModeToggle } from './ModeToggle'
  const Navbar = () => {
  return (
    <div className='w-screen bg-gray-100 flex items-center justify-center p-5'>
        <div className='bg-gray-200 flex w-96 flex justify-between'>
<SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>      

            <ModeToggle/>
    </div>
    </div>
  )
}

export default Navbar
