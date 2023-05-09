'use client'

import { LoadingOverlay } from '@mantine/core'
import React from 'react'


export default function Loading() {
  return (
    <LoadingOverlay
      loaderProps={{ size: 'sm', color: 'blue', variant: 'bars' }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      visible
    />
  )
}