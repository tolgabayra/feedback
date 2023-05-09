'use client'
import { Grid } from '@mantine/core'
import React from 'react'

export default function page() {
  return (
    <div>
      <Grid grow gutter="xl">
        <Grid.Col m="xs" bg="gray" span={3}>1</Grid.Col>
        <Grid.Col m="xs" bg="gray" span={3}>2</Grid.Col>
        <Grid.Col m="xs" bg="gray" span={3}>3</Grid.Col>
        <Grid.Col m="xs" bg="gray" span={4}>4</Grid.Col>
        <Grid.Col m="xs" bg="gray" span={4}>5</Grid.Col>
      </Grid>

    </div>
  )
}