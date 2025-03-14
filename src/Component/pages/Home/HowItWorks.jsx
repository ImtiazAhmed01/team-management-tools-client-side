import React from "react";

const HowItWorks = () => {
  return (
    <div className="lg:w-8/12 md:w-11/12 w-10/12 mx-auto mt-10">
      <h1 className="font-bold text-center md:text-4xl text-3xl my-12">How It Works</h1>
      <div className="space-y-10 md:space-y-0 text-center md:text-left">
        {/* div 1 */}
        <div className="flex md:flex-row flex-col lg:justify-between justify-center lg:gap-0 gap-8 items-center">
          <div className="lg:px-12 order-1 lg:w-full md:w-1/2 md:space-y-0 space-y-2">
            <h4 className="font-bold text-2xl">Create Tasks & Assign Work</h4>
            <p>
              Easily create tasks, set priorities, and assign them to team
              members. Keep everything organized with due dates, labels, and
              descriptions so everyone knows what to do and when.
            </p>
          </div>
          <div className="order-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKLSzWlgFnAaxRdNCyXgzbr_jagDyYUsMo2eOyTvVibx2mOWjmgmBNya5UpVK6R1GS68A&usqp=CAU"
              className="object-cover float-right"
              alt=""
            />
          </div>
        </div>
        {/* div 2 */}
        <div className="flex md:flex-row flex-col lg:justify-between justify-center md:gap-0 gap-8 items-center">
          <div className="md:w-1/2 md:order-1 order-2">
            <img
              src="https://img.freepik.com/free-vector/my-answer-concept-illustration_114360-4094.jpg?semt=ais_hybrid"
              className="w-[80%] mx-auto"
              alt=""
            />
          </div>
          <div className="lg:px-12 lg:order-2 order-1 lg:w-full md:w-1/2 md:space-y-0 space-y-2">
            <h4 className="font-bold text-2xl">Collaborate via Chat</h4>
            <p>
              Communicate instantly with real-time chat. Share updates, ask
              questions, and make quick decisions without switching between
              multiple apps.
            </p>
          </div>
        </div>
        {/* div 3 */}
        <div className="flex md:flex-row flex-col lg:justify-between justify-center items-center">
          <div className="lg:px-12 order-1 md:px-8 md:space-y-0 space-y-2">
            <h4 className="font-bold text-2xl">Track Progress & Deadlines</h4>
            <p>
              Monitor task status, deadlines, and overall project progress in
              one place. Visual indicators and progress bars help teams stay on
              track and meet goals efficiently.
            </p>
          </div>
          <div className="lg:w-1/2 order-2">
            <img
              src="https://img.freepik.com/free-vector/flat-design-time-management-concept_23-2148813012.jpg?ga=GA1.1.1566276285.1741862112&semt=ais_authors_boost"
              className=""
              alt=""
            />
          </div>
        </div>
        {/* div 4 */}
        <div className="flex md:flex-row flex-col lg:justify-between lg:gap-0 gap-8 justify-center items-center">
          <div className="lg:w-1/2 md:w-[40%] md:order-1 order-2">
            <img
              src="https://img.freepik.com/free-vector/postponed-concept-illustrated-with-person-looking-phone_23-2148487553.jpg?ga=GA1.1.1566276285.1741862112&semt=ais_authors_boost"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="lg:px-12 lg:order-2 order-1 lg:w-full md:w-1/2 md:space-y-0 space-y-2">
            <h4 className="font-bold text-2xl">Stay Notified & Productive</h4>
            <p>
              Get real-time notifications for task updates, mentions, and
              deadlines. Stay informed without unnecessary distractions,
              ensuring smooth collaboration and increased productivity. Would
              you like me to refine any part further?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
