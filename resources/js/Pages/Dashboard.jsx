import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Additional/Navbar';
import Hero from '@/Components/Additional/Hero';
import GroupCard from '@/Components/Additional/GroupCard';
import UserLayout from '@/Layouts/UserLayout';
import BtnLink from '@/Components/Additional/BtnLink';
import Alert from '@/Components/Additional/Alert';


export default function Dashboard(props) {

    console.log("data : " ,props.mygroups);
    console.log("props : ",props);

    return (
        <>
            <UserLayout
            auth={props.auth}
            >
                <Hero
                user={props.auth.user}
                />

                <div className='p-8'>
                    <div className='w-full font-bold text-2xl flex justify-between'>
                        <span>My Group</span>
                        <BtnLink href="/dashboard"><span>Join Group</span></BtnLink>
                    </div>
                    <div className='flex justify-start items-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch gap-5 p-8'>
                        {props.flash.message && <><Alert msg={props.flash.message}/></>}
                        {props.mygroups.length > 0 ? props.mygroups.map((group) => {
                           return(
                            <>
                                <GroupCard group={group}/>
                            </>
                           )
                        })
                        : <div className='flex justify-center w-full p-12'><p>You don't have any group yet! Create or join one!</p></div>
                        }
                    </div>
                </div>

            </UserLayout>

        </>
    );
}
