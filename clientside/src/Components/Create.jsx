import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Create = () => {

  let inputStyle = ' my-1 text-[0.9rem] py-1 px-2 w-72 rounded outline-none focus:ring-2 focus:ring-blue-400 text-black'
  let btnStyle = "bg-blue-600 hover:bg-blue-700 text-white py-0.5 px-6 m-auto border border-blue-700 rounded mt-5 transition duration-300 ease-in-out"
  let divStyle = 'flex justify-between items-center '
  
  const [key, setKey] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [profile, setProfile] = useState("")
  const [company, setCompany] = useState("")
  const [salary, setSalary] = useState("")
  const [emailError, setEmailError] = useState("");
  const [keyError, setKeyError] = useState("");
  const [isKeyValid, setIsKeyValid] = useState(true);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleCompanyChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9\s]*$/;

    if (regex.test(value)) {
      setCompany(value);
    }
  };

  const checkKeyAvailability = async (key) => {
    const response = await fetch(`http://localhost:8000/check-key/${key}`);
    const result = await response.json();
    if (result.exists) {
      setKeyError(`${key} is already occupied`);
      setIsKeyValid(false);
    } else {
      setKeyError('');
      setIsKeyValid(true);
    }
  };

  const handleKeyChange = (e) => {
    const { value } = e.target;
    setKey(value);
    if (value) {
      checkKeyAvailability(value);
    } else {
      setKeyError('');
      setIsKeyValid(true);
    }
  };

  function formSubmit(e){
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    const url = 'http://localhost:8000'

    fetch(`${url}/create`, {
      method: "post",
      body: JSON.stringify({key, name, email, company, profile, salary}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("New Record Created Successfully")
    navigate('/read')
  }


  return (
    <>

    <h2 className='text-[1.5rem] mb-3 font-medium'>Create Employee's Data : </h2>
   
    <form onSubmit={formSubmit} className='flex flex-col border p-10 bg-gradient-to-r from-[#6f0700] to-[#2b0206]'>

    <div>
    <label className='text-[1rem], mr-2'>Key :</label>
    <input 
    type='number'
    value={key}
    placeholder='Enter key'
    required
    onChange={handleKeyChange}
    className={`${inputStyle} ml-11`}
    />
    {keyError && <div className="text-red-500 flex justify-center">{keyError}</div>}
    </div>
    
    <div className={divStyle}>
    <label className='text-[1rem], mr-2'>Name :</label>
    <input
    type='text'
    value={name}
    placeholder='Your name'
    required
    onChange={(e)=> setName(e.target.value)}
    onKeyPress={(e) => {
      if (!/[a-zA-Z ]/.test(e.key)) {
          e.preventDefault();
      }
    }}
    className={inputStyle}
    /></div>

    <div>
      <label className='text-[1rem] mr-2'>Email :</label>
      <input
        type='text'
        value={email}
        placeholder='Your email'
        required
        onChange={handleEmailChange}
        className={`${inputStyle} ml-8`}
      />
      {emailError && <div className="text-red-500 flex justify-center">{emailError}</div>}
    </div>

    <div className={divStyle}>
    <label className='text-[1rem], mr-2' >Profile :</label>
    <input 
    type='text'
    value={profile}
    placeholder='Your profile'
    required
    onChange={(e)=> setProfile(e.target.value)}
    onKeyPress={(e) => {
      if (!/[a-zA-Z ]/.test(e.key)) {
          e.preventDefault();
      }
    }}
    className={inputStyle}
    /></div>
    
    <div className={divStyle}>
    <label className='text-[1rem], mr-2' >Company :</label>
    <input 
    type='text'
    value={company}
    placeholder='Your company'
    required
    onChange={handleCompanyChange}
    className={inputStyle}
    /></div>

    <div className={divStyle}>
    <label className='text-[1rem], mr-2' >Salary :</label>
    <input 
    type='number'
    value={salary}
    placeholder='Your salary'
    required
    onChange={(e)=> setSalary(e.target.value)}
    className={inputStyle}
    /></div>

    <button type='submit' className={btnStyle} disabled={!isKeyValid}>Create</button>
    </form>


    </>
  )
}

export default Create
