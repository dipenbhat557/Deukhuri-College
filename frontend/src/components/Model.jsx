import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

const Model = ({ setOpenModel }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const previousComments = [
    {
      name: "Dipen",
      comment: "Hello",
    },
    {
      name: "Roshan",
      comment: "Nothing",
    },
    {
      name: "Khem",
      comment: "I'm over here",
    },
  ];

  const onSubmit = (name, comment) => {
    // Define the data you want to save
    const postData = {
      title: "name",
      content: "comment",
      status: "publish", // Set post status to publish
    };

    // Make a POST request to create a new post
    fetch("https://api.deukhurimultiplecampus.edu.np/wp-json/wp/v2/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required (e.g., authentication headers)
      },
      body: JSON.stringify(postData), // Convert data to JSON string
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        return response.json(); // Parse response JSON
      })
      .then((data) => {
        console.log("Post created successfully:", data);
        // Handle successful response (data contains information about the created post)
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        // Handle error
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name, comment);
    setName("");
    setComment("");
  };

  return (
    <div className="rounded-md h-auto flex flex-col z-10 bg-white pb-6">
      <div className="p-2 flex  bg-red-900 rounded-t-md">
        <p className="text-center w-[90%] text-[25px] text-slate-300">
          Response Report
        </p>
        <RxCrossCircled
          className=" w-[10%] text-white text-4xl cursor-pointer"
          onClick={() => setOpenModel(false)}
        />
      </div>
      <div className="w-full h-auto flex flex-col gap-2">
        <p className="text-[18px] w-[87%] mx-auto mt-3 font-medium ">
          Leave a review
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-full justify-around sm:flex-row items-center"
        >
          <div className="flex flex-col">
            <p className="text-[14px]">Name *</p>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Your Name"
              className="placeholder:text-[12px] border rounded-md p-2 px-6 my-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <p className="text-[14px]">Message *</p>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Leave a message"
              className="placeholder:text-[12px] border rounded-md p-3 my-2"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-900 text-[14px] text-white py-1 px-6 rounded"
          >
            Send
          </button>
        </form>

        <p className="text-[18px] w-[87%] mx-auto mt-3 font-medium ">
          Comments
        </p>
        <ul>
          {previousComments.map((item, index) => {
            return (
              <li
                key={index}
                className="mb-2 border-b w-[85%] mx-auto p-4 flex items-center justify-around"
              >
                <p className="w-[20%] text-[14px] text-slate-700">2073/02/03</p>
                <p className="w-[25%] text-[14px] text-slate-700">
                  {item?.name}
                </p>
                <p className="w-[55%] text-[14px] text-slate-700">
                  {item?.comment}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Model;
