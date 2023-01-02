import { Link } from "@inertiajs/inertia-react";
import ApplicationLogo from "../ApplicationLogo";
import BtnNotif from "./BtnNotif";
import SearchBar from "./SearchBar";

const Navbar = ({user, users, notifications}) => {

    return(
        <div className="navbar bg-base-100 p-3">

            <div className="flex-1 gap-10">
                <Link href={route('dashboard')}><ApplicationLogo className="w-16 h-16 ml-4 fill-current text-gray-500"/></Link>
                <div className="form-control">
                    <SearchBar users={users} />
                </div>
            </div>

            <div className="flex-none gap-2">
                <div>
                    <BtnNotif notifications={notifications}/>
                </div>

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
