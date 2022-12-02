import { Head, Link,useForm } from '@inertiajs/inertia-react';
import BtnLink from './BtnLink';
import React, { useEffect, useState,useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
// import route from 'vendor/tightenco/ziggy/src/js';

const GroupCardPublic = ({group}) => {

    const [disable, setDisable] = useState(false);
    const [labeljoin, setLabeljoin] = useState("Join");
    const groupIdRef = React.createRef();
    const { data, setData, post, processing, errors, reset } = useForm({
        groupId: ''
    });

    const handleJoin = (e,groupId) => {
        setDisable(true);
        e.preventDefault();
        setLabeljoin("Joined");
        setData(()=>{return {groupId:String(groupIdRef.current.value)}});

    }
    useEffect(()=>{
        if(labeljoin=="Joined" && disable==true){
            post(route('join.group'));
        }

    },[data]);
    // useEffect(()=>{
    //     post(route('join.group'));
    // },[data]);
    return (
        <>
           <div className="w-64 h-52 border border-gray-300 bg-white">
                <div className="block p-3">
                    <div className="flex justify-center">
                        <img src={group.display_picture ? `../storage/${group.display_picture}` : "https://i.pinimg.com/originals/50/46/0c/50460cdffd8bb7e3e387f3d456b6d633.jpg"} alt="" className="rounded" style={{width:`80px`,height:`80px`,objectFit:`cover`}}/>
                    </div>
                    <div className="flex justify-center p-4 font-bold">
                        {group.name}
                    </div>
                </div>
                <div className="flex justify-center">
                    <input type="hidden" value={group.id} ref={groupIdRef}/>
                    <button className="btn btn-sm btn-outline" disabled={disable} onClick={handleJoin}>{labeljoin}</button>
                    {/* <div className="btn btn-sm btn-outline" disabled={disable} onClick={handleJoin}>
                        <Link href={`/join-group/${group.id}`} method="post" as="button">{labeljoin}</Link>
                    </div> */}
                </div>
           </div>
        </>
    )
}

export default GroupCardPublic;
