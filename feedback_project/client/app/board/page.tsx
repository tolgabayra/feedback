'use client'
import Cardone from '@/components/board/cards/cardone'
import Cardtwo from '@/components/board/cards/cardtwo'
import TableOne from '@/components/board/tables/tableone'
import { Box, Button, Card, CardBody, CardHeader, Divider, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'
import React from 'react'


export default function page() {

  return (
    <div>
      <div className='ml-5 mt-4 mr-5'>
        <p className='text-xl'>Burda geri bildirimleriniz ve istatislikleriniz görünür.</p>
        <Divider className='mb-4' />

        <Cardone />

        <Card className='mt-3'>
          <CardHeader className='bg-gray-800 text-white'>
            <Heading size='md'>Geri Bildirimleriniz</Heading>
          </CardHeader>
          <CardBody className='bg-gray-800 text-white'>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Enfes bir tatlınız var
                </Heading>
                <Text pt='2' fontSize='sm'>
                  View a summary of all your clients over the last month.
                  <Button h="6" ml="3" mb="" fontSize="14px" colorScheme='red' variant="solid">Bildirimi Sil</Button>
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Overview
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Check out the overview of your clients.
                  <Button h="6" ml="3" mb="" fontSize="14px" colorScheme='red'>Bildirimi Sil</Button>
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                  <Button h="6" ml="3" mb="" fontSize="14px" colorScheme='red'>Bildirimi Sil</Button>
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}