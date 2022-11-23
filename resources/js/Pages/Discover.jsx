import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import UserLayout from "@/Layouts/UserLayout";
import BtnLink from '@/Components/Additional/BtnLink';
import GroupCardPublic from '@/Components/Additional/GroupCardPublic';
import BtnBack from '@/Components/Additional/BtnBack';
// import route from 'vendor/tightenco/ziggy/src/js';

const Discover = (props) => {

    console.log("discover props : ",props)

    return (
        <>
            <UserLayout auth={props.auth} users={props.users}>
                <div className="p-8">
                    <div className='w-full font-bold text-2xl flex justify-between'>
                        <span>Public Group</span>
                        <Link href={route('index.create.group')}><BtnLink>Create Group</BtnLink></Link>
                    </div>
                    <div className='flex justify-start items-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch gap-5 p-8'>
                        {props.publicgroups.length > 0 ? props.publicgroups.map((group) => {
                           return(
                            <>
                                <GroupCardPublic group={group}/>
                            </>
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
