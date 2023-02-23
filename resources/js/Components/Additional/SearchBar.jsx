import React, {useState, useEffect} from "react";
import UserList from "./UserList";

const SearchBar = ({users}) => {

    const [query, setQuery] = useState('');

    return(
        <>
            <div className="flex flex-col">
                <input
                    type="text"
                    placeholder="Search Friend"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />

                <div className="relative inline-block">
                    <div className="absolute bg-white w-56 lg:w-full rounded shadow-md">
                        {query.length > 0 ?
                        users
                        .filter((user) => user.username.toLowerCase().includes(query.toLowerCase()))
                        .map((user,i) => {
                            return(
                                <div key={i}>
                                    <UserList user={user} i={i}/>
                                </div>
                            )
                        }): null}
                    </div>
                </div>

            </div>
        </>
    )
}

export default SearchBar;
