import React,{useRef} from 'react'
import {FcAddImage} from "react-icons/fc"
import {RiCloseCircleLine} from "react-icons/ri"

function ImageUploader({setImg ,img}) {
    const fileInputRef = useRef();

    const handleUpload = (e)=>{
        if(e.target.files[0]){
            const reader = new FileReader()
            reader.onload=()=>{
                setImg(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setImg(null)
        }
    }

    
    return (
        <div className='h-44 bg-gray-200 flex justify-center items-center rounded-lg'>
            <input type="file" 
                className='hidden' 
                ref={fileInputRef}
                accept='image/*'
                onChange={handleUpload}
            />
            {img ? (
                <div className='relative w-full h-full'>
                    <RiCloseCircleLine className='absolute top-1 right-1 z-20 text-yellow-400 text-xl hover:text-blue-500' onClick={()=>setImg(null)}/>
                    <img src={img}  alt="uploaded" className='w-full h-full rounded-lg'/>
                </div>) : (
                <div className='flex justify-center flex-col items-center'>
                    <FcAddImage className='text-gray-400 text-6xl' 
                    onClick={(e)=>{
                        e.preventDefault() 
                        fileInputRef.current.click()
                    }}
                />
                    <p className='text-gray-400'>Гэрэл зураг</p>
                </div>
                ) }
        </div>
    )
}

export default ImageUploader
