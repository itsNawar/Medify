import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer>
      <div className="md:mx-10">
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

          {/* LEFT */}
          <div className="flex flex-col gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl font-extrabold text-blue-800 tracking-tight">MEDIFY</h1>
            <p className="w-full md:w-2/3 text-gray-600 leading-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>

          {/* CENTER */}
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>Home</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>+880-17-14321652</li>
              <li>medify@gmail.com</li>
            </ul>
          </div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center '>© 2025 MEDIFY. All rights reserved.</p>
      </div>
    </footer>

  );
};

export default Footer;
