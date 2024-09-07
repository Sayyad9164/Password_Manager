import  { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords =async () => {
    let req = await fetch("http://localhost:8000/")
    let passwords = await req.json();
   console.log(passwords) 
   setPasswordArray(passwords);
    
  }
  
  useEffect(() => {
    getPasswords()
  }, []);

  const copyText = (text) => {
    toast("🦄 Copied to clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showpassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/hide.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hide.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async() => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
      console.log(form);

    // if any such id exist in the data base delete it:
    await fetch("http://localhost:8000/",{ method:"DELETE",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id:form.id}) })


    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    await fetch("http://localhost:8000/",{ method:"POST",headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ ...form, id: uuidv4() }) })
    // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
    setform({ site: "", username: "", password: "" })
    toast("🦄 Password saved!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
    }
    else{
      toast("Error: Password not saved")
    }
    
  };

  const deletePassword = async (id) => {
    console.log("Deleting password with id",id)
    let c = confirm("Do you really want to delete!")
    if(c){
        setPasswordArray(passwordArray.filter(item=>item.id!==id));
    // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    let res =  await fetch("http://localhost:8000/",{ method:"DELETE",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id}) })
     
    
    toast("Password deleted!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
  }

  const editPassword = (id) => {
    console.log("Editing password with id",id)
    setform({...passwordArray.filter(i=>i.id===id)[0], id: id});
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className="mycontainer">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-teal-800">&lt;</span>
          <span>Pass</span>
          <span className="text-green-800">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>

        <div className="text-black flex flex-col p-4 gap-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-800 w-full p-3 py-1"
            type="text"
            name="site"
            id=""
          />

          <div className="flex w-full justify-between gap-10">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-800 w-full p-3 py-1 "
              type="text"
              name="username"
              id=""
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-800 w-full p-3 py-1"
                type="password"
                name="password"
                id=""
              />

              <span
                className="absolute right-1 top-1.5 cursor-pointer"
                onClick={showpassword}
              >
                <img ref={ref} className="w-6" src="icons/eye.png" alt="" />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 border border-green-950 bg-green-600 hover:bg-green-700 rounded-full w-fit px-6 py-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save 
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl text-center py-4">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-8">
              <thead className="bg-green-800">
                <tr>
                  <th className="py-2 border border-white">Site</th>
                  <th className="py-2 border border-white">Username</th>
                  <th className="py-2 border border-white">Password</th>
                  <th className="py-2 border border-white">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* Site */}
                      <td className="flex justify-center items-center text-center py-2 border  border-white gap-1">
                        {/* <a href={item.site} target="_blank">
                          {item.site}
                        </a> */}
                        <span>{item.site}</span>
                        <div
                          className="lordiconcopy cursor-pointer size-5"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>

                      {/* Username */}
                      <td className="text-center py-2 border border-white">
                        <div className=" flex justify-center items-center gap-1">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-5 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      {/* Password */}
                      <td className=" text-center py-2  border border-white">
                        <div className="flex justify-center items-center gap-1">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-5 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className=" text-center py-2  border border-white">
                        <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{"width":"25px","height":"25px"}}
                          ></lord-icon>
                        </span>

                        <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{"width":"25px","height":"25px"}}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
