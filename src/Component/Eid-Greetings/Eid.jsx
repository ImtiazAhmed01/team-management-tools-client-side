// import React, { useState } from 'react';
// import eidSound from "../../assets/eid-mubarak-201252.mp3";
// import gif1 from "../../assets/fjdfkljdkfjk.gif"
// import gif2 from "../../assets/Green and Gold Islamic Decoration Eid Mubarak Mobile Video.gif"
// import gif3 from "../../assets/Green Gold Animated Eid Mubarak Instagram Post.gif"
// import confetti from 'canvas-confetti';

// const greetings=[
//     "Eid Mubarak!",
//   "May Allah’s blessings be with you this Eid!",
//   "Wishing you joy and peace this Eid!",
//   "May your Eid be full of love and light!",
// ];
// const gifs=[gif1,gif2,gif3];

// const Eid = ({setShowIntro}) => {
//     const [playing,setPlaying]=useState(false);
//     const[selectedGreeting,setSelectedGreeting]=useState("");
//     const [selectedGif,setSelectedGif]=useState("");
//     const handleClick=()=>{
//         const audio=new Audio(eidSound);
//         audio.play();
//         setTimeout(() => {
//           audio.pause();
//           audio.currentTime = 0;
//         }, 10000);
//         setPlaying(true);
//         const randomGreeting=greetings[Math.floor(Math.random()*greetings.length)] ;
//         const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
//         setSelectedGreeting(randomGreeting);
//         setSelectedGif(randomGif);

//         const duration = 10 * 1000;
//     const animationEnd = Date.now() + duration;
//     const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

//     const randomInRange = (min, max) => Math.random() * (max - min) + min;

//     const interval = setInterval(() => {
//       const timeLeft = animationEnd - Date.now();
//       if (timeLeft <= 0) return clearInterval(interval);

//       const particleCount = 50 * (timeLeft / duration);
//       confetti({
//         ...defaults,
//         particleCount,
//         origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
//       });
//       confetti({
//         ...defaults,
//         particleCount,
//         origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
//       });
//     }, 250);

//     setTimeout(() => {
//       setShowIntro(false);
//       }, 10000);

//     }
//     return (
//         <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white text-center">
//         {!playing ? (
//           <button
//             onClick={handleClick}
//             className="px-6 py-3 bg-yellow-400 text-black font-bold text-lg rounded-xl animate-bounce cursor-pointer shadow-xl"
//           >
//             Tap to Get Eid Greeting 
//           </button>
//         ) : (
//           <div className="flex flex-col items-center gap-4">
//              <h1 className="text-2xl font-bold">{selectedGreeting}</h1>
//             <img
//               src={selectedGif}
//               alt="Eid Greeting"
//               className="w-96 h-96 object-contain"
//             />
           
//           </div>
//         )}
//       </div>
//     );
// };

// export default Eid;