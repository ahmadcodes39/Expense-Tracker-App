import React from 'react'
import Header from '../LandingComponents/Header'
import MainBody from '../LandingComponents/MainBody'
const Landing = () => {
  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      <Header />
      <MainBody />
    </div>
  );
}

export default Landing
