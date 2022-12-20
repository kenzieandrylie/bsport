import { useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ManageUser = ({users,auth}) => {

    const {data,setData,post, processing, errors, reset,delete:destroy} = useForm({
        id:'',
        role:''
    });

    const [type, setType] = useState('');
    const [query, setQuery] = useState('');

    const handleBan = (id) => {
        setData('id',id);
        setType('ban');
    }

    const handleUnban = (id) => {
        setData('id',id);
        setType('unban');
    }

    const handleRole = (id, role) => {
        setData({'id' : id, 'role' : role});
        setType('role');
    }

    useEffect(() => {
        if(type === 'ban'){
            post(route('ban.user'), {preserveScroll: true});
        }
        else if(type === 'unban'){
            post(route('unban.user'), {preserveScroll: true});
        }
        else if(type === 'role'){
            post(route('change.role'), {preserveScroll: true});
        }
    },[data]);

    return (
        <>
            <div className="flex flex-col bg-white border rounded-lg">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">

                        <div className="flex justify-end items-center p-4">
                            <div className="w-1/4">
                                <input type="text" placeholder="Search user" onChange={(e) => setQuery(e.target.value)} name="search user" className={`col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 text-sm border-gray-300`}/>
                            </div>
                        </div>

                        <div className="overflow-hidden p-4">
                            <table className="min-w-full">
                                <thead className="border-b border-sky-500">
                                    <tr>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/8">
                                            No
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/4">
                                            Username
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/4">
                                            Email
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/4">
                                            <div className="flex items-center gap-2">
                                                <span>Role</span>
                                                <div className="tooltip tooltip-top cursor-pointer" data-tip="click badge to change user's role">
                                                    <FontAwesomeIcon icon={faQuestionCircle} size="sm"/>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/8">
                                            Option
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-left divide-y divide-slate-200">
                                    {users
                                    .filter((user) => user.username.toLowerCase().includes(query.toLowerCase()))
                                    .map((user,i) => {
                                        return(
                                            <>
                                                <tr key={i+1}>
                                                    <td className={`text-md p-6 ${user.id === auth.id && "text-sky-500 font-bold"}`}>{i+1}</td>
                                                    <td className="text-md p-6">
                                                        <div className="flex items-center gap-4">
                                                            <img src={user.profile_picture ? `../storage/${user.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-12 w-12 rounded-full"/>
                                                            <div className="flex items-center gap-1">
                                                                <span className={`text-md ${user.id === auth.id && "text-sky-500 font-bold"}`}>{user.username}</span>
                                                                {user.is_banned ? <span className="text-sm text-red-500">#banned</span> : null}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={`text-md p-6 ${user.id === auth.id && "text-sky-500 font-bold"}`}>{user.email}</td>
                                                    <td className="text-md p-6">
                                                        {
                                                        user.is_admin ?
                                                        <span className="bg-green-200 text-green-900 text-sm px-2 py-1 rounded-full font-bold hover:bg-green-300 cursor-pointer" onClick={() => handleRole(user.id,'user')}>admin</span>
                                                        :
                                                        <span  className="bg-sky-200 text-sky-900 text-sm px-2 py-1 rounded-full font-bold hover:bg-sky-300 cursor-pointer" onClick={() => handleRole(user.id,'admin')}>user</span>
                                                        }
                                                    </td>
                                                    <td className="text-md p-6">
                                                        {
                                                        user.is_banned ?
                                                        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-3/4" onClick={() => {handleUnban(user.id)}}>Unban</button>
                                                        :
                                                        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-3/4" onClick={() => {handleBan(user.id)}}>Ban</button>
                                                        }
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </>
    )
}

export default ManageUser;
