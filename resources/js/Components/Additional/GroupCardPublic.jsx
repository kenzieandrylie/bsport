import { Head, Link } from '@inertiajs/inertia-react';
import BtnLink from './BtnLink';
import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const GroupCardPublic = ({group}) => {

    const [disable, setDisable] = useState(false);
    const [labeljoin, setLabeljoin] = useState("Join");

    const handleJoin = () => {
        setDisable(true);
        setLabeljoin("Joined");
    }

    return (
        <>
           <div className="w-64 h-52 border border-gray-300 bg-white">
                <div className="block p-3">
                    <div className="flex justify-center">
                        <img src={group.display_picture} alt="" className="rounded" style={{width:`80px`,height:`80px`,objectFit:`cover`}}/>
                    </div>
                    <div className="flex justify-center p-4 font-bold">
                        {group.name}
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="btn btn-sm btn-outline" disabled={disable} onClick={handleJoin}>
                        <Link href={`/join-group/${group.id}`} method="post" as="button">{labeljoin}</Link>
                    </div>
                </div>
           </div>
        </>
    )
}

export default GroupCardPublic;
