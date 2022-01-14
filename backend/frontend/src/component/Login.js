import React,{useState,useRef} from 'react'
import {FcGlobe} from "react-icons/fc"
import {IoMdCloseCircleOutline} from "react-icons/io"
import {AxiosInstance} from "../config";

function Login({handleToggle,myLocalStorage,setCurrentUser,setShowLogin,setShowRegistrate}) {

    const [fail,setFail] = useState(undefined)

    const nameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newUser ={
            username:nameRef.current.value,
            password:passwordRef.current.value
        }

        try{
            const res = await AxiosInstance.post('/users/login',newUser)
            myLocalStorage.setItem("user",res.data.username)
            setCurrentUser(res.data.username)
            setShowLogin(false)
            setFail(false)
        }
        catch(err){
            console.log(err)
            setFail(true)
        }
    }

    return (
        <div className='bg-white rounded-xl p-4 w-72 box-border z-10 absolute right-1/2 md:w-96 bottom-1/2 translate-x-1/2 translate-y-1/2'>
            <div className='flex justify-center'>
                <div className='flex text-2xl font-bold font-sans text-blue-500 my-2 mb-4'>
                    <FcGlobe/> Aylal
                </div>
            </div>
            <div className='p-3 rounded-xl bg-gray-100'>
                <div className='flex justify-center p-2'>
                    <p className='text-blue-500 text-3xl font-bold uppercase'>Нэвтрэх</p>
                </div>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                <input className='p-2 m-2 rounded-xl outline-blue-500' placeholder='Хэрэглэгчийн нэр' ref={nameRef}/>
                <input className='p-2 m-2 rounded-xl outline-blue-500' placeholder='Нууш үг' ref={passwordRef}/>
                <div className='flex justify-between items-center'>
                    <p onClick={()=>handleToggle(setShowRegistrate)} className='underline text-blue-500 hover:text-blue-600'>Бүртгүүлэх</p>
                    <button type='submit' className='rounded-xl p-2 px-4 m-2 bg-blue-500 text-white hover:bg-yellow-400'>Нэвтрэх</button>
                </div>
                <div className='flex justify-center'>
                {fail && <p className='text-red-500'>нэр эсвэл нууц үг буруу байна!</p>}
                </div>
            </form>
            </div>
            <IoMdCloseCircleOutline className="absolute top-2 right-2 text-blue-700 text-xl hover:text-yellow-400" onClick={()=>setShowLogin(false)}/>
        </div>
    )
}

export default Login;
