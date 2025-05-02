import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../provider/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const socket = io("http://localhost:5000");
// const image_Hosting_key = import.meta.env.VITE_IMAGE_UPLOAD;
// const image_Hosting_API = `https://api.imgbb.com/1/upload?key=${image_Hosting_key}`;
const image_Hosting_API = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_ImgBB_Key
}`;

const fetchImages = async () => {
  const res = await axios.get("http://localhost:5000/tasks");
  return res.data.reverse();
};

const Image = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const endRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: sharedImages = [] } = useQuery({
    queryKey: ["sharedImages"],
    queryFn: fetchImages,
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post(image_Hosting_API, formData);
      const imageUrl = res.data.data.url;

      const task = {
        title: "Shared image",
        imageUrl,
        userId: user.displayName,
      };

      await axios.post("http://localhost:5000/upload-image", task);
      return imageUrl;
    },
    onSuccess: (imageUrl) => {
      toast.success("Image uploaded successfully!");
      setImage(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      queryClient.invalidateQueries(["sharedImages"]);

      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Upload failed!");
    },
  });

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("newImage", (data) => {
      queryClient.setQueryData(["sharedImages"], (old = []) => [...old, data]);
    });

    return () => {
      socket.off("newImage");
    };
  }, [queryClient]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!image) return toast.warn("Please select an image");
    uploadMutation.mutate();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Upload Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* File Input - Enhanced */}
          <div className="flex items-center gap-4">
            <label className="flex-1">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={uploadMutation.isLoading}
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 dark:file:bg-gray-700 file:text-blue-700 dark:file:text-gray-300
                      hover:file:bg-blue-100 dark:hover:file:bg-gray-600
                      cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>

            {/* Upload Button - Enhanced */}
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploadMutation.isLoading || !preview}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                uploadMutation.isLoading
                  ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                  : preview
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              {uploadMutation.isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload"
              )}
            </button>
          </div>

          {/* Preview - Enhanced */}
          {preview && (
            <div className="mt-4 flex flex-col items-start">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preview:
              </p>
              <img
                src={preview}
                alt="Preview"
                className="max-h-60 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
              />
            </div>
          )}
        </form>
      </div>

      {/* Gallery Section - Enhanced */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-inner p-6 h-[400px] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          Shared Images ({sharedImages.length})
        </h3>

        {sharedImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>No images shared yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sharedImages.map((img) => (
              <div
                key={img._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <img
                  src={img.imageUrl}
                  alt="Shared"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <small className="text-gray-500 dark:text-gray-400 text-xs">
                      From user {img.userId}
                    </small>
                  </div>
                  <a
                    href={img.imageUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default Image;
