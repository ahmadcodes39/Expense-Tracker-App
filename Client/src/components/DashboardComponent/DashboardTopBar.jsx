import React from 'react'
import { useUser } from '../AppContext/UserContext'

const DashboardTopBar = () => {
    // const {user} = useUser()
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const userName = userInfo?.name
  return (
    <div>
      <h1 className='text-4xl font-bold'>Hi, {userName} 💴</h1>
      <h2 className='text-sm mt-2'> Keep an Eye on Every Penny – Plan, Spend, and Save with Confidence!</h2>
    </div>
  )
}

export default DashboardTopBar
