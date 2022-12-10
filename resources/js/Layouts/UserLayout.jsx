import Footer from "@/Components/Additional/Footer";
import Navbar from "@/Components/Additional/Navbar";
import ModalFeedback from '@/Components/Additional/Modal/ModalFeedback';


const UserLayout = ({children, auth, users, notifications}) => {


    return (
        <>
        <div className="bg-gray-100">
            <div className="sticky top-0 z-50">
                <Navbar user={auth.user} users={users} notifications={notifications}/>
            </div>

            <div>
                {children}
            </div>

            <div>
                <Footer />
            </div>

            <div className="fixed bottom-0 left-0 p-2">
                <ModalFeedback />
            </div>
        </div>
        </>
    )
}

export default UserLayout;
