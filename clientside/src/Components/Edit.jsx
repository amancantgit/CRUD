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
  const navigate = useNavigate();

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
    
    <div className={divStyle}>
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='number'
      value={key}
      placeholder='Enter key'
      onChange={(e)=> setKey(e.target.value)}
      className={inputStyle}
      />
    </div>

    <div className={divStyle}>
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='text'
      value={name}
      placeholder='Enter name'
      onChange={(e)=> setName(e.target.value)}
      className={inputStyle}
      />
    </div>

    <div className={divStyle}>
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='text'
      value={email}
      placeholder='Enter email'
      onChange={(e)=> setEmail(e.target.value)}
      className={inputStyle}
      />
    </div>

    <div className={divStyle}>
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='text'
      value={profile}
      placeholder='Enter profile'
      onChange={(e)=> setProfile(e.target.value)}
      className={inputStyle}
      />
    </div>

    <div className={divStyle}>
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='text'
      value={comapny}
      placeholder='Enter comapny'
      onChange={(e)=> setCompany(e.target.value)}
      className={inputStyle}
      />
    </div>

    <div className={divStyle}>
      <label className='text-[1rem], mr-2'>Key :</label>
      <input 
      type='number'
      value={salary}
      placeholder='Enter salary'
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
