import React from 'react'
import { BsFillStarFill} from 'react-icons/bs';
import {BsEmojiSmile} from 'react-icons/bs';
import {GrLocation} from 'react-icons/gr';
import {BiNotepad} from 'react-icons/bi'
import {BiEditAlt} from 'react-icons/bi'
import {BsTrashFill} from 'react-icons/bs'
import {AxiosInstance} from "../config";

function Comment({pin,currentUser}) {

    const handleDelete = async(id)=>{
        try {
            await AxiosInstance.delete(`/pins/delete/${id}`)
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className='rounded-lg max-w-xs relative'>
            <img className='w-full object-cover h-52 mb-4 rounded' alt="uploaded" src={pin.img}/>
            <h2 className='text-xl font-bold capitalize mb-3 flex'><GrLocation/>{pin.title}</h2>
            <label className='flex'><BiEditAlt/>Үзэл Бодол</label>
            <hr/>
            <p className='font-medium mb-4 pt-2'>{pin.desc}</p>
            <label className='flex'><BsEmojiSmile/>Үнэлгээ</label>
            <hr/>
            <div className='flex flex-row text-amber-400 gap-3 text-xl mb-4 pt-2'>
                {[...Array(5)].map((star,index)=>{
                    const ratingValue = index+1
                    return(
                        <label key={index}>
                        <input type="radio" name='rating' value={ratingValue} className='hidden'/>
                        <BsFillStarFill className={ratingValue <= pin.rating ? "text-yellow-400" : "text-gray-200"}/>
                        </label>
                    )
                })}
            </div>
            <label className='flex'><BiNotepad/>Нийтэлсэн</label>
            <hr/>
            <div className='flex justify-end gap-10 pt-2'>
                <div>
                    <p className='text-lg font-medium'>{pin.username}</p>
                    <p>{pin.createdAt}</p>
                </div>
                <img  alt="userPhoto" className='w-12 h-12 rounded' src='https://images.unsplash.com/photo-1641621393945-881745ee9978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8aG1lbnZRaFVteE18fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'/>
            </div>
            {pin.username === currentUser && (
                    <span className=' bg-white text-red-500 px-3 p-2 rounded-md absolute top-3 right-3 hover:bg-red-600 hover:text-white'>
                        <BsTrashFill onClick={()=>handleDelete(pin._id)}/>
                    </span>
            )}
            
        </div>
    )
}

export default Comment
