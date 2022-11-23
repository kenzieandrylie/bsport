import MyFriend from "@/Components/Additional/Profile/MyFriend";
import NumberActivity from "@/Components/Additional/Profile/NumberActivity";
import PostActivity from "@/Components/Additional/Profile/PostActivity";
import ProfileHeader from "@/Components/Additional/Profile/ProfileHeader";
import TotalActivity from "@/Components/Additional/Profile/TotalActivity";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/inertia-react";

const Profile = (props) => {
    return (
        <>
            <UserLayout auth={props.auth} users={props.users}>

                <div className="hero" style={{ backgroundImage: `url("https://cutewallpaper.org/21/chill-anime-background/Load-104-More-Imagesgrid-View-Anime-Background-Wallpaper-.jpg")`, height: `50vh` }}></div>

                <div className="grid grid-cols-4 gap-4 mr-4 ml-4">
                    <div className="col-span-full lg:col-span-1 lg:mt-4 order-2 lg:order-none">
                        <TotalActivity />
                    </div>
                    <div className="col-span-full lg:col-span-2 order-first lg:order-none">
                        <ProfileHeader />
                    </div>
                    <div className="col-span-full lg:col-span-1 row-span-1 lg:row-span-2 lg:mt-4 order-4 lg:order-none align-items-center lg:sticky top-24">
                        <MyFriend users={props.users}/>
                    </div>
                    <div className="col-span-full lg:col-span-1 order-3 lg:order-none static lg:sticky top-24">
                        <NumberActivity />
                    </div>
                    <div className="col-span-full lg:col-span-2 row-span-2 lg:order-last lg:col-start-2 order-5 lg:-mt-12" >
                        <PostActivity />
                    </div>
                </div>

            </UserLayout>
        </>
    )
}

export default Profile;
