import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Update() {

  let inputStyle = ' my-1 text-[0.9rem] py-1 px-2 w-80 rounded outline-none focus:ring-2 focus:ring-blue-400 text-black'
  let btnStyle = "bg-blue-600 hover:bg-blue-700 text-white py-0.5 px-6 m-auto border border-blue-700 rounded mt-4 transition duration-300 ease-in-out"
  let updatebtnStyle = 'bg-green-600 hover:bg-green-700 text-white py-0.5 px-6 m-auto border border-green-700 rounded mt-4 transition duration-300 ease-in-out'
  let divStyle = 'flex justify-between items-center'

  
  const url = 'http://localhost:8000'

  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [mode, setMode] = useState("");
  const navigate = useNavigate();

  const getData = async (e) => {
    e.preventDefault();
    console.log(key);
    const data = await fetch(`${url}/delete/${key}`);
    const result = await data.json();
    console.log(result);


    ////// HEERRREEEEEE
    const item = result['result'][0];
    console.log(item);
    setMode(item);

    setName(item.name);
    setEmail(item.email);
    setProfile(item.profile);
    setCompany(item.company);
    setSalary(item.salary);
  };


  const formupdate = async (e) => {
    e.preventDefault();
    console.log("clicked updated");
    const data = await fetch(`${url}/update/data/${key}`, {
      method: "put",
      body: JSON.stringify({ name, email, profile, company, salary }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await data.json();
    console.log(result);
    if (result.modifiedCount === 1) {
      alert("Record Updated");
    }
    navigate("/read");
  };

    
  return (
    <>
    <h2 className='text-[1.5rem] mb-3 font-[600]'>Rectify Data</h2>
    <form onSubmit={getData} className='flex flex-col border pt-8 pb-7 pl-10 pr-10 bg-gradient-to-r from-[#6f0700] to-[#2b0206]'>

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
    
    <button type='submit' className={btnStyle}>Find and Update</button>
    </form>

      {mode ? (
        <div>
          <h3 className="mt-8 font-medium mb-1 text-center text-[1.1rem]">Employee Data with ID {key} :</h3>

          <form  onSubmit={formupdate} className='flex flex-col border border-gray-700 pt-6 pl-10 pr-10 pb-5 bg-gradient-to-r from-[#6f0700] to-[#2b0206]'>
          <div className={divStyle}>
            <label className='text-[1rem], mr-2'>Name :</label>
            <input
            type='text'
            value={name}
            placeholder='Your name'
            onChange={(e)=> setName(e.target.value)}
            className={inputStyle}
            />
          </div>

          <div className={divStyle}>
            <label className='text-[1rem], mr-2'>Email :</label>
            <input 
            type='text'
            value={email}
            placeholder='Your email'
            onChange={(e)=> setEmail(e.target.value)}
            className={inputStyle}
            />
          </div>

          <div className={divStyle}>
            <label className='text-[1rem], mr-2' >Profile :</label>
            <input 
            type='text'
            value={profile}
            placeholder='Your profile'
            onChange={(e)=> setProfile(e.target.value)}
            className={inputStyle}
            /></div>
           

           <div className={divStyle}>
            <label className='text-[1rem], mr-2' >Company :</label>
            <input 
            type='text'
            value={company}
            placeholder='Your company'
            onChange={(e)=> setCompany(e.target.value)}
            className={inputStyle}
          /></div>


          <div className={divStyle}>
            <label className='text-[1rem], mr-2' >Salary :</label>
            <input 
            type='number'
            value={salary}
            placeholder='Your salary'
            onChange={(e)=> setSalary(e.target.value)}
            className={inputStyle}
          /></div>

          <button type='submit' className={updatebtnStyle}>Update</button>
          </form>
        </div>
      ) : (
        <h1>No Record Found</h1>
      )}
    </>
  );
}
