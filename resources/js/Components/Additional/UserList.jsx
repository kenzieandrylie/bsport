import { Link } from "@inertiajs/inertia-react";

const UserList = ({user, i}) => {
    return (
        <>
            <Link href={`/profile/${user.username}`}>
                <div key={i} className="w-full">
                    <ul role="list" className="p-6 divide-y divide-slate-200">
                            <li className="flex py-4 first:pt-0 last:pb-0">
                                <img src={user.profile_picture ? `../storage/${user.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-12 w-12 rounded-full"/>
                                <div className="ml-3 overflow-hidden">
                                    <p className="text-sm font-medium text-slate-900">{user.name + ' ' + user.last_name}</p>
                                    <p className="text-sm text-slate-500 tuncate">{user.username}</p>
                                </div>
                            </li>
                    </ul>
                </div>
            </Link>
        </>
    )
}

export default UserList;
