import { Head, Link } from '@inertiajs/inertia-react';

const GroupCard = ({group}) => {

    return (
        <>
           <div className="w-64 h-52 border border-gray-300 bg-white">
                <div className="flex justify-end p-3">
                    <div className="dropdown">
                        <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
                            <li><a href="">View</a></li>
                            <li className='text-red-500'><Link href={route('leave.group')} method="post" data={{id: group.id}}>Leave</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="block">
                    <div className="flex justify-center">
                        <img src="https://i.pinimg.com/originals/50/46/0c/50460cdffd8bb7e3e387f3d456b6d633.jpg" alt="" className="rounded" style={{width:`80px`,height:`80px`,objectFit:`cover`}}/>
                    </div>
                    <div className="flex justify-center p-4 font-bold">
                        {group.name}
                    </div>
                </div>
           </div>
        </>
    )
}

export default GroupCard;
