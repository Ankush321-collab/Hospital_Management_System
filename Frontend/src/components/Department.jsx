import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Department = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
      color: "bg-blue-100",
      border: "border-blue-500",
      text: "text-blue-800"
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
      color: "bg-green-100",
      border: "border-green-500",
      text: "text-green-800"
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
      color: "bg-red-100",
      border: "border-red-500",
      text: "text-red-800"
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
      color: "bg-purple-100",
      border: "border-purple-500",
      text: "text-purple-800"
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
      color: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-800"
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
      color: "bg-indigo-100",
      border: "border-indigo-500",
      text: "text-indigo-800"
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
      color: "bg-pink-100",
      border: "border-pink-500",
      text: "text-pink-800"
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
      color: "bg-teal-100",
      border: "border-teal-500",
      text: "text-teal-800"
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
      color: "bg-orange-100",
      border: "border-orange-500",
      text: "text-orange-800"
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 30
    }
  };

  // Custom arrow components with larger size
  const CustomLeftArrow = ({ onClick }) => (
    <button 
      onClick={() => onClick()}
      className="absolute left-0 z-10 hidden md:block transform -translate-y-1/2 top-1/2 bg-white p-3 rounded-full shadow-xl hover:bg-gray-100 focus:outline-none transition-all duration-300 hover:scale-110"
      aria-label="Previous department"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button 
      onClick={() => onClick()}
      className="absolute right-0 z-10 hidden md:block transform -translate-y-1/2 top-1/2 bg-white p-3 rounded-full shadow-xl hover:bg-gray-100 focus:outline-none transition-all duration-300 hover:scale-110"
      aria-label="Next department"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
          Our <span className="text-indigo-600">Departments</span>
        </h2>
        <div className="mt-6 h-1.5 w-24 bg-indigo-600 mx-auto rounded-full"></div>
      </div>

      <div className="relative">
        <Carousel
          responsive={responsive}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          removeArrowOnDeviceType={[]}
          itemClass="px-8" // Increased horizontal gap
          containerClass="pb-12"
          partialVisible={false}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000} // 4 seconds between slides
          slidesToSlide={4}
          transitionDuration={600}
          swipeable={true}
          draggable={true}
          centerMode={false}
          focusOnSelect={false}
        >
          {departmentsArray.map((depart, index) => (
            <div 
              key={index} 
              className={`group h-full p-1 ${depart.border} border-l-4 rounded-xl transition-all duration-500 hover:border-l-8 hover:shadow-2xl`}
              style={{ minWidth: '350px', maxWidth: '380px', minHeight: '520px', maxHeight: '550px', margin: '0 12px' }}
            >
              <div className={`h-full rounded-xl overflow-hidden shadow-lg ${depart.color} transition-all duration-500 group-hover:shadow-2xl transform group-hover:-translate-y-3`}
                style={{ minHeight: '500px', maxHeight: '530px' }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={depart.imageUrl} 
                    alt={depart.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className={`text-2xl font-bold ${depart.text} bg-white/90 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-x-3`}>
                      {depart.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 transform transition-all duration-500 group-hover:translate-y-2">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                  <button className={`mt-2 px-6 py-3 ${depart.text} font-semibold rounded-lg bg-white border-2 ${depart.border} hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105`}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Department;