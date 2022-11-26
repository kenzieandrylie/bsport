import UserList from "../UserList";

const MyFriend = ({users}) => {
    return (
        <div className="bg-white border rounded-xl p-3" >
            <div className="rounded-xl">
                <div className="p-3 shadow-md flex justify-between items-center">
                    <span className="text-lg font-medium font-bold">Mutual Friend</span>
                    <span className="text-xs text-gray-400"><span className="text-red-500">*</span>following each-other</span>
                </div>
                <div className="overflow-y-auto h-96">
                    {users.length > 0 ?
                        users.map((user) => {
                            return(
                                <>
                                    <UserList user={user} />
                                </>
                            )
                        })
                    :
                        <>
                            <div className="h-full flex justify-center items-center text-lg">
                                No users found!
                            </div>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default MyFriend;
