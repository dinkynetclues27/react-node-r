// // Registration.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const Registration = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const[name,setname] = useState('');
//   const [contactno,setcontactno] = useState('');
//   const [address,setaddress] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

    // const formData = new FormData();
    // formData.append('name',name);
    // formData.append('contact_no',contactno);
    // formData.append('email', email);
    // formData.append('password', password);
    // formData.append('photo', photo);
    // formData.append('address',address);

//     try {
//       const response = await axios.post('http://localhost:4000/register', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={name} onChange={(e)=>setname(e.target.value)} required/>
//         <input type="number" value={contactno} onChange={(e)=>setcontactno(e.target.value)} />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
//         <textarea value={address} onChange={(e)=>setaddress(e.target.value)} />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Registration;


import React, { useState } from 'react';
// import './style.css'; 
// import {Link} from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const MyFormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact_no: '',
    password: '', 
    email: '',
    address: '',
    profilePicture:null
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log()
    try{ 
      const form = new FormData();
      form.append('name',formData.name);
      form.append('contact_no',formData.contact_no);
      form.append('email', formData.email);
      form.append('password', formData.password);
      form.append('profilePicture', formData.profilePicture);
      form.append('address',formData.address);
      //console.log('Form data:', formData);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:4000/register', true);
      // xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        // if (xhr.readyState === XMLHttpRequest.DONE) {
        //   console.log('Response status:', xhr.status);
        //   console.log('Response text:', xhr.responseText);
          if (xhr.status === 201 || xhr.status === 200) {
            const data =  JSON.parse(xhr.responseText);
            setSubmittedData(data); 
            setFormSubmitted(true);
            setFormData({ name: '', contact_no: '', password: '', email: '',address:'',profilePicture:'' });
            window.location.href='/login'
            // toast.success('Data inserted successfully!', { autoClose: 5000 });
          } else if (xhr.status === 409) { 
            // console.error("error")
            console.log("Error")
            // toast.error('Duplicate ID found. Please choose a different ID.');
          } else {
            console.error("error")
            // toast.error('An error occurred while submitting the form. Please try again later.');
          }
        }
      // };
      // xhr.send(JSON.stringify(formData));
      xhr.send(form);
    }
      catch(error){console.error("Error submitting form:", error);}
   
  // Object.entries(formData).forEach(([key, value]) => {
  // formDataToSend.append(key, value);
  // });
   
  };
  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
         contact_no:
          <input type="text" name="contact_no" value={formData.contact_no} onChange={handleChange} />
        </label>
        <label>
          password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
         email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          profilePicture:
          <input type="file" name="profilePicture" onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {/* {formSubmitted && (
        <div>
       
          <Link to="/fetchbook">Go to Book Table</Link>
        </div>
      )} */}
    </div>
  );
};

export default MyFormComponent;


// import { toast } from "react-hot-toast";
 
// import React, { useState } from "react";
// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     contact_no:"",
//     profilePicture: "",
//   });
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
 
//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       profilePicture: e.target.files[0],
//     });
//   };
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("name", formData.name);
//     form.append("email", formData.email);
//     form.append("password", formData.password);
//     form.append("profilePicture", formData.profilePicture);
//     form.append("address",formData.address);
//     form.append("contact_no",formData.contact_no);
 
//     // if (formData.password !== formData.confirmpassword) {
//     //   return toast.error("Password not match...!");
//     // }
 
//     // console.log(formData);
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://localhost:4000/register", true);
//     //xhr.setRequestHeader("Content-Type", "application/json");
 
//     xhr.onload = () => {
//       if (xhr.status == 200) {
//         toast.success("Inserted Successfully");
//         console.log("Data Inserted Successfully");
//       } else if (xhr.status === 409) {
//         toast.error("Email is taken already");
//       } else if (xhr.status == 204) {
//         toast.error("Insert All Fields Properly");
//       } else if (xhr.status == 550) {
//         toast.error("Email expression is not valid");
//       } else {
//         toast.error("Something went wrong");
//         console.log(xhr.responseText);
//         console.log(xhr.status);
//       }
//     };
 
//     // console.log(formData.uprofilepic);
//     console.log(formData.profilePicture);
//     xhr.send(form);
 
//     // xhr.send(JSON.stringify(formData));
//     // xhr.send({ uname, uemail, upassword, uprofilepic });
 
//     // Clear form fields
//     // setFormData({
//     //   uname: "",
//     //   uemail: "",
//     //   upassword: "",
//     //   uprofilepic: null,
//     // });
//   };
 
//   return (
//     <>
//       <div className="container">
//         <h2>User Registration Form</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <label htmlFor="name">Username:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
 
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
 
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             // value={formData.upassword}
//             onChange={handleChange}
//             required
//           />
 
//           {/* <label htmlFor="confirmpassword">Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmpassword"
//             name="confirmpassword"
//             // value={formData.confirmpassword}
//             onChange={handleChange}
//             required
//           /> */}
 
//           <label htmlFor="profilePicture">Profile Picture:</label>
//           <input
//             type="file"
//             id="profilePicture"
//             name="profilePicture"
//             onChange={handleFileChange}
//             accept="profilePicture/*"
//           />
          
//           <label htmlFor="address">Address:</label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//           />

// <label htmlFor="contact_no">Contact:</label>
//           <input
//             type="text"
//             id="contact_no"
//             name="contact_no"
//             value={formData.contact_no}
//             onChange={handleChange}
//           />

//           <input type="submit" value="Submit" />
//         </form>
//       </div>
//     </>
//   );
// };
 
// export default RegistrationPage;
