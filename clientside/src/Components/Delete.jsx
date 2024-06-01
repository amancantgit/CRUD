import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Delete = () => {

  let inputStyle = 'my-1 text-[0.9rem] py-1 px-2 w-80 rounded outline-none focus:ring-2 focus:ring-blue-400 text-black'
  let btnStyle = "bg-blue-600 hover:bg-blue-700 text-white py-0.5 px-6 m-auto border border-blue-700 rounded mt-4 transition duration-300 ease-in-out"
  let divStyle = 'flex justify-between items-center'



  const [key, setKey] = useState();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState();
  const [mode, setMode] = useState("");


  const getData = async (e) =>{
    e.preventDefault();

    const url = 'http://localhost:8000'

    // console.log(key);
    const data = await fetch(`${url}/delete/${key}`);
    const result = await data.json();
    console.log(result);
    const item = result['result'][0];
    console.log(item);
    setMode(item)

    setKey(item.key);
    setName(item.name);
    setEmail(item.email);
    setProfile(item.profile);
    setCompany(item.company);
    setSalary(item.salary);
  }


  return (
    <>
  <h2 className='text-[1.5rem] mb-3 font-medium'>Eliminate Individual Data</h2>

  <form onSubmit={getData} className='flex flex-col border pt-8 pb-7 pl-10 pr-10 bg-gradient-to-r from-[#6f0700] to-[#2b0206]'>
  <div className={divStyle}>
    <label className='text-[1rem] mr-2'>Key :</label>
    <input 
    type='number'
    placeholder='Enter key'
    onChange={(e)=> setKey(e.target.value)}
    className={inputStyle}
    />
    </div>

  <button type='submit' className={btnStyle}>Find and Delete</button>
</form>

    <div>
    {mode ? (
        <Show
        keys={key}
        name={name}
        email={email}
        profile={profile}
        company={company}
        salary={salary}
      />
    ) : (
      <h1>No Record Found</h1>
    )}
    </div>
    </>
  );
}


function Show(props){
  const navigate = useNavigate();

  const deletedata = async () => {
    console.log("Delete");

    let data = await fetch(`/delete/data/${props.key}`, {
      method: "Delete",
    });

    alert("Record Deleted Successfully")
    navigate('/read');
  }

  return(
    <>
      <h1 className='mt-8 mb-2 text-center font-semibold text-[1.1rem]'>Record for the respective key</h1>

    <div className='border border-gray-700 flex pl-14 pr-14 pt-5 pb-5 bg-gradient-to-r from-[#6f0700] to-[#2b0206]'>

      <div className='flex flex-col pl-10 pr-10'>
            <p className='font-bold m-1'>ID :</p>
            <p className='font-bold m-1'>Name :</p>
            <p className='font-bold m-1'>Email :</p>
            <p className='font-bold m-1'>Profile :</p>
            <p className='font-bold m-1'>Company :</p>
            <p className='font-bold m-1'>Salary :</p>
      </div>
      <div className='flex flex-col pl-10 pr-1'>
            <p className='m-1'>{props.keys}</p>
            <p className='m-1'>{props.name}</p>
            <p className='m-1'>{props.email}</p>
            <p className='m-1'>{props.profile}</p>
            <p className='m-1'>{props.company}</p>
            <p className='m-1'>{props.salary}</p>
      </div>
    </div>

    <div className='flex justify-center'><button onClick={deletedata} className='bg-red-600 hover:bg-red-700 text-white py-0.5 px-6  border border-red-800 rounded transition duration-300 ease-in-out mt-4'>Confirm to Delete</button></div>
    </>
  )

}

export default Delete

