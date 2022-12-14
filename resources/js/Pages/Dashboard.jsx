import React, { useEffect, useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Additional/Navbar';
import Hero from '@/Components/Additional/Hero';
import GroupCard from '@/Components/Additional/GroupCard';
import UserLayout from '@/Layouts/UserLayout';
import BtnLink from '@/Components/Additional/BtnLink';
import Alert from '@/Components/Additional/Alert';


export default function Dashboard(props) {

    console.log("dashboard props : ",props);

    return (
        <>
            <UserLayout
            auth={props.auth}
            users={props.users}
            notifications={props.notifications}
            >
                <Head title="BSport" />
                <Hero
                user={props.auth.user}
                />

                <div className='p-8'>
                    <div className='w-full font-bold text-2xl flex justify-between'>
                        <span>My Group</span>
                        <Link href={route('discover')}><BtnLink>Join Group</BtnLink></Link>
                    </div>
                    <div className='flex justify-start items-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch gap-5 p-8'>
                        {props.flash.message && <><Alert msg={props.flash.message}/></>}
                        {props.mygroups.length > 0 ? props.mygroups.map((group,i) => {
                           return(
                            <div key={i}>
                                <GroupCard group={group} Author={props.auth.user.id}/>
                            </div>
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
