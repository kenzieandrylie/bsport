import UserList from "../UserList";

const MyFriend = ({users}) => {
    return (
        <div className="bg-white border rounded-xl p-3" >
            <div className="rounded-xl">
                <div className="p-3 shadow-md">
                    <span className="text-md font-medium font-bold">My Friend</span>
                </div>
                <div className="overflow-y-auto h-96">
                    {users.map((user) => {
                        return(
                            <>
                                <UserList user={user} />
                                <UserList user={user} />
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyFriend;
