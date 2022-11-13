import { Link } from "@inertiajs/inertia-react";
import React, {useState, useEffect} from "react";

const SearchBar = ({users}) => {

    const [query, setQuery] = useState('');

    return(
        <>
            <div className="flex flex-col">
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />

                <div className="relative inline-block">
                    <div className="absolute bg-white w-full rounded shadow-md">
                        {query.length > 0 ?
                        users
                        .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()) ||  user.last_name.toLowerCase().includes(query.toLowerCase()))
                        .map((user,i) => {
                            return(
                                <>
                                    <Link href='#'>
                                        <div key={i} className="w-full">
                                            <ul role="list" className="p-6 divide-y divide-slate-200">
                                                    <li className="flex py-4 first:pt-0 last:pb-0">
                                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className="h-10 w-10 rounded-full"/>
                                                        <div className="ml-3 overflow-hidden">
                                                            <p className="text-sm font-medium text-slate-900">{user.name + ' ' + user.last_name}</p>
                                                            <p className="text-sm text-slate-500 tuncate">{user.kode}</p>
                                                        </div>
                                                    </li>
                                            </ul>
                                        </div>
                                    </Link>
                                </>
                            )
                        }): null}
                    </div>
                </div>

            </div>
        </>
    )
}

export default SearchBar;
