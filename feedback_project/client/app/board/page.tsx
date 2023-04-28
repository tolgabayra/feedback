'use client'
import Cardone from '@/components/board/cards/cardone'
import Cardtwo from '@/components/board/cards/cardtwo'
import TableOne from '@/components/board/tables/tableone'
import { Card, CardBody, Divider, Text } from '@chakra-ui/react'
import React from 'react'


export default function page() {

  return (
    <div>
      <div className='ml-5 mt-4 mr-5'>
        <p className='text-xl'>Burda geri bildirimleriniz görünür.</p>
        <Divider className='mb-4' />

        <Cardone />
    
        <div className="grid grid-cols-2 gap-1 mt-3">
          <div className='bg-gray-400'>
            Burada Geri Bildirimler


          </div>
          <div className='bg-gray-400'>
            fsdfdsfds
          </div>
        </div>
      </div>
    </div>
  )
}