import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppointmentForm = () => {
  const [formdata, setformdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aadhar: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctorId: "",
    hasVisited: false,
    address: ""
  });

  const [doctors, setdoctors] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const departmentsArray = [
    "pediatrics",
    "orthopedics",
    "cardiology",
    "neurology",
    "oncology",
    "radiology",
    "physical Therapy",
    "dermatology",
    "eNT"
  ];

  useEffect(() => {
    const fetchdoctor = async () => {
      try {
        const { data } = await axios.get("http://localhost:5002/api/alldoctors", {
          withCredentials: true
        });
        setdoctors(data.doctors || []);
        console.log("Fetched Doctors:", data.doctors);
      } catch (err) {
        toast.error("Failed to fetch doctors");
      }
    };
    fetchdoctor();
  }, []);

  const handleform = (e) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value
    });
  };

  const handleappointment = async (e) => {
    e.preventDefault();
    seterror("");
    setloading(true);

    const requiredFields = [
      "firstName", "lastName", "email", "phone", "aadhar",
      "dob", "gender", "appointment_date", "department", "doctorId", "address"
    ];

    for (let field of requiredFields) {
      if (!formdata[field]) {
        toast.error(`${field} is required`);
        setloading(false);
        return;
      }
    }

    try {
      const { data } = await axios.post("http://localhost:5002/api/appointment", {
        ...formdata,
        hasVisited: Boolean(formdata.hasVisited)
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });

      toast.success("Appointment form submitted successfully");
      console.log("Appointment created:", data);

      // Reset form after submission
      setformdata({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        aadhar: "",
        dob: "",
        gender: "",
        appointment_date: "",
        department: "",
        doctorId: "",
        hasVisited: false,
        address: ""
      });
    } catch (error) {
      console.log("Error submitting:", error?.response?.data);
      const msg = error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
          <h2 className="text-3xl font-bold text-center bg-blue-600 text-white py-4 mb-6">Appointment</h2>
          <form onSubmit={handleappointment} className="px-8 pb-8">

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formdata.firstName}
                  onChange={handleform}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                />
              </div>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formdata.lastName}
                onChange={handleform}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formdata.email}
                onChange={handleform}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              />
              <input
                type="number"
                placeholder="Mobile Number"
                name="phone"
                value={formdata.phone}
                onChange={handleform}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="number"
                placeholder="Aadhar"
                name="aadhar"
                value={formdata.aadhar}
                onChange={handleform}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              />
              <input
                type="date"
                placeholder="Date of Birth"
                name="dob"
                value={formdata.dob}
                onChange={handleform}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <select
                name="gender"
                value={formdata.gender}
                onChange={handleform}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md appearance-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="date"
                placeholder="Appointment Date"
                name="appointment_date"
                value={formdata.appointment_date}
                onChange={handleform}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              />
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <select
                name="department"
                value={formdata.department}
                onChange={handleform}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md appearance-none"
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => (
                  <option value={depart} key={index}>{depart}</option>
                ))}
              </select>
              <select
                name="doctorId"
                value={formdata.doctorId}
                onChange={handleform}
                disabled={!formdata.department}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter((doctor) => doctor.doctorDepartment === formdata.department)
                  .map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
              </select>
            </div>

            {/* Address */}
            <textarea
              rows="10"
              name="address"
              value={formdata.address}
              onChange={handleform}
              placeholder="Address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md mb-6"
            />

            {/* Visited Before Checkbox */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <p className="text-gray-700">Have you visited before?</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="hasVisited"
                  checked={formdata.hasVisited}
                  onChange={(e) =>
                    setformdata({ ...formdata, hasVisited: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto mx-auto block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              {loading ? "Submitting..." : "GET APPOINTMENT"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
