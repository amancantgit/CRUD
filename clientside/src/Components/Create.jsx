import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Create = () => {

  
  let inputStyle = ' my-1 text-[0.9rem] py-1 px-2 w-80 rounded outline-none focus:ring-2 focus:ring-blue-400 text-black'
  let btnStyle = "bg-blue-600 hover:bg-blue-700 text-white py-0.5 px-6 m-auto border border-blue-700 rounded mt-5 transition duration-300 ease-in-out"
  let divStyle = 'flex justify-between items-center '

  
  const [key, setKey] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [profile, setProfile] = useState("")
  const [company, setCompany] = useState("")
  const [salary, setSalary] = useState("")
  const navigate = useNavigate();


  function formSubmit(e){
    const url = 'http://localhost:8000'
    e.preventDefault();

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

    <div className={divStyle}>
    <label className='text-[1rem], mr-2'>Key :</label>
    <input 
    type='number'
    value={key}
    placeholder='Enter key'
    required
    onChange={(e)=> setKey(e.target.value)}
    className={inputStyle}
    />
    </div>
    
    <div className={divStyle}>
    <label className='text-[1rem], mr-2'>Name :</label>
    <input
    type='text'
    value={name}
    placeholder='Your name'
    required
    onChange={(e)=> setName(e.target.value)}
    className={inputStyle}
    /></div>

    <div className={divStyle}>
    <label className='text-[1rem], mr-2'>Email :</label>
    <input 
    type='text'
    value={email}
    placeholder='Your email'
    required
    onChange={(e)=> setEmail(e.target.value)}
    className={inputStyle}
    /></div>

    <div className={divStyle}>
    <label className='text-[1rem], mr-2' >Profile :</label>
    <input 
    type='text'
    value={profile}
    placeholder='Your profile'
    required
    onChange={(e)=> setProfile(e.target.value)}
    className={inputStyle}
    /></div>
    
    <div className={divStyle}>
    <label className='text-[1rem], mr-2' >Company :</label>
    <input 
    type='text'
    value={company}
    placeholder='Your company'
    required
    onChange={(e)=> setCompany(e.target.value)}
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

    <button type='submit' className={btnStyle}>Create</button>
    </form>


    </>
  )
}

export default Create
