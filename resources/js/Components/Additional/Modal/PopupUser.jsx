import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserList from "../UserList";

const PopupUser = ({open,users,label,onClose}) => {
    // console.log("Popupuser : ", open);
    return (
        <>
            {
            open ?
            <div className="fixed top-0 left-0 flex items-center justify-center h-full lg:h-screen w-screen z-50">
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">

                    <div className="bg-white border rounded-xl p-3" >
                        <div className="rounded-xl">
                            <div className="p-3 shadow-md flex justify-between items-center">
                                <span className="text-lg font-medium font-bold">{label}</span>
                                <button onClick={onClose}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <div className="overflow-y-auto h-96 w-80">
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

                </div>
            </div>
            :
            null
            }
        </>

    )
}

export default PopupUser;
