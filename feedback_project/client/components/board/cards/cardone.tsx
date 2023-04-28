import React from 'react'

type Props = {}

export default function Cardone({ }: Props) {
    return (
        <div>
            <div className='col-span-12 rounded-sm border border-stroke bg-gray-800 p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-0'>
                    <div className='flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0'>
                        <div className=''>
                            <h4 className='mb-0.5 text-xl font-semibold text-white md:text-title-lg'>
                                200
                            </h4>
                            <p className='text-sm font-medium '>Toplam Geri Bildirim</p>
                        </div>
                    
                    </div>
                    <div className='flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0'>
                        <div>
                            <h4 className='mb-0.5 text-xl font-semibold text-white dark:text-white md:text-title-lg'>
                                120
                            </h4>
                            <p className='text-sm font-medium'>Olumlu Bildirim</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <svg
                                width='19'
                                height='19'
                                viewBox='0 0 19 19'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M8.25259 5.87281L4.22834 9.89706L3.16751 8.83623L9.00282 3.00092L14.8381 8.83623L13.7773 9.89705L9.75306 5.87281L9.75306 15.0046L8.25259 15.0046L8.25259 5.87281Z'
                                    fill='#10B981'
                                />
                            </svg>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark sm:border-b-0 sm:pb-0 xl:border-r'>
                        <div>
                            <h4 className='mb-0.5 text-xl font-semibold text-white dark:text-white md:text-title-lg'>
                                80
                            </h4>
                            <p className='text-sm font-medium'>Olumsuz Bildirim</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <svg
                                width='19'
                                height='19'
                                viewBox='0 0 19 19'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M9.75302 12.1328L13.7773 8.10856L14.8381 9.16939L9.00279 15.0047L3.16748 9.16939L4.22831 8.10856L8.25256 12.1328V3.00098H9.75302V12.1328Z'
                                    fill='#F0950C'
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}