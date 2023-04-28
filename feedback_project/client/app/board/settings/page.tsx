'use client'

import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

export default function page() {
  return (
    <div className='ml-5 mt-9'>
      <h1 className='text-xl'>Ayarlar</h1>
      <Divider className='mb-3' />
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(600px, 1fr))' className='mr-4'>
        <Card bgColor="blackAlpha.300" textColor="white">
          <CardHeader>
            <Heading size='md'> Kullanıcı Bilgileri</Heading>
          </CardHeader>
          <CardBody>
            <Text className='mb-2 underline'>İsim: </Text>
            <Text className='mb-2 underline'>Email: </Text>
            <Text className='mb-2 underline'>Adress: </Text>
            <Text className='mb-2 underline'>Şehir: </Text>
            <Text className='underline'>İlçe: </Text>

          </CardBody>
          <CardFooter>
            <Link href='https://chakra-ui.com' isExternal>
              Bilgileri Düzenle <ExternalLinkIcon mx='2px' />
            </Link>
          </CardFooter>
        </Card>
        <Card bgColor="blackAlpha.300" textColor="white">
          <CardHeader>
            <Heading size='md'> Kullanıcı İşlemleri</Heading>
          </CardHeader>
          <CardBody>
            <Text className='hover:underline hover:cursor-pointer'>Parola Değiştir</Text>
          </CardBody>
        </Card>

      </SimpleGrid>
    </div>
  )
}