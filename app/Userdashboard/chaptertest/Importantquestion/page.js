"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Head from 'next/head';





const Chaptertest = () => {
  const [selectedLevel, setSelectedLevel] = useState('easy');
  

  const subjectDetails = {
    math: { 
      name: 'Mathematics', 
      colorClass: 'from-orange-600 to-red-500',
      image: '/25673048_vj2f_b439_220316.svg'
    },
    science: { 
      name: 'Science', 
      colorClass: 'from-green-600 to-teal-500',
      image: '/7678843_3737837.jpg'
    },
    english: { 
      name: 'English', 
      colorClass: 'from-blue-600 to-indigo-500',
      image: '/28732095_7480521.svg'
    },
    'Social%20science': { 
      name: 'Social Science', 
      colorClass: 'from-orange-600 to-red-500',
      image: '/27953233_social_science16.svg'
    },
    hindi: { 
      name: 'Hindi', 
      colorClass: 'from-cyan-600 to-slate-500',
      image: '/hindi1.jpeg'
    },
    chemistry: { 
      name: 'Chemistry', 
      colorClass: 'from-green-600 to-cyan-500',
      image: '/chemistry-svgrepo-com.svg'
    },
    biology: { 
      name: 'Biology', 
      colorClass: 'from-cyan-600 to-purple-500',
      image: '/petri-dish-biology-svgrepo-com.svg' 
    },
    physics: { 
      name: 'Physics', 
      colorClass: 'from-purple-600 to-pink-500',
      image: '/physics-nuclear-svgrepo-com.svg'
    },
    accountancy: { 
      name: 'Accountancy', 
      colorClass: 'from-purple-600 to-pink-500',
      image: '/physics-nuclear-svgrepo-com.svg'
    },
    'Bussiness%20studies': { 
      name: 'Bussiness Studies', 
      colorClass: 'from-purple-600 to-pink-500',
      image: '/physics-nuclear-svgrepo-com.svg'
    },
    economics: { 
      name: 'Economics', 
      colorClass: 'from-purple-600 to-pink-500',
      image: '/physics-nuclear-svgrepo-com.svg'
    },
   
    'Political%20science': { 
      name: 'Political Science', 
      colorClass: 'from-purple-600 to-pink-500',
      image: '/physics-nuclear-svgrepo-com.svg'
    },
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div>
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
      <div className="mx-2 md:mx-6 p-2 rounded-lg flex flex-col gap-4">

        <h2 className='text-center font-bold text-[1.7em]'> Learn<b className='text-orange-600'>O</b>sphere</h2>
        <p className="text-[.9em] md:text-[1.1em] text-center mt-4">
          LearnOsphere offers a comprehensive learning platform that tailors content to students' needs...
        </p>

        {/* Level selection buttons */}
        <div className="absolute top-15 right-4 flex gap-2">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              onClick={() => handleLevelSelect(level)}
              className={`px-2 py-1 text-sm font-semibold ${selectedLevel === level ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Dynamically rendering subject buttons with images */}
        <div className="flex flex-wrap gap-4 mt-16">
          {Object.keys(subjectDetails).map((subjectKey) => {
            const { name, colorClass, image } = subjectDetails[subjectKey];
            return (
              <div key={subjectKey} className="flex flex-col h-auto mx-10 md:mx-0 w-60 items-center">
              {subjectKey && selectedLevel && image && name && (
                <Link 
                  href={`/Userdashboard/chaptertest/Chapterwise?selectedSubject=${subjectKey}&level=${selectedLevel}`}
                >
                
                    <Image className='h-60 w-80 rounded-tr-xl rounded-tl-xl border-black border' src={image} width={50} height={50} alt={`${name} icon`} />
                    <p
                      className={`cursor-pointer bg-gradient-to-r w-60 ${colorClass} text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]`}
                    >
                      {name}
                    </p>
              
                </Link>
              )}
                
              </div>
            );
          })}
        </div>
      </div>
   
    </div>
  );
};

export default Chaptertest;
