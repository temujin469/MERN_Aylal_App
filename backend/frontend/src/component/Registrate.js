import React,{useState,useRef} from 'react'
import {FcGlobe} from "react-icons/fc"
import {IoMdCloseCircleOutline} from "react-icons/io"
import {AxiosInstance} from "../config";

function Registrate({setShowRegistrate,setShowLogin}) {

    const [success,setSuccess] = useState(undefined)
    const [fail,setFail] = useState(undefined)

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newUser ={
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value
        }

        try{
            await AxiosInstance.post('/users/registrate',newUser)
            setSuccess(true)
            setFail(false)
            setShowRegistrate(false)
            setShowLogin(true)
        }
        catch(err){
            console.log(err)
            setFail(true)
        }
    }

    return (
        <div className='bg-white rounded-xl p-4 w-72 box-border md:w-96 z-10 absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2'>
                <div className='flex text-2xl font-bold font-sans text-blue-500 justify-center mb-3'>
                    <FcGlobe/> Aylal
                </div>
            <div className='p-4 bg-gray-100 rounded-xl'>
                <div className='flex justify-center'>
                    <p className='font-bold text-blue-500 text-3xl'>БҮРТҮҮЛЭХ</p>
                </div>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                <input className='p-2 m-2 rounded-xl outline-blue-500' placeholder='Хэрэглэгчийн нэр' ref={nameRef}/>
                <input className='p-2 m-2 rounded-xl outline-blue-500' placeholder='Цахим шуудан' ref={emailRef}/>
                <input className='p-2 m-2 rounded-xl outline-blue-500' placeholder='Нууш үг' ref={passwordRef}/>
                <div className='flex justify-end'>
                    <button type='submit' className='rounded-xl p-2 px-4 m-2 bg-blue-500 hover:bg-yellow-400 text-white'>БҮРТҮҮЛЭХ</button>
                </div>
                <div className='flex justify-center'>
                {success && <p className='text-green-500'>you are success</p>}
                {fail && <p className='text-red-500'>нэр эсвэл нууц үг буруу байна!</p>}
                </div>
            </form>
            </div>
            <IoMdCloseCircleOutline className="absolute top-2 right-2 text-blue-500 text-xl hover:text-yellow-400" onClick={()=>setShowRegistrate(false)}/>
        </div>
    )
}

export default Registrate;
