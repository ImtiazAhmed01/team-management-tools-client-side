import axios from 'axios';
import { h1 } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import { BsSendFill } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import img1 from '../../assets/peace-sign-human-hand-gesture-png.png'

const ChatPage = () => {
    const [users, setUsers] = useState()
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => setUsers(res.data))
    }, [])

    return (
        <div className=' flex'>
            <div className='w-[20%] bg-gray-200 border-r-[1px] border-zinc-400 p-5 space-y-4'>
                <h1 className='text-2xl font-semiboldbold'>Messages <span className='text-xl  text-primary'>(12)</span></h1>
                <input type="text" placeholder='Search here..' className='bg-white px-5 w-full  py-2 rounded-3xl ' />
                <div className=' space-y-1'>
                    {
                        users?.map((user, id) =>
                            <div key={id} className='bg-zinc-100 hover:bg-primary hover:text-white cursor-pointer p-3 rounded-xl flex items-center gap-2'>
                                <div className="avatar avatar-online">
                                    <div className="w-10 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <div>
                                    <h1>{user.name}</h1>
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
            <div className='w-[80%] bg-gray-100 flex flex-col justify-between'>
                <div className='bg-zinc-200 p-5 w-full flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <div className="avatar avatar-online">
                            <div className="w-16 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <div>
                            <h1 className='text-xl'>Leanne Graham</h1>
                            <h1 className='text-green-600 font-semibold'>online</h1>
                        </div>
                    </div>
                    <HiDotsVertical className='text-xl cursor-pointer' />
                </div>
                <div className='w-full h-full  flex justify-center flex-col items-center'>
                    <img src={img1} alt="" />
                    <h1 className='text-xl text-gray-400'>No Messages yet</h1>
                </div>
                <div className='bg-zinc-200  flex justify-between items-center p-5'>

                    <div className='flex  gap-5 items-center w-full'>
                        <input type="text" placeholder='type' className='bg-white focus:outline-0 max-w-6xl w-full p-3 rounded-3xl ' />
                        <button className='bg-primary p-3 cursor-pointer rounded-4xl flex justify-center items-center'>
                            <BsSendFill className='text-white text-2xl ' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;