import { Link } from "@inertiajs/inertia-react";
import React, {useState, useEffect} from "react";
import UserList from "./UserList";

const BtnNotif = ({notifications}) => {

    const [open, setOpen] = useState(false);

    console.log('btnnotif : ', notifications);

    const handleButton = () => {
        if(open){
            setOpen(false);
        }
        else if(!open){
            setOpen(true);
        }
    }

    return (
        <>
        <div className="flex flex-col">
            <button className="btn btn-ghost btn-circle" onClick={handleButton}>
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    {
                        notifications.length > 0 ? <span className="badge badge-xs badge-secondary indicator-item"></span> : null
                    }
                </div>
            </button>

            {
                open ?
                <div className="relative inline-block">
                    <div className="absolute bg-white right-3 rounded shadow-md w-72 flex-col p-2">
                        <div className="overflow-y-auto max-h-96">

                            <div className="p-3 shadow-sm flex justify-between items-center">
                                <span>Today notifiactions ({notifications.length})</span>
                            </div>

                            {notifications.length > 0 ?
                                notifications.map((notif, i) => {
                                    let date = new Date(Date.parse(notif.created_at));
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
                                        relativeTimeString = "now";
                                        } else if (timeDifference < 3600) {
                                        relativeTimeString = Math.floor(timeDifference / 60) + "m";
                                        } else if (timeDifference < 86400) {
                                        relativeTimeString = Math.floor(timeDifference / 3600) + "h";
                                        } else if (timeDifference < 604800) {
                                        relativeTimeString = Math.floor(timeDifference / 86400) + "d";
                                        } else {
                                        relativeTimeString = "week ago";
                                        }

                                    return (
                                        <>
                                            <Link href={`/profile/${notif.username}`}>
                                        {
                                            notif.type === 'follow' ?
                                                    <div className="w-full">
                                                        <ul role="list" className="p-2 divide-y divide-slate-200">
                                                            <li className="flex py-4 first:pt-0 last:pb-0 items-center mt-2 grid grid-cols-6">
                                                                <img src={notif.profile_picture ? `../storage/${notif.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-10 w-10 rounded-full col-span-1"/>
                                                                <div className="mx-3 overflow-hidden flex flex-col text-sm col-span-5">
                                                                    <span>
                                                                        <span className="font-bold">{notif.username}</span> started following you. <span className="text-gray-400">{relativeTimeString}</span>
                                                                    </span>
                                                                    {/* <span className="flex justify-end text-xs text-gray-400">{notif.created_at}</span> */}
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                            :
                                            notif.type === 'post' ?
                                            <div className="w-full">
                                                    <ul role="list" className="p-2 divide-y divide-slate-200">
                                                        <li className="flex py-4 first:pt-0 last:pb-0 items-center mt-2 grid grid-cols-6">
                                                            <img src={notif.profile_picture ? `../storage/${notif.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-10 w-10 rounded-full col-span-1"/>
                                                            <div className="overflow-hidden flex flex-col text-sm gap-2 col-span-4 mx-3">
                                                                <span>
                                                                    <span className="font-bold">{notif.username}</span> posted new activity in <span className="font-bold">{notif.group_name}</span>. <span className="text-gray-400">{relativeTimeString}</span>
                                                                </span>
                                                                {/* <span className="flex justify-end text-xs text-gray-400">{notif.created_at}</span> */}
                                                            </div>
                                                            <img src={`../storage/${notif.activity_picture}`} alt="" className="h-10 w-10 rounded-md col-span-1"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            :
                                            notif.type === 'like' ?
                                                <div className="w-full">
                                                    <ul role="list" className="p-2 divide-y divide-slate-200">
                                                        <li className="flex py-4 first:pt-0 last:pb-0 items-center mt-2 grid grid-cols-6">
                                                            <img src={notif.profile_picture ? `../storage/${notif.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-10 w-10 rounded-full col-span-1"/>
                                                            <div className="overflow-hidden flex flex-col text-sm gap-2 col-span-4 mx-3">
                                                                <span>
                                                                    <span className="font-bold">{notif.username}</span> liked your post activity. <span className="text-gray-400">{relativeTimeString}</span>
                                                                </span>
                                                                {/* <span className="flex justify-end text-xs text-gray-400">{notif.created_at}</span> */}
                                                            </div>
                                                            <img src={`../storage/${notif.activity_picture}`} alt="" className="h-10 w-10 rounded-md col-span-1"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            :
                                            notif.type === 'comment' ?
                                                <div className="w-full">
                                                    <ul role="list" className="p-2 divide-y divide-slate-200">
                                                        <li className="flex py-4 first:pt-0 last:pb-0 items-center mt-2 grid grid-cols-6">
                                                            <img src={notif.profile_picture ? `../storage/${notif.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-10 w-10 rounded-full"/>
                                                            <div className="overflow-hidden flex flex-col text-sm gap-2 col-span-4 mx-3">
                                                                <span>
                                                                    <span className="font-bold">{notif.username}</span> comment your post activity. <span className="text-gray-400">{relativeTimeString}</span>
                                                                </span>
                                                                {/* <span className="flex justify-end text-xs text-gray-400">{notif.created_at}</span> */}
                                                            </div>
                                                            <img src={`../storage/${notif.activity_picture}`} alt="" className="h-10 w-10 rounded-md col-span-1"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            :
                                            null
                                        }
                                            </Link>
                                        </>
                                    )
                                })
                            :
                                <>
                                    <div className="flex justify-center items-center p-3">
                                        <span>no notification</span>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                :
                null
            }

        </div>
        </>
    )
}

export default BtnNotif;
