import Footer from "@/Components/Additional/Footer";
import Navbar from "@/Components/Additional/Navbar";


const UserLayout = ({children, auth}) => {


    return (
        <>
            <div className="sticky top-0 z-50">
                <Navbar user={auth.user}/>
            </div>

            <div>
                {children}
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}

export default UserLayout;
