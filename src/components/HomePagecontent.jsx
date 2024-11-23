import React from 'react'

function HomePagecontent({divclass,img,heading,para}) {
  return (
    <div className='grid text-white '>
    <div className={`${divclass} flex p-2 h-20 mt-2 ms-3 items-center gap-3 rounded-lg`}>
        <img src={img} alt="" />
        <div>
            <h2 className='text-sm font-semibold'>{heading}</h2>
            <p className='text-xsm mt-1'>{para}</p>
        </div>
    </div>
    </div>
  )
}

export default HomePagecontent