import { TiLocationArrowOutline } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../components/axiosinstance";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const [data, setDate] = useState()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const commentInput = useRef()
    const navigate = useNavigate()

    const token = localStorage.getItem("access_token")

    const getAllPosts = async () => {
        const response = await axiosInstance.get('/posts')
        console.log('post data', response.data);
        setDate(response.data)

    }
    useEffect(() => {
        if (!token) return alert("please login your account")
        getAllPosts()
    }, [])


    // upload post
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!token) {
                alert("please log in your account")
                return
            } 
            const response = await axiosInstance.post("/creatpost", {
                title,
                content,
            })
            console.log(response.data);
        } catch (error) {
            console.log("creat post fiels ==>", error.response ? error.response.data : error.message);
            
        }
        setTitle("");
        setContent("");
        getAllPosts()
    };

    // like post


    const likePost = async (id) => {
        console.log(id);

        try {
            const response = await axiosInstance.post('/like', {
                postId: id,
            })
            console.log("liked post", response.data);
            getAllPosts();

        } catch (error) {

            console.log("like post error==>", error.message);

        }
    }

    // comment post

    const commentPost = async (id) => {
        try {
            const response = await axiosInstance.post('/comment', {
                text: commentInput.current.value,
                postId: id,
            },
            )
            console.log("comment submit", response.data);
            getAllPosts();
        } catch (error) {
            console.log("like post error==>", error.message);
        }

        commentInput.current.value = " "
    }

    return (
        <>
            <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg mb-12 ">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Upload post</h2>

                <form onSubmit={handleSubmit}>
                    {/* Title Field */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter the title of your post"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Content Field */}
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                            Post Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your post content here"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
                        >
                            Upload Post
                        </button>
                    </div>
                </form>
            </div>

            {/* posts rendering */}

            {data && data?.map((item) => {
                return <div key={item._id} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-6">

                    {/* Post Header */}
                    <div className="flex items-center space-x-3 mb-4">
                        <div>
                            <p className="font-semibold text-gray-800">{item.user.username}</p>
                            <p className="text-gray-500 text-sm">{item.createdAt}</p>

                        </div>
                    </div>

                    {/* Post Content */}
                    <h2 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h2>
                    <p className="text-gray-600 text-base mb-6">
                        {item.content}
                    </p>
                    <div className="mb-2 border p-5 rounded-lg">
                        <h1 className="text-xl font-semibold ms-3 mb-2">Comments</h1>
                        {item.comments.map((comments, index) => {
                            return <div key={index} className="mb-3 bg-gray-50 p-4 rounded-xl">
                                <p className="font-semibold">{comments.user.username}</p>
                                <p>{comments.text}</p>
                            </div>
                        })}
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            commentPost(item._id)
                        }} className="relative" >
                            <input type="text" placeholder="Write a comment" name="" id="" className="mt-1 input input-bordered w-full max-w-xsinput-md" ref={commentInput} />
                            <button className="absolute start-[550px] top-4 text-2xl"> <TiLocationArrowOutline /> </button>
                        </form>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center space-x-4 relative mt-5" >
                        <div className="absolute end-2 text-sm">    <span>{item.comments.length} Comments</span>
                            <span className="ml-4">{item.like.length} Likes</span>
                        </div>
                        <button onClick={() => { likePost(item._id) }} className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11V5a7 7 0 0114 0v6" />
                            </svg>
                            <span>Like</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10M7 12h10m-7 5h7" />
                            </svg>
                            <span>Comment</span>
                        </button>
                    </div>
                </div>
            })}
        </>
    )
}

export default Home