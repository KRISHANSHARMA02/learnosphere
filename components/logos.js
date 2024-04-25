import React from 'react'
import Image from 'next/image';


const logos = () => {
  return (
    <div className="bg-gray-800 py-8">
    <div className="container mx-auto">
      <h2 className="text-white text-2xl font-bold mb-4">Our Partners</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img src="/logo1.png" alt="Logo 1" className="h-16" />
        <img src="/logo2.png" alt="Logo 2" className="h-16" />
        <img src="/logo3.png" alt="Logo 3" className="h-16" />
        <img src="/logo4.png" alt="Logo 4" className="h-16" />
      </div>
    </div>
  </div>
  )
}

export default logos
