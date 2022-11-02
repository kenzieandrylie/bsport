import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Additional/Navbar';
import Hero from '@/Components/Additional/Hero';
import GroupCard from '@/Components/Additional/GroupCard';
import UserLayout from '@/Layouts/UserLayout';

export default function Dashboard(props) {

    console.log(props);

    // const [getFlag, setFlag] = useState(0);
    // const [Labelgroup, setLabelgroup] = useState("");

    // useEffect(() => {
    //     if(getFlag === 0)
    //     {
    //         setLabelgroup("Public Group")
    //     }
    //     else if(getFlag === 1)
    //     {
    //         setLabelgroup("My Group")
    //     }
    // }, [getFlag])


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
                        <a href="#" className='inline-flex items-center px-4 py-2 bg-sky-500 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-sky-600 active:bg-sky-900 transition ease-in-out duration-150'>
                            Join Group
                        </a>
                    </div>
                    <div className='flex justify-start items-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch gap-5 p-8'>
                        <GroupCard />
                    </div>
                </div>

            </UserLayout>

        </>
    );
}
