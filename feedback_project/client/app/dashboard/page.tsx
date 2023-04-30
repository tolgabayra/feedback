import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Page({}: Props) {
  return (
    <div>page
      <Link href="/dashboard/settings">Settings</Link>
    </div>
  )
}