import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import useAuth from '../provider/useAuth';

const socket = io('http://localhost:5000'); // Change to your server URL
const image_Hosting_key = import.meta.env.VITE_IMAGE_UPLOAD;
const image_Hosting_API = `https://api.imgbb.com/1/upload?key=${image_Hosting_key}`;

const Image = () => {
    const { user}=useAuth();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [sharedImages, setSharedImages] = useState([]);
    const endRef = useRef(null);

    useEffect(() => {
        // Fetch existing images
        axios.get('http://localhost:5000/tasks')
            .then(res => setSharedImages(res.data.reverse()));

        // Listen for real-time images
        socket.on('newImage', (data) => {
            setSharedImages(prev => [...prev, data]);
        });

        return () => socket.disconnect();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image) return alert("Please select an image");

        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post(image_Hosting_API, formData);
            const imageUrl = res.data.data.url;

            const task = {
                title: 'Shared image',
                imageUrl,
                userId: user.displayName 
            };

            await axios.post('http://localhost:5000/upload-image', task);
            toast.success("Image uploaded successfully!");
            setImage(null);
            setPreview(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='p-4 max-w-2xl mx-auto'>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="file" onChange={handleFileChange} />
                {preview && <img src={preview} alt="Preview" className="w-40 mt-2 rounded" />}
                <button type="button" onClick={handleUpload} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Upload</button>
            </form>

            <div className="bg-gray-100 p-4 rounded h-[400px] overflow-y-auto border mt-4">
                {sharedImages.map((img) => (
                    <div key={img._id} className="bg-white p-3 mb-3 rounded shadow w-fit max-w-sm">
                        <img src={img.imageUrl} alt="Shared" className="rounded" />
                        <div className="flex justify-between items-center mt-1">
                            <small className="text-gray-500">From user {img.userId}</small>
                            <a href={img.imageUrl} download target="_blank" rel="noreferrer" className="text-blue-600 text-sm underline ml-4">Download</a>
                        </div>
                    </div>
                ))}
                <div ref={endRef} />
            </div>
        </div>
    );
};

export default Image;
