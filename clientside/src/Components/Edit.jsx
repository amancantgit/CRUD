import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const Edit = () => {
  
  let inputStyle = ' my-1 text-[0.9rem] py-1 px-2 w-80 rounded outline-none focus:ring-2 focus:ring-blue-400 text-black'
  let btnStyle = "bg-blue-600 hover:bg-blue-700 text-white py-0.5 px-6 m-auto border border-blue-700 rounded mt-4 transition duration-300 ease-in-out"
  let divStyle = 'flex justify-between items-center'
  
  const url = 'http://localhost:8000';
  
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [comapny, setCompany] = useState("");
  const [salary, setSalary] = useState("");
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
      setKeyError(`Key ${key} is already occupied`);
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

  const params = useParams();
  console.log(params);

  const getData = async ()=>{
    const result = await fetch(`${url}/update/${params.id}`);
    const data = await result.json();
    const item = data[0];
    console.log(item);
    setName(item.name)
    setEmail(item.email);
    setProfile(item.profile);
    setCompany(item.comapny);
    setSalary(item.salary);
    console.log(name);
  };

  useEffect(() => {
    getData();
  }, []);

  function formSubmit(e){
    e.preventDefault();

    fetch(`${url}/update/${params.id}`, {
      method: "put",
      body: JSON.stringify({name, email, profile, comapny, salary}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Record Updated");
    navigate("/read");
  }

  return (
    <>
    <h2 className='text-[1.5rem] mb-3'>Create New Data :</h2>

    <form onSubmit={formSubmit} className='flex flex-col border p-10'>
    
    <div >
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
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='text'
      value={name}
      placeholder='Enter name'
      required
      onChange={(e)=> setName(e.target.value)}
      onKeyPress={(e) => {
        if (!/[a-zA-Z ]/.test(e.key)) {
            e.preventDefault();
        }
      }}
      className={inputStyle}
      />
    </div>

    <div>
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='text'
      value={email}
      placeholder='Enter email'
      required
      onChange={handleEmailChange}
      className={`${inputStyle} ml-8`}
      />
      {emailError && <div className="text-red-500 flex justify-center">{emailError}</div>}
    </div>

    <div className={divStyle}>
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='text'
      value={profile}
      placeholder='Enter profile'
      required
      onChange={(e)=> setProfile(e.target.value)}
      onKeyPress={(e) => {
        if (!/[a-zA-Z ]/.test(e.key)) {
            e.preventDefault();
        }
      }}
      className={inputStyle}
      />
    </div>

    <div className={divStyle}>
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='text'
      value={comapny}
      placeholder='Enter comapny'
      required
      onChange={handleCompanyChange}
      className={inputStyle}
      />
    </div>

    <div className={divStyle}>
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='number'
      value={salary}
      placeholder='Enter salary'
      required
      onChange={(e)=> setSalary(e.target.value)}
      className={inputStyle}
      />
    </div>


    <button type='submit' className={btnStyle}>Update</button>
      
    </form>
    </>
  )
}

export default Edit
