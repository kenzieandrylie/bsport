import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import UserLayout from "@/Layouts/UserLayout";
import BtnLink from '@/Components/Additional/BtnLink';
import GroupCardPublic from '@/Components/Additional/GroupCardPublic';
import BtnBack from '@/Components/Additional/BtnBack';

const Discover = (props) => {

    console.log("discover props : ",props)

    return (
        <>
            <UserLayout auth={props.auth}>
                <div className="p-8">
                    <div className='w-full font-bold text-2xl flex justify-between'>
                        <span>Public Group</span>
                        <BtnLink href="#"><span>Create Group</span></BtnLink>
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
