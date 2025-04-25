import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import img1 from "../../assets/images/3e44c2c0-a10a-40ae-bd38-1a94b33248f3.jfif"
import img2 from "../../assets/images/f4cef936-dc79-4f18-b3ee-d56843d8c905.jfif"
import img3 from "../../assets/images/1d95d2a4-306b-4f3a-98e5-bfbda6aaf1c8.jfif"
import img4 from "../../assets/images/9a5f06a5-a7c9-41f6-9e21-0fb5ff8e5084.jfif"

const founders = [
    {
        name: "Imtiaz Ahmed ",
        role: "Team Leader",
        img: img1,
    },
    {
        name: "Sias Opu",
        role: "Team Member",
        img: img2,
    },
    {
        name: "Rahima Aktar",
        role: "Team Member",
        img: img3,
    },
    {
        name: "Chrabon Dey Sarker",
        role: "Team Member",
        img: img4,
    },

];

const About = () => {
    return (
        <div className="px-4 md:px-16 py-10 text-gray-900 bg-white">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="mb-12">
                    <span className="text-sm font-bold text-[#006dc7] uppercase rounded-full px-5 py-2 bg-blue-300">About</span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-3">
                        Team of CollabNest <br /> Passion & Dedication In Action
                    </h1>
                    <p className="text-lg mt-5 max-w-3xl">
                        At CollabNest, our team thrives on passion, persistence, and teamwork. Behind every feature and innovation lies the dedication of individuals who believe in building something meaningful. With a shared vision and relentless hard work, we turn ideas into impact and ensure every challenge becomes an opportunity to grow together.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-end items-center mb-16">
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
                        <img src={img2} alt="team" className="rounded-lg shadow-lg w-72  object-cover" />
                        <img src={img1} alt="team" className="rounded-lg shadow-lg w-72 h-72 object-cover" />
                        <img
                            src={img3}
                            alt="team"
                            className="rounded-lg shadow-lg w-80 h-48 object-cover col-span-2 mx-auto"
                        />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-3xl font-bold text-center mb-2">Meet The Team</h2>
                <p className="text-center text-lg mb-10">
                    Meet the visionaries behind CollabNest. Learn about their inspiration.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
                    {founders.map((founder, index) => (
                        <div
                            key={index}
                            className="rounded-xl p-6 w-56  text-center shadow-md hover:shadow-lg transition bg-white"
                        >
                            <img
                                src={founder.img}
                                alt={founder.name}
                                className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
                            />
                            <h3 className="font-bold text-xl">{founder.name}</h3>
                            <p className="text-gray-500 mb-3">{founder.role}</p>
                            <div className="flex justify-center gap-4 text-xl text-blue-600">
                                <FaFacebook />
                                <FaInstagram className="text-pink-600" />
                                <FaLinkedin className="text-blue-800" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
