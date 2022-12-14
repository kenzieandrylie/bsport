import InputError from "@/Components/InputError";
import UserLayout from "@/Layouts/UserLayout";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { React,useState,useEffect } from "react";

const EditGroup = (props) => {

    console.log('Edit Group Page : ',props);

    const group = props.group

    const { data, setData, post, processing, errors, reset } = useForm({
        id: group.id,
        name: group.name,
        description: group.description,
        display_picture: group.display_picture
    })

    const [preview, setPreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const handleGroupPhoto = (e) => {
        const imageFiles = e.target.files;
        //console.log(imageFiles[0]);
        if(imageFiles.length > 0 ){
            const image = URL.createObjectURL(imageFiles[0]);
            setPreview(image);
        }
        setData('display_picture',imageFiles[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('edit.group'), {
            preserveScroll: true
        })

    };

    useEffect(() => {
        data.display_picture && setPreview(`../storage/${group.display_picture}`);
    },[])

    return (
        <>
            <UserLayout auth={props.auth} users={props.users} notifications={props.notifications}>
            <Head title="Edit Group" />

            <div className='p-8'>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="mt-5 md:col-span-3 md:mt-0 ">

                        <form onSubmit={handleSubmit}>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div className="gap-6">
                                        <div className="col-span-3 ">
                                            <div className=" grid grid-cols-12 flex align-items-center rounded-md">
                                            <label htmlFor="groupname" className="text-sm font-bold text-gray-700 col-span-4 px-3 py-2">Group Name<span className='text-red-600 font-bold'>*</span></label>
                                            <input type="text" name="name" value={data.name} onChange={handleChange} className={`col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? "border-red-500" : "border-gray-300"}`}/>
                                            </div>
                                            <div className='grid grid-cols-12'>
                                            <p className='col-span-4'></p>
                                            <p className='col-span-8 text-red-500'>{errors.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className='grid grid-cols-12 '>
                                        <label htmlFor="group-description" className="col-span-4 text-sm font-bold text-gray-700 px-3 py-2">Group Description<span className='text-red-600 font-bold'>*</span></label>
                                        <textarea name="description" value={data.description} onChange={handleChange} rows="4" className={`col-span-8 block w-full rounded-md ${errors.description ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}></textarea>
                                    </div>
                                    <div className='grid grid-cols-12'>
                                        <p className='col-span-4'></p>
                                        <p className='col-span-8 text-red-500'>{errors.description}</p>
                                    </div>

                                    <hr />

                                    <div className='grid grid-cols-12 align-items-center'>
                                        <label className=" text-sm font-bold text-gray-700 col-span-4 px-3 py-2">Group Photo <span className='text-red-600 font-bold'>*</span></label>
                                        <div className="mt-1 flex items-center col-span-8">
                                            <img src={preview} alt="" className={`rounded-full border-4 border-white w-14 h-14 object-cover`}/>
                                            <label htmlFor="dp-input" className={`ml-5 rounded-md border ${errors.display_picture ? "border-red-500" : "border-gray-300"} bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer`}>Change</label>
                                            <input type="file" id="dp-input" accept="image/*" className="invisible" onChange={handleGroupPhoto}/>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-12'>
                                        <p className='col-span-4'></p>
                                        <p className='col-span-8 text-red-500'>{errors.display_picture}</p>
                                    </div>

                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

                <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
                </div>

            </UserLayout>
        </>
    )
}

export default EditGroup;
