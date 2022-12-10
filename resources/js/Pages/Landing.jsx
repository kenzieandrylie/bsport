import BtnLink from "@/Components/Additional/BtnLink";
import Footer from "@/Components/Additional/Footer";
import { Link } from "@inertiajs/inertia-react";

const Landing = () => {
    return(
        <>
            <div style={{ backgroundImage: `url("https://visualeyesiowa.com/wp-content/uploads/2015/08/GettyImages-670906214.jpg")`}}>
                <div className="navbar p-3">
                    <div className="flex-1">
                        <div className="btn btn-ghost normal-case text-xl">BSport</div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 lg:gap-none p-10">
                    <div className="col-span-full lg:col-span-2 flex justify-center items-center flex-col gap-8 text-center order-2">
                        <div className="text-4xl font-bold">
                            <span>
                                Welcome to <span className="uppercase text-sky-500">bsport</span>
                            </span>
                        </div>
                        <div>
                            <span>
                                let's start your healthy life journey together from here
                            </span>
                        </div>
                        <div className="cursor-pointer">
                            <Link href={route('login')}>
                                <BtnLink>Get Started</BtnLink>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-full lg:col-span-2 flex justify-center items-center order-1">
                        <div>
                            <img src="../storage/fitnesspeople.png" alt="" />
                        </div>
                    </div>
                </div>

                <div className="bg-blue-300">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Landing;
