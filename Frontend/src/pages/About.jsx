import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Hero } from '../components/Hero.jsx';
import Biography from '../components/Biography';

const services = [
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Oncology',
  'Radiology',
  'Physical Therapy',
  'Dermatology',
  'ENT',
];

const About = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('http://localhost:5002/api/alldoctors', {
          withCredentials: true,
        });
        setDoctors(data.doctors || []);
      } catch (err) {
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <Hero
        title={"Learn More About Us | Ankush Medical Institute"}
        img={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* About Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">About Ankush Care</h1>
          <p className="text-lg text-gray-700 mb-2">
            Welcome to <span className="font-semibold text-blue-600">Ankush Care</span>, your trusted partner in health and wellness. Our hospital is dedicated to providing world-class medical services with compassion, expertise, and the latest technology. We believe in holistic care and a patient-first approach.
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Services</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service, idx) => (
              <li key={idx} className="bg-blue-50 rounded-lg p-4 shadow text-blue-800 font-medium">
                {service}
              </li>
            ))}
          </ul>
        </section>

        {/* Doctors Section */}
        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Our Doctors</h2>
          {loading ? (
            <p>Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p>No doctors found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div key={doctor._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                  <img
                    src={doctor.docAvatar?.url || 'https://via.placeholder.com/100'}
                    alt={doctor.firstName + ' ' + doctor.lastName}
                    className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-400"
                  />
                  <h3 className="text-xl font-semibold text-blue-700 mb-1">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h3>
                  <p className="text-gray-600 mb-1">Department: <span className="font-medium text-blue-600">{doctor.doctorDepartment}</span></p>
                  <p className="text-gray-600 mb-1">Email: <span className="font-medium">{doctor.email}</span></p>
                  <p className="text-gray-600 mb-1">Phone: <span className="font-medium">{doctor.phone}</span></p>
                  <p className="text-gray-600 mb-1">Gender: <span className="font-medium">{doctor.gender}</span></p>
                  <p className="text-gray-600 mb-1">Role: <span className="font-medium">{doctor.role}</span></p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default About;