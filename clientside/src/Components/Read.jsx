import React, { useEffect, useState } from 'react'
import edits from '../assets/edits1.png'
import trash from '../assets/trash.png'
import {Link, useNavigate} from 'react-router-dom'

const Read = () => {
  const url = 'http://localhost:8000'
  const tablehead = 'w-32 h-10 text-lg text-center'
  const tabledata = 'text-center h-10 transition duration-200 ease-in-out hover:cursor-pointer'
  
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(()=> {
  async function readUserData() {
    setIsLoading(true);
    await fetch("http://localhost:8000/get",
    {
      "method":"GET"
    }
    )
    .then((res) => {
      if (!res.ok) {
        setIsLoading(false);
        throw new Error('Failed to fetch data');
      }
      setIsLoading(false);
      return res.json();
    })
    .then(data =>{
      setIsLoading(false);
      console.log('Data fetched successfully : ', data['result']);
      setData(data['result']);
    })
    .catch(error => {
      setIsLoading(false);
      console.log('Error fetching data : ', error);
      });
  }

  readUserData();
  setIsLoading(false);
  }, []);
  console.log(data);

  const remove = async (id) => {
    let data = await fetch(`${url}/delete/${id}`, {
      method: "DELETE",
    });

    // if (!data.ok) {
    //   throw new Error('Failed to delete record');
    // }

    let result = await data.json();
    if(result){
      navigate('/read');
    }
  }


  return (
    <>
     <div>
      <h1 className='text-[1.5rem] font-serif'>Employee's Data :</h1>
      <table>
        <thead className='bg-black text-white'>
          <tr>
            <td className={tablehead}>Key</td>
            <td className={tablehead}>Name</td>
            <td className='w-44 h-10 text-lg text-center'>Email</td>
            <td className='w-44 h-10 text-lg text-center'>Profile</td>
            <td className={tablehead}>Company</td>
            <td className={tablehead}>Salary</td>
            <td className={tablehead}>Action</td>
          </tr>
        </thead>

        {isLoading === true ? <h1>loading</h1> : <tbody>
          {data.map((item, i) => (
            <tr className='bg-gradient-to-r from-[#660101] to-[#2b0206]'>
              <td className={tabledata}>{item.key}</td>
              <td className={tabledata}>{item.name}</td>
              <td className={tabledata}>{item.email}</td>
              <td className={tabledata}>{item.profile}</td>
              <td className={tabledata}>{item.company}</td>
              <td className={tabledata}>{item.salary}</td>

              <td className={tabledata}>
                <button type='button' >
                  {/* <Link to={`/update/` + item._id}> */}
                  <Link to={`/update/`}>
                    <img src={edits} alt="" className='w-5 mx-3 '/>
                  </Link>
                </button>

                <button type='button' onClick={()=> remove(item._id)}>
                  <Link to={`/delete/`+ item._id}>
                    <img src={trash} alt="" className='w-5 mx-3'/>
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>}
      </table>
    </div>

    </>
  )
}

export default Read