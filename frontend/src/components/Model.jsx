import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import useFetch from "./UseFetch";

const Model = ({ setOpenModel }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.deukhurimultiplecampus.edu.np/wp-json/wp/v2/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when fetchTrigger changes
    fetchData();
  }, [fetchTrigger]);

  const onSubmit = async (name, comment) => {
    try {
      // Fetch JWT token
      const credentials = {
        username: "deukhuricollege557",
        password: "Deukhuri@557",
      };

      const response = await fetch(
        "https://api.deukhurimultiplecampus.edu.np/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const tokenResponse = await response.json();
      const tokenData = tokenResponse.data;
      const token = tokenData.token;

      // Make a POST request to create a new post
      const postData = {
        title: name,
        content: comment,
        status: "publish",
      };

      const postResponse = await fetch(
        "https://api.deukhurimultiplecampus.edu.np/wp-json/wp/v2/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error("Failed to create post");
      }

      const postDataResponse = await postResponse.json();
      setFetchTrigger(!fetchTrigger);
      console.log("Post created successfully:", postDataResponse);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name, comment);
    setName("");
    setComment("");
  };

  return (
    <div className="rounded-md h-auto flex flex-col z-10 bg-white pb-6">
      <div className="p-2 flex bg-red-900 rounded-t-md">
        <p className="text-center w-[90%] text-[25px] text-slate-300">
          Response Report
        </p>
        <RxCrossCircled
          className="w-[10%] text-white text-4xl cursor-pointer"
          onClick={() => setOpenModel(false)}
        />
      </div>
      <div className="w-full h-auto flex flex-col gap-2">
        <p className="text-[18px] w-[87%] mx-auto mt-3 font-medium">
          Leave a review
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-full justify-around sm:flex-row items-center"
        >
          <div className="flex flex-col">
            <p className="text-[14px] text-center sm:text-left">Name *</p>
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
            <p className="text-[14px] text-center sm:text-left">Message *</p>
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

        <p className="text-[18px] w-[87%] mx-auto mt-3 font-medium">Comments</p>
        <ul className="max-h-[600px] overflow-y-scroll">
          {comments?.map((item, index) => (
            <li
              key={index}
              className="mb-2 border-b w-[85%] mx-auto p-4 flex items-center justify-around"
            >
              <p className="w-[18%] text-[14px] text-slate-700">
                {item?.date?.substring(0, 10)}
              </p>
              <p className="w-[23%] text-[14px] text-slate-700">
                {item?.title?.rendered}
              </p>
              <p
                dangerouslySetInnerHTML={{ __html: item?.content?.rendered }}
                className="w-[52%] text-[14px] text-slate-700"
              ></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Model;
