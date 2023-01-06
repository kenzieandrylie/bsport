import { Inertia,useForm,Link } from '@inertiajs/inertia-react';
import React, { useEffect, useState, useRef } from 'react';
import PopupUser from '../Modal/PopupUser';

const ProfileHeader = ({user, auth, follower, following, friend}) => {

    const {data,setData,post, processing, errors, reset,delete:destroy} = useForm({
        id:''
    });

    // console.log('Profile Header: ', user, auth);

    const [datapop, setDatapop] = useState([]);
    const [isopen, setIsopen] = useState(false);
    const [labelpop, setLabelpop] = useState('');
    const [type, setType] = useState('');

    const handleFollow = () => {
        setData('id',user.id);
        setType('follow');
    }

    const handleUnfollow = () => {
        setData('id',user.id);
        setType('unfollow');
    }

    const clearViewState = () => {
        setDatapop([]);
        setLabelpop('');
        setIsopen(false);
    }

    useEffect(() => {
        if(type === 'follow'){
            post(route('follow.user'), {preserveScroll: true});
        }
        else if(type === 'unfollow'){
            destroy(route('unfollow.user'), {preserveScroll: true});
        }
    },[data])

    useEffect(() => {
        if(labelpop === 'follower'){
            setDatapop(follower);
            setIsopen(true);
        }
        else if(labelpop === 'following'){
            setDatapop(following);
            setIsopen(true);
        }
    },[labelpop])

    return (
        <>
        <PopupUser open={isopen} users={datapop} label={labelpop} onClose={clearViewState}/>
            <div className="flex flex-col bg-white border rounded-xl">

                <div className="flex justify-center w-full shadow-sm">
                    <div className="flex flex-col items-center sm:flex-row p-2 basis-full">
                        <div className="-mt-28 basis-1/4 flex justify-center">
                            <img src={user.profile_picture ? `../storage/${user.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-44 w-44 rounded-full border-4 border-white"/>
                        </div>
                        <div className="flex-col basis-1/2">
                            <div className="flex flex-col mt-4 sm:mt-0 text-center sm:text-left">
                                <span className="text-2xl font-bold">{user.name + ' ' + user.last_name}</span>
                                <span className="text-md">{user.username}</span>
                            </div>
                        </div>
                        <div className="flex items-center basis-1/4 justify-center">
                            {user.id === auth.id ?
                                <div className="basis-3/4">
                                    <Link href={route('index.edit.profile')}>
                                        <div type="submit" className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 w-28 lg:w-full">Edit Profile</div>
                                    </Link>
                                </div>
                            :
                                follower.find(e => e.follower_id === auth.id) ?
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-3/4" onClick={handleUnfollow}>Following</button>
                                :
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 lg:w-3/4" onClick={handleFollow}>Follow</button>
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-center">
                    <div className="flex basis-full p-3 mb-3 justify-around">
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-lg">0</span>
                            <span>Activity</span>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer" onClick={() => {setLabelpop("follower")}}>
                            <span className="font-bold text-lg">{follower.length}</span>
                            <span>Followers</span>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer" onClick={() => {setLabelpop("following")}}>
                            <span className="font-bold text-lg">{following.length}</span>
                            <span>Following</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileHeader;
