// Registration.js
import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const[name,setname] = useState('');
  // const [contact_no,setcontact_no] = useState('');
  const [address,setaddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name',name);
    // formData.append('contact_no',contact_no),
    formData.append('email', email);
    formData.append('password', password);
    formData.append('photo', photo);
    formData.append('address',address);

    try {
      const response = await axios.post('http://localhost:4000/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e)=>setname(e.target.value)} required/>
        {/* <input type="number" value={contact_no} onChange={(e)=>setcontact_no(e.target.value)} /> */}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        <textarea value={address} onChange={(e)=>setaddress(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
