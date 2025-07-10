import React from 'react'

export const Hero = ({title, img}) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto px-4 py-16'>
      {/* Custom keyframes for up-down movement */}
      <style>{`
        @keyframes moveUpDown {
          0% { transform: translateY(0); }
          100% { transform: translateY(-16px); }
        }
        .animate-move-updown {
          animation: moveUpDown 1s infinite alternate ease-in-out;
        }
      `}</style>
      <div className='w-full md:w-1/2 h-1/2 space-y-8 '>
        <h1 className='text-5xl md:text-6xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse hover:animate-none transition duration-300 drop-shadow-lg'>
          {title}
        </h1>
        <p className='text-xl text-[#415b92] leading-relaxed transition duration-300 hover:text-blue-600 hover:scale-105 font-medium drop-shadow'>
          Ankush Medical Institute is a state-of-the-art facility dedicated
          to providing comprehensive healthcare services with compassion and
          expertise. Our team of skilled professionals is committed to
          delivering personalized care tailored to each patient's needs. At
          AnkushCare, we prioritize your well-being, ensuring a harmonious
          journey towards optimal health and wellness.  
        </p>
      </div>
      <div className="w-full md:w-[650px] md:h-[350px]  flex justify-center items-center  ">
        <div className="  rounded-3xl  shadow-2xl bg-white group flex justify-center items-center mt-8 p-5 border-none" style={{width: '520px', height: '520px'}}>
          <img 
            src={img} 
            alt="hero" 
            className="w-5/6 h-full  relative animate-move-updown group-hover:scale-105  transition-transform duration-500 ease-in-out mt-8 py-5"
            style={{width: '520px', height: '520px'}}
          />
        </div>
        <span className="absolute px-8 -bottom-8 -right-8 z-10">
          <img src="/Vector.png" alt="vector" className="h-28 w-28 md:h-32 md:w-32 drop-shadow-xl animate-bounce" />
        </span>
      </div>
    </div>
  )
}