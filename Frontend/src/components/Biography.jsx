import React from 'react'

const Biography = ({img}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Custom keyframes for fade-in and 3D tilt */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        .hover\:animate-tilt:hover {
          transform: perspective(600px) rotateY(10deg) scale(1.05);
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
      <div className="flex flex-col md:flex-row gap-12 items-center animate-fade-in-up">
        {/* Image Section */}
        <div className="w-full md:w-1/2 lg:w-2/5">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-w-4 aspect-h-3 group">
            <img 
              src={'/about.png'} 
              alt="Who we are" 
              className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110 hover:animate-tilt group-hover:shadow-2xl"
              style={{ willChange: 'transform' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 lg:w-3/5 space-y-6 animate-fade-in-up">
          <div className="inline-block">
            <span className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">
              Biography
            </span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg">
              Who We Are
            </h2>
            <div className="mt-4 w-20 h-1 bg-indigo-600 rounded-full"></div>
          </div>

          <div className="prose prose-indigo max-w-none text-gray-600 space-y-4 transition duration-300 hover:scale-105 hover:shadow-xl rounded-xl p-2">
            <p>
              <strong>Ankush Care</strong> is a modern, patient-centered healthcare center dedicated to providing comprehensive medical services to our community. As a trusted hospital and clinic, we offer a wide range of healthcare solutions, from preventive care and diagnostics to advanced treatments and emergency services. Our team of experienced doctors, nurses, and healthcare professionals is committed to delivering compassionate, personalized care in a safe and welcoming environment.
            </p>
            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600 animate-fade-in-up">
              <p className="font-medium text-indigo-700">
                Our mission is to improve lives by delivering high-quality, accessible healthcare for all. At Ankush Care, your health and well-being are our top priorities.
              </p>
            </div>
            <p>
              We combine state-of-the-art technology with a human touch, ensuring every patient receives the attention and treatment they deserve. Whether you need routine checkups, specialist consultations, or urgent medical attention, Ankush Care is here for you—every step of the way.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start transition duration-300 hover:scale-105">
                <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Comprehensive outpatient and inpatient services</span>
              </li>
              <li className="flex items-start transition duration-300 hover:scale-105">
                <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24/7 emergency care and diagnostics</span>
              </li>
              <li className="flex items-start transition duration-300 hover:scale-105">
                <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Specialist consultations and advanced treatments</span>
              </li>
              <li className="flex items-start transition duration-300 hover:scale-105">
                <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Patient-first philosophy with compassionate care</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography