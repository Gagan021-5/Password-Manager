import { useState,useEffect } from 'react'
import './App.css'
import Navabar from './components/Navabar'
import Second from './components/Second'
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";

function App() {
  const [form, setform] = useState({ link: "", username: "", password: "" });
  const [pass, setpass] = useState([]);
 



const getdata= async()=>{
  let user =  await fetch("http://localhost:3000/");
 let values = await user.json();
 console.log(values);
 setpass(values);

}

  useEffect(() => {
   getdata();
  }, []);

  const change = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };


  const save = async() => {
    if(form.link.length>2 && form.username.length>1 && form.password.length>3){
      const newPass = { ...form, id: uuidv4() }
        const updatedPass = [...pass, newPass];
      setpass(updatedPass);

       await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"}, body: JSON.stringify({id: form.id}) })
      
       await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"}, body: JSON.stringify({...form,id:uuidv4()}) })
      setform({ link: "", username: "", password: "" });
    } else if(form.link.length ===0 && form.username.length===0 && form.password.length===0){
      alert("Please fill the Required fields first!");
    }
  };



  const remove = async (id) => {
    if (window.confirm("You sure you want to remove?")) {
      const updated = pass.filter((item) => item.id !== id);
      setpass(updated);
       await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"}, body: JSON.stringify({id}) })
      
    }
  };



  const reuse = (id) => {
console.log(`edited id is ${id}`);
setform({...pass.filter(i=>id ===id)[0],id:id});
setpass(pass.filter(item=>item.id !==id ));

  };



  return (
    <>
      <Navabar />
      <div className="container w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 ">
        <div className="upper p-4 sm:p-8 flex justify-center w-full sm:w-[90%] md:w-[80%] lg:w-[50%] bg-[#375561] rounded-lg">
          <div className="add w-full p-4 h-full bg-[#2c444d] rounded-xl">
            <h2 className="font-medium text-white">Add your Passwords</h2>
            <div className="mt-3 space-y-6">
              <input
                type="text"
                value={form.link}
                onChange={change}
                name="link"
                className="w-full p-2 bg-white rounded-sm placeholder:text-gray-700 outline-none"
                placeholder="Enter Website Link"
              />
              <input
                type="text"
                value={form.username}
                onChange={change}
                name="username"
                className="w-full p-2 bg-white rounded-sm placeholder:text-gray-700 outline-none"
                placeholder="Username"
              />
              <input type="password"
              value={form.password}
                onChange={change}
                name="password"
                className="w-full p-2 bg-white rounded-sm placeholder:text-gray-700 outline-none"
                placeholder="Password"
              />
              <div className="box flex w-full justify-center">
                <button
                  className="w-24 p-2 text-white bg-gray-800 rounded-lg cursor-pointer border border-green-950 hover:border-gray-600"
                  onClick={save}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {pass.length === 0 && (
          <div className="text-white font-bold p-3 text-lg">No passwords added here..</div>
        )}
        {pass.length !== 0 && (
          <div className="p-4 sm:p-10 mt-5 w-full sm:w-[90%] md:w-[80%] lg:w-[50%] bg-[#375561] rounded-md">
            <Second />
            <div className="w-full mt-4 gap-3 bg-[#2c444d] rounded-2xl p-3 flex flex-wrap">
              {pass.map((i, index) => (
                <div
                  key={index}
                  className="h-auto w-full sm:w-[45%] md:w-[30%] bg-[#5ba3bd] rounded-lg p-2 flex flex-col relative"
                >
                  <h1 className="text-lg font-extrabold text-white break-all">
                    <a href={i.link} target="/" rel="noreferrer">
                      {i.link}
                    </a>
                  </h1>
                  <h2 className="text-md font-bold text-white break-all">{i.username}</h2>
                  <h3 className="text-sm text-white break-all">{"*".repeat(i.password.length)}</h3>
                  <div className="flex w-full justify-end p-2 absolute bottom-0 right-0 gap-2">
                    <MdEdit
                      className="fill-green-800 size-5 cursor-pointer"
                      onClick={() => {
                        reuse(i.id);
                      }}
                    />
                    <MdDelete
                      className="fill-green-800 size-5 cursor-pointer"
                      onClick={() => {
                        remove(i.id);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

