import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets'; 
import { AdminContext } from '../../context/AdminContext'; 
import { toast, ToastContainer } from 'react-toastify';

const AddDoctor = () => {

    const { backendUrl, aToken } = useContext(AdminContext);

    const [docImg, setDocImg] = useState(null); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const handleImageChange = (e) => {
        setDocImg(e.target.files[0]);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!docImg) {
            toast.error('Image Not Selected! Please upload a doctor image.');
            return; 
        }
        
        if (!name || !email || !password || !fees || !degree || !address1 || !about) {
            toast.error('Please fill out all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('image', docImg); 
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('experience', experience);
        formData.append('fees', Number(fees)); 
        formData.append('about', about);
        formData.append('speciality', speciality);
        formData.append('degree', degree);
        formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

        try {
            const response = await fetch(`${backendUrl}/api/admin/add-doctor`, {
                method: 'POST',
                headers: { 
                    'aToken': aToken, 
                    'Authorization': `Bearer ${aToken}` 
                },
                body: formData,
            });
            
            const data = await response.json();
            
            if (data.success) { 
                toast.success('Doctor added successfully!');
                setDocImg(null);
                setName('');
                setEmail('');
                setPassword('');
                setExperience('1 Year');
                setFees('');
                setAbout('');
                setSpeciality('General physician');
                setDegree('');
                setAddress1('');
                setAddress2('');
            } else {
                toast.error(data.message || 'Failed to add doctor.');
            }

        } catch (error) {
            console.error("Submission Error:", error);
            toast.error('An unexpected network error occurred.');
        }
    };

    return (
        <form className='p-5 md:p-10 w-full max-w-6xl mx-auto' onSubmit={handleSubmit} noValidate>
            <ToastContainer position="top-center" autoClose={3000} />

            <h2 className='mb-6 text-2xl font-semibold text-gray-800 border-b pb-2'>Add New Doctor</h2>

            <div className='bg-white shadow-lg rounded-xl p-6 md:p-10'>
                
                {/*Image Upload Section */}
                <div className='flex items-start gap-8 mb-10 border-b pb-8'>
                    <div className="flex items-center text-gray-500">
                        <label 
                            htmlFor="doc-img" 
                            className="cursor-pointer flex items-center gap-4 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition duration-150"
                        >
                            <img 
                                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                                alt="Upload Icon" 
                                className="w-16 h-16 object-contain rounded-full"
                            />
                            <p className="text-base font-medium leading-tight text-gray-700">
                                Upload doctor image <br /> picture
                            </p>
                        </label>
                    </div>
                    <input type="file" id="doc-img" hidden onChange={handleImageChange} /> 
                </div>

                {/*Form Fields Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

                    {/* Column 1 */}
                    <div className="space-y-6">
                        <div className='flex flex-col'>
                            <p className='text-sm font-medium mb-1'>Doctor Name</p>
                            <input className="border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500" type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className='flex flex-col'>
                            <p className='text-sm font-medium mb-1'>Doctor Email</p>
                            <input className="border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500" type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className='flex flex-col'>
                            <p className='text-sm font-medium mb-1'>Doctor Password</p>
                            <input className="border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        
                        <div className='flex flex-col'>
                            <p className='text-sm font-medium mb-1'>Experience</p>
                            <select className="border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white" name="experience" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)}>
                                {Array.from({length: 10}, (_, i) => i + 1).map(year => (
                                    <option key={year} value={`${year} Year`}>{year} Year</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className='flex flex-col'>
                            <p className='text-sm font-medium mb-1'>Fees (in currency)</p>
                            <input className="border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500" type="number" placeholder='Fees' value={fees} onChange={(e) => setFees(e.target.value)} required />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                        <div className='flex flex-col'>
                            <p className='text-sm font-medium mb-1'>Speciality</p>
                            <select className="border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white" name="speciality" id="speciality" value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        
                        <div className='flex flex-col'>
                            <p className='text-sm font-medium mb-1'>Education (Degree/University)</p>
                            <input className="border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500" type="text" placeholder='Education' value={degree} onChange={(e) => setDegree(e.target.value)} required />
                        </div>

                        <div className='flex flex-col space-y-3'>
                            <p className='text-sm font-medium mb-1'>Address</p>
                            <input className="border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500" type="text" placeholder='Address Line 1' value={address1} onChange={(e) => setAddress1(e.target.value)} required />
                            <input className="border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500" type="text" placeholder='Address Line 2' value={address2} onChange={(e) => setAddress2(e.target.value)} required />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col mt-6 pt-6 border-t'>
                    <p className='text-sm font-medium mb-1'>About Doctor</p>
                    <textarea className="border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder='Write a brief description about the doctor' rows={5} value={about} onChange={(e) => setAbout(e.target.value)} required /> 
                </div>

                <button type="submit" className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
                    Add Doctor
                </button>
            </div>
        </form>
    )
}

export default AddDoctor;