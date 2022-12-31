import Alert from "@/Components/Additional/Alert";
import InputError from "@/Components/InputError";
import UserLayout from "@/Layouts/UserLayout";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { React,useState,useEffect } from "react";

const EditProfile = (props) => {

    const user = props.auth.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        password: '',
        password_confirmation: '',
        current_password: '',
        profile_picture: user.profile_picture,
        cover_picture: user.cover_picture
    })

    // console.log('Edit profile : ', props, data);

    const [type, setType] = useState('editprofile');
    const [info, setInfo] = useState('');
    const [preview, setPreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
    const [cover, setCover] = useState('https://cutewallpaper.org/21/chill-anime-background/Load-104-More-Imagesgrid-View-Anime-Background-Wallpaper-.jpg')

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const handleProfile = (e) => {
        const imageFiles = e.target.files;
        //console.log(imageFiles[0]);
        if(imageFiles.length > 0 ){
            const image = URL.createObjectURL(imageFiles[0]);
            setPreview(image);
        }
        setData('profile_picture',imageFiles[0]);
    }

    const handleCover = (e) => {
        const imageFiles = e.target.files;
        //console.log(imageFiles[0]);
        if(imageFiles.length > 0 ){
            const image = URL.createObjectURL(imageFiles[0]);
            setCover(image);
        }
        setData('cover_picture',imageFiles[0]);
    }

    const updatePass = (e) => {
        e.preventDefault();

        post(route('edit.password'), {
            preserveScroll: true,
            onSuccess: () => reset()
        });

        setInfo('password');
    };

    const updateProf = (e) => {
        e.preventDefault();

        post(route('edit.profile'), {
            preserveScroll: true
        })

        setInfo('profile');
    };

    useEffect(() => {
        data.profile_picture && setPreview(`../storage/${user.profile_picture}`);
        data.cover_picture && setCover(`../storage/${user.cover_picture}`);
    },[])

    useEffect(() => {
        setInfo();
    },[type])

    return (
        <>
            <UserLayout auth={props.auth} users={props.users} notifications={props.notifications}>
            <Head title="Edit profile" />

                <div className="grid grid-cols-4 gap-4 m-8">

                    <div className="bg-white border col-span-full lg:col-span-1 row-span-1">
                        <div className="flex flex-col justify-around text-md">
                            <div className="flex items-center cursor-pointer p-4 hover:bg-slate-100" onClick={() => {setType('editprofile')}}>
                                Edit Profile
                            </div>
                            <div className="flex items-center cursor-pointer p-4 hover:bg-slate-100" onClick={() => {setType('editpassword')}}>
                                Change Password
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border col-span-full lg:col-span-2 row-span-2 p-4">
                        <div className="shadow-sm p-4">
                            <span className="font-bold uppercase">{type === 'editprofile' ? 'Edit Profile' : 'Change Password'}</span>
                        </div>

                        <div className="p-4">

                        {type === "editprofile" ?
                        <>
                            <form onSubmit={updateProf}>
                                <div className={`hero rounded-lg ${errors.cover_picture && "border-red-400 border-4"}`} style={{ backgroundImage: `url("${cover}")`, height: `20vh` }}>
                                    <div className="flex w-full h-full items-end justify-end text-gray-500">
                                        <label htmlFor="c-input" className="p-1 rounded-md cursor-pointer hover:bg-slate-200 mr-2 bg-white mb-2 flex items-center border "><FontAwesomeIcon icon={faCamera} size="sm"/> <span className="text-sm ml-2">edit cover</span> </label>
                                    </div>
                                    <input type="file" id="c-input" accept="image/*" className="invisible" onChange={handleCover}/>
                                </div>
                                <div className="flex justify-center -mt-16">
                                    <div className="h-1/4 w-40 lg:w-1/4 relative">
                                        <img src={preview} alt="" className={`rounded-full border-4 ${errors.profile_picture ? "border-red-400" : "border-white"} w-40 h-40 object-cover`}/>
                                        <label htmlFor="dp-input" className="absolute bottom-10 right-0 border bg-white p-1 rounded-full cursor-pointer hover:bg-slate-200"><FontAwesomeIcon icon={faCamera} size="xl"/></label>
                                        <input type="file" id="dp-input" accept="image/*" className="invisible" onChange={handleProfile}/>
                                    </div>
                                </div>
                                <div className="grid-cols-12 mb-6">
                                    <div className="col-start-5 col-span-8">{errors.cover_picture && <InputError message={errors.cover_picture}/>}</div>
                                    <div className="col-start-5 col-span-8">{errors.profile_picture && <InputError message={errors.profile_picture}/>}</div>
                                </div>
                                <div className="grid grid-cols-12 mb-6">
                                    <label htmlFor="firstname" className="col-span-4 pt-3 pb-2 text-sm text-gray-700 font-bold">First Name<span className='text-red-600 font-bold'>*</span></label>
                                    <input type="text" name="name" value={data.name} onChange={handleChange} className={`col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.name ? "border-red-500" : "border-gray-300"}`}/>
                                    <div className="col-start-5 col-span-8">{errors.name && <InputError message={errors.name}/>}</div>
                                </div>
                                <div className="grid grid-cols-12 mb-6">
                                    <label htmlFor="lastname" className="col-span-4 pt-3 pb-2 text-sm text-gray-700 font-bold">Last Name<span className='text-red-600 font-bold'>*</span></label>
                                    <input type="text" name="last_name" value={data.last_name} onChange={handleChange} className={`col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.last_name ? "border-red-500" : "border-gray-300"}`}/>
                                    <div className="col-start-5 col-span-8">{errors.last_name && <InputError message={errors.last_name}/>}</div>
                                </div>
                                <div className="grid grid-cols-12 mb-6">
                                    <label htmlFor="username" className="col-span-4 pt-3 pb-2 text-sm text-gray-700 font-bold">Username<span className='text-red-600 font-bold'>*</span></label>
                                    <input type="text" name="username" value={data.username} onChange={handleChange} className={`col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.username ? "border-red-500" : "border-gray-300"}`}/>
                                    <div className="col-start-5 col-span-8">{errors.username && <InputError message={errors.username}/>}</div>
                                </div>
                                <div className="grid grid-cols-12 mb-6">
                                    <label htmlFor="email" className="col-span-4 pt-3 pb-2 text-sm text-gray-700 font-bold">Email<span className='text-red-600 font-bold'>*</span></label>
                                    <input type="text" name="email" value={data.email} onChange={handleChange} className={`col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.email ? "border-red-500" : "border-gray-300"}`}/>
                                    <div className="col-start-5 col-span-8">{errors.email && <InputError message={errors.email}/>}</div>
                                </div>

                                <div className="flex justify-end mt-10 items-center">
                                    <span className="text-sm text-gray-500 mr-5">{(info === 'profile' && props.flash.message) && <>Profile Saved.</>}</span>
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-1/4">Update</button>
                                </div>
                            </form>
                        </>
                        :
                        <>
                            <form onSubmit={updatePass}>
                                <div className="grid grid-cols-12 mb-6">
                                    <label htmlFor="currentpassword" className="col-span-4 pt-3 pb-2 text-sm text-gray-700 font-bold">Current Password<span className='text-red-600 font-bold'>*</span></label>
                                    <input type="password" name="current_password" value={data.current_password} onChange={handleChange} className={`col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.current_password ? "border-red-500" : "border-gray-300"}`}/>
                                    <div className="col-start-5 col-span-8">{errors.current_password && <InputError message={errors.current_password}/>}</div>
                                </div>
                                <div className="grid grid-cols-12 mb-6">
                                    <label htmlFor="newpassword" className="col-span-4 pt-3 pb-2 text-sm text-gray-700 font-bold">New Password<span className='text-red-600 font-bold'>*</span></label>
                                    <input type="password" name="password" value={data.password} onChange={handleChange} className={`col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.password ? "border-red-500" : "border-gray-300"}`}/>
                                </div>
                                <div className="grid grid-cols-12 mb-6">
                                    <label htmlFor="confirmpassword" className="col-span-4 pt-3 pb-2 text-sm text-gray-700 font-bold">Confirm New Password<span className='text-red-600 font-bold'>*</span></label>
                                    <input type="password" name="password_confirmation" value={data.password_confirmation} onChange={handleChange} className={`col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 text-sm ${errors.password ? "border-red-500" : "border-gray-300"}`}/>
                                    <div className="col-start-5 col-span-8">{errors.password && <InputError message={errors.password}/>}</div>
                                </div>

                                <div className="flex justify-end mt-10 items-center">
                                    <span className="text-sm text-gray-500 mr-5">{(info === 'password' && props.flash.message) && <>Password Saved.</>}</span>
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-1/4">Update</button>
                                </div>
                            </form>
                        </>
                        }

                        </div>
                    </div>

                    {/* <div className="order-first lg:order-none">
                        {(props.flash.message && info.length > 0) && <><Alert msg={props.flash.message}/></>}
                    </div> */}

                </div>

            </UserLayout>
        </>
    )
}

export default EditProfile;
