import UserList from "../UserList";

const GroupMember = ({users}) => {
    return (
        <>
            <div className="bg-white border rounded-xl p-3" >
                <div className="rounded-xl">
                    <div className="p-3 flex justify-between items-center">
                        <span className="text-lg font-medium font-bold">Group members (<span className="text-sky-500">{users.length}</span>)</span>
                    </div>
                    <div className="overflow-y-auto h-96">
                        {users.length > 0 ?
                            users.map((user,i) => {
                                return(
                                    <div key={i}>
                                        <UserList user={user} />
                                    </div>
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
        </>
    )
}

export default GroupMember;
