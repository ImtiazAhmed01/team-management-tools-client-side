import React from "react";
import plannig from "../../../assets/planning.png";
import chat from "../../../assets/chat.png";
import img from "../../../assets/images.png";
import role from "../../../assets/access-control.png";

const OurServices = () => {
  return (
    <div className="w-11/12 mx-auto mt-8">
      <h1 className="font-bold text-center text-3xl text-gray-900 dark:text-white">
        Here Is What We Offer
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {/* card 1 */}
        <div className="bg-blue-50 dark:bg-gray-900 rounded-md py-8 px-4 text-center space-y-2 transition-colors duration-300">
          <img src={plannig} className="w-24 mx-auto" alt="Task Management" />
          <h4 className="font-bold text-xl text-gray-900 dark:text-white">Task Management</h4>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Efficiently organize, prioritize, and track your team's tasks and
            projects with this feature. Task management allows you to assign
            tasks, set deadlines, and monitor progress, ensuring projects stay
            on track and everyone knows their responsibilities.
          </p>
        </div>
        {/* card 2 */}
        <div className="bg-blue-50 dark:bg-gray-900 rounded-md py-8 px-4 text-center space-y-2 transition-colors duration-300">
          <img src={chat} className="w-24 mx-auto" alt="Real-Time Chat" />
          <h4 className="font-bold text-xl text-gray-900 dark:text-white">Real-Time Chat</h4>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Stay connected and communicate instantly with your team or clients.
            The real-time chat feature provides seamless messaging, allowing for
            quick discussions, immediate feedback, and faster decision-making.
          </p>
        </div>
        {/* card 3 */}
        <div className="bg-blue-50 dark:bg-gray-900 rounded-md py-8 px-4 text-center space-y-2 transition-colors duration-300">
          <img src={img} className="w-24 mx-auto" alt="Image Sharing" />
          <h4 className="font-bold text-xl text-gray-900 dark:text-white">Image Sharing</h4>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Easily share images within your team or with external stakeholders.
            The image-sharing feature enables smooth collaboration by making it
            simple to upload, and organize files, all within a secure
            environment.
          </p>
        </div>
        {/* card 4 */}
        <div className="bg-blue-50 dark:bg-gray-900 rounded-md py-8 px-4 text-center space-y-2 transition-colors duration-300">
          <img src={role} className="w-24 mx-auto" alt="Role-Based Access" />
          <h4 className="font-bold text-xl text-gray-900 dark:text-white">Role-Based Access</h4>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Control who has access to what within your system. With role-based
            access, you can define user permissions based on their role,
            ensuring that sensitive information and critical functions are only
            accessible to the right people.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurServices;