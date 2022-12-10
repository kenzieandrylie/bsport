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
                    <div className="absolute bg-white right-3 rounded shadow-md w-64 flex-col p-2">
                        <div className="overflow-y-auto max-h-64">

                            <div className="p-3 shadow-sm flex justify-between items-center">
                                <span>Today notifiactions ({notifications.length})</span>
                            </div>

                            {notifications.length > 0 ?
                                notifications.map((notif, i) => {
                                    return (
                                        <>
                                            <Link href={`/profile/${notif.username}`}>
                                                <div className="w-full">
                                                    <ul role="list" className="p-2 divide-y divide-slate-200">
                                                        <li className="flex py-4 first:pt-0 last:pb-0 items-center mt-2">
                                                            <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-10 w-10 rounded-full"/>
                                                            <div className="ml-3 overflow-hidden flex flex-col text-sm">
                                                                <span>
                                                                    <span className="font-bold">{notif.username}</span> started following you.
                                                                </span>
                                                                {/* <span className="flex justify-end text-xs text-gray-400">{notif.created_at}</span> */}
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
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
