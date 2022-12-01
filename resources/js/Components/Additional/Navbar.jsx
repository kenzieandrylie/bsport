import { Link } from "@inertiajs/inertia-react";
import SearchBar from "./SearchBar";

const Navbar = ({user, users}) => {
    return(
        <div className="navbar bg-base-100 p-3">

            <div className="flex-1">
                <div className="btn btn-ghost normal-case text-xl"><Link href={route('dashboard')}>BSport</Link></div>
            </div>

            <div className="flex-none gap-2">
                <div className="form-control">
                    <SearchBar users={users} />
                </div>

                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
                    </div>
                </button>

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src={user.profile_picture ? `../storage/${user.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link href={`/profile/${user.username}`}>
                                View Profile
                            </Link>
                        </li>
                        <li>
                            <Link href={route('logout')} method="post" as="button" className="text-red-500">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Navbar;
