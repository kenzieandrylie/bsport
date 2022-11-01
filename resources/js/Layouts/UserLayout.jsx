import Footer from "@/Components/Additional/Footer";
import Navbar from "@/Components/Additional/Navbar";


const UserLayout = ({children, auth}) => {


    return (
        <>
        <div className="bg-gray-100">
            <div className="sticky top-0 z-50">
                <Navbar user={auth.user}/>
            </div>

            <div>
                {children}
            </div>

            <div>
                <Footer />
            </div>
        </div>
        </>
    )
}

export default UserLayout;
