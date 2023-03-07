import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import UserLayout from "@/Layouts/UserLayout";
import BtnLink from '@/Components/Additional/BtnLink';
import GroupCardPublic from '@/Components/Additional/GroupCardPublic';
import BtnBack from '@/Components/Additional/BtnBack';

const Discover = (props) => {

    //console.log("discover props : ",props)

    const { data, setData, post, processing, errors, reset } = useForm({
        pin: ''
    });

    const [disable, setDisable] = useState(false);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const handleJoin = (e) => {
        e.preventDefault(e);

        setDisable(true);
        post(route('join.group'), {
            preserveScroll: true
        });
    }

    //console.log("pin : ", props);

    return (
        <>
            <UserLayout auth={props.auth} users={props.users} notifications={props.notifications}>
                <Head title="Discover" />

                <div className="p-8">
                    <div className='w-full font-bold text-2xl flex justify-between'>
                        <span>Public Group</span>
                        <Link href={route('index.create.group')}><BtnLink>Create Group</BtnLink></Link>
                    </div>

                    <div className='flex justify-start items-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch gap-5 p-8'>

                        {/* Card Group by Pin */}
                        <div className="w-64">
                            <div className={`w-full h-52 border border-gray-300 bg-white ${props.errors.pin && 'border-red-500'}`}>
                                <div className="block p-3">
                                    <div className="flex justify-center">
                                        <img src={"https://img.freepik.com/free-vector/curiosity-search-concept-illustration_114360-11031.jpg?w=2000"} alt="" className="rounded" style={{width:`80px`,height:`80px`,objectFit:`cover`}}/>
                                    </div>
                                    <div className="flex justify-center p-4 font-bold">
                                        <span>Join group by pin</span>
                                    </div>
                                </div>
                                <div className="flex justify-center flex gap-3 items-center">
                                    <input type="text" className={`w-full rounded border-0 border-b-2 focus:border-indigo-500 focus:ring-indigo-500 text-xs basis-1/2 bg-slate-100 ${props.errors.pin && 'border-red-500'}`} placeholder="Insert pin" name="pin" value={data.pin} onChange={handleChange} maxLength={10}/>
                                    {data.pin.length > 0 && <button className="btn btn-sm btn-outline" onClick={handleJoin} disable={disable}>Join</button>}
                                </div>
                            </div>
                            {props.errors && <span className="text-sm text-red-500 w-64">{props.errors.pin}</span>}
                        </div>

                        {props.publicgroups.length > 0 ? props.publicgroups.map((group,i) => {
                           return(
                            <div key={i}>
                                <GroupCardPublic group={group}/>
                            </div>
                           )
                        })
                        : <div className='flex justify-center w-full p-12'><p>There is no public group yet, let's make one!</p></div>
                        }
                    </div>
                </div>
            </UserLayout>
        </>
    )
}

export default Discover;
