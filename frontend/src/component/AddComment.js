import {AxiosInstance} from "../config";
import React,{useState} from 'react'
import { BsFillStarFill} from 'react-icons/bs';
import {BsEmojiSmile} from 'react-icons/bs';
import ImageUploader from './ImageUploader';
function AddComment({currentUser,lat,long,setPins,pins,setNewPlace,setShowLogin}) {
    const [img,setImg] = useState(null)
    const [title,setTitle] = useState(null)
    const [desc,setDesc] = useState(null)
    const [rating,setRating] = useState(0)
    const [hoverRating,setHoverRating] = useState(null)

    const handleSubmit = async(e)=>{
        if(currentUser){
            e.preventDefault()
            const newPin = {
                username:currentUser,
                img,
                title,
                desc,
                rating,
                latitude:lat,
                longitude:long
            }
    
            try{
                const res = await (await AxiosInstance.post('/pins',newPin))
                setNewPlace(null)
                setPins([...pins,res.data])
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            setShowLogin(true)
            setNewPlace(null)
        }
    }

    return (
        <form className=' w-72 max-h-500px overflow-y-scroll' onSubmit={handleSubmit}>
                <ImageUploader setImg={setImg} img={img}/>
            <h2 className='font-bold capitalize mb-3 flex'>
                <input placeholder='Байрлал' className="p-1 rounded outline-none border-b-2 w-full mt-2" onChange={(e)=>setTitle(e.target.value)}/>
            </h2>
            <p className='font-medium mb-4'>
                <textarea className='p-1 rounded w-full outline-none border-b-2' placeholder='Үзэл Бодол' onChange={(e)=>setDesc(e.target.value)}/>
            </p>
            <label className='flex text-gray-800'><BsEmojiSmile/>Үнэлгээ</label>
            <hr/>
            <div className='flex flex-row gap-3 text-3xl mb-4 pt-2'>
                {[...Array(5)].map((star,index)=>{
                    const ratingValue = index+1
                    return(
                        <label key={index}>
                        <input type="radio" name='rating' value={ratingValue}
                                onClick={()=>setRating(ratingValue)}
                                className='hidden'
                        />
                        <BsFillStarFill className={ratingValue <= (rating || hoverRating) ? "text-yellow-400" : "text-gray-200"}
                            onMouseEnter={()=>setHoverRating(ratingValue)}
                            onMouseLeave={()=>setHoverRating(null)}
                            style={{cursor:"pointer"}}
                        />
                        </label>
                    )
                })}
            </div>
            <div className='flex justify-end w-full'>
                <button type='submit' className='bg-yellow-400 p-1 px-4 rounded hover:bg-blue-500 text-white'>Нэмэх</button>
            </div>
        </form>
    )
}

export default AddComment;
