import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/inertia-react";
import { useState,useRef, useEffect } from "react";

const PopupComment = ({open,onClose,idpost,comments}) => {

    const {data,setData,post:store, processing, errors, reset,delete:destroy} = useForm({
        post_id: '',
        body: ''
    });

    // console.log("Popupcomment : ", comments,'data : ',data);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    useEffect(() => {
        setData({
            post_id: idpost
        });
    }, [idpost]);

    const handleSubmit = (e) => {
        e.preventDefault();

        store(route('add.comment'), {
            preserveScroll: true,
            onSuccess: reset('body')
        });
    }

    // Create a ref for the bottom element in the modal
    const bottomRef = useRef(null);
    useEffect(() => {
        // When the modal is opened, scroll to the bottom element
        if (open) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [open]);

    return (
        <>
            {
            open ?
            <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen z-50">
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">

                    <div className="bg-white border rounded-xl p-3" >
                        <div className="rounded-xl">
                            <div className="p-3 shadow-md flex justify-between items-center">
                                <span className="text-lg font-medium font-bold">Comments</span>
                                <button onClick={onClose}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <div className="overflow-y-auto h-96 w-96">
                                {
                                    comments.length > 0 ?
                                    comments.map((comment,i) => {

                                        let date = new Date(Date.parse(comment.created_at));
                                        date.setHours(date.getHours() + 7);

                                        let createdAt = new Date(date); // replace this with the actual date object

                                        // Get the current timestamp in milliseconds
                                        let now = Date.now();

                                        // Calculate the difference between the current time and the time represented by the createdAt date object, in milliseconds
                                        let timeDifference = now - createdAt.getTime();

                                        // Convert the time difference from milliseconds to seconds
                                        timeDifference = timeDifference / 1000;

                                        // Use the time difference to determine the appropriate relative time string
                                        let relativeTimeString;
                                        if (timeDifference < 60) {
                                        relativeTimeString = "just now";
                                        } else if (timeDifference < 3600) {
                                        relativeTimeString = Math.floor(timeDifference / 60) + " minutes ago";
                                        } else if (timeDifference < 86400) {
                                        relativeTimeString = Math.floor(timeDifference / 3600) + " hours ago";
                                        } else if (timeDifference < 604800) {
                                        relativeTimeString = Math.floor(timeDifference / 86400) + " days ago";
                                        } else {
                                        relativeTimeString = "more than a week ago";
                                        }

                                        return (
                                            <>
                                                <div className="flex items-center mt-4 gap-3" key={i}>
                                                    <img src={comment.profile_picture ? `../storage/${comment.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-12 w-12 rounded-full"/>
                                                    <div className="w-64">
                                                        <span className="text-gray-400 text-sm font-bold mt-2">{comment.username}</span>
                                                        <div className="p-3 border rounded-lg shadow-md bg-slate-50">
                                                            <span className="text-sm">{comment.body}</span>
                                                        </div>
                                                        <span className="text-gray-400 text-xs flex justify-end mt-1">{relativeTimeString}</span>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    :
                                    <>
                                        <div className="w-full h-full flex justify-center items-center">
                                            <span className="text-md text-gray-400">No comments yet! </span>
                                        </div>
                                    </>
                                }
                                <div ref={bottomRef} />
                            </div>
                            <div className="w-full">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex gap-2 p-3">
                                        <input type="text" name="body" value={data.body} className={'col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-gray-300 '} placeholder="Type your comment" onChange={handleChange}/>
                                        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Post</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            :
            null
            }
        </>

    )
}

export default PopupComment;
