import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { React,useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPersonRunning, faBicycle, faDumbbell, faCircleCheck, faImage } from "@fortawesome/free-solid-svg-icons";
import InputError from "@/Components/InputError";

const PopupPost = ({open,onClose,post,type,activitytypes}) => {

    // const [info, setInfo] = useState(false);

    const [check, setCheck] = useState(false);

    const {data,setData,post:store, processing, errors, reset,delete:destroy} = useForm({
        id: '',
        group_member_id: '',
        activity_id: '',
        distance: '',
        step: '',
        time: '',
        calories: 0,
        activity_date: '',
        activity_picture: '',
        caption: ''
    });

    const handleDelete = () => {
        destroy(route('delete.post'), {
            preserveScroll: true,
            onSuccess: onClose
        });
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const handlePicture = (e) => {
        const imageFiles = e.target.files;
        setCheck(true);
        setData('activity_picture',imageFiles[0]);
    }

    const onSuceedEdit = () => {
        reset();
        setCheck(false);
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        store(route('edit.post'), {
            preserveScroll: true,
            onSuccess: () => onSuceedEdit()
        });
    }

    useEffect(() => {
        setData({
            id: post.id,
            group_member_id: post.group_member_id,
            activity_id: post.activity_id,
            distance: post.distance,
            step: post.step,
            time: post.time,
            calories: post.calories,
            activity_date: post.activity_date,
            activity_picture: post.activity_picture,
            caption: post.caption
        });
    }, [post]);

    useEffect(() => {
        if(data.activity_id !== post.activity_id){
            reset('calories','distance','step','time','activity_date');
        }
    },[data.activity_id])

    useEffect(() => {
        if(!data.distance || !data.time){
            setData('calories', data.activity_id == 3 ? Math.ceil(data.time * 3.71) : data.activity_id == 2 ? (data.distance * 32) : data.activity_id == 1 ? (data.distance * 60) : null)
        }
    }, [data.distance, data.time])

    //console.log('popuppost : ',post, 'data : ', data.time);

    if(!open) return null;
    return (
        <>
            {
            type === 'delete' &&
            <>
                <div className="fixed top-0 left-0 flex items-center justify-center h-full lg:h-screen w-screen z-50">
                    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                        <div className="bg-white px-16 py-14 rounded-md text-center">
                                <>
                                    <h1 className="text-xl mb-4 font-bold">Do you want to delete this post?</h1>
                                    <div className="flex justify-center gap-4">
                                        <a className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer" onClick={onClose}>
                                            Cancel
                                        </a>
                                        <a  className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer" onClick={handleDelete}>
                                            Delete
                                        </a>
                                    </div>
                                </>
                        </div>
                    </div>
                </div>
            </>
            }
            {
                type === 'edit'
                &&
                <>
                    <div className="fixed top-0 left-0 flex items-center justify-center h-full lg:h-screen w-screen z-50">
                        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                            <div className="bg-white p-3 w-min-content rounded-md w-3/4 lg:w-1/4">
                                <div className="p-3 shadow-sm flex justify-between items-center">
                                    <span className="text-lg font-medium font-bold">Edit Post</span>
                                </div>

                                <div className="p-3">
                                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                        <div className="flex justify-between items-center gap-2 mt-2">
                                            {activitytypes.map((type, i) => {
                                                return (
                                                    <div key={i} className={`basis-1/3 rounded-md border-2 p-1 ${data.activity_id == type.id ? "bg-sky-500 text-white" : "border-sky-500 text-sky-500"} hover:bg-sky-500 hover:text-white transition duration-150 ease-out cursor-pointer`} onClick={() => {setData('activity_id', type.id);}}>
                                                        <div className="flex flex-col item-center text-center justify-center">
                                                            {parseInt(type.id) === 1 ? <FontAwesomeIcon icon={faPersonRunning} size="xl"/>
                                                            :
                                                            parseInt(type.id) === 2 ? <FontAwesomeIcon icon={faBicycle} size="xl"/>
                                                            :
                                                            parseInt(type.id) === 3 ? <FontAwesomeIcon icon={faDumbbell} size="xl"/>
                                                            :
                                                            null
                                                            }
                                                            <span>{type.name}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {
                                        parseInt(data.activity_id) === 1
                                        &&
                                        <div>
                                            <label htmlFor="step" className="text-xs text-gray-500">Steps</label>
                                            <input type="number" min={1} max={100000} name="step" className={`w-full rounded border-0 border-b-2 ${errors.step ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-xs basis-1/3 `} placeholder="Steps" value={data.step} onChange={handleChange}/>
                                            <div className="col-start-5 col-span-8">{errors.step && <InputError message={errors.step}/>}</div>
                                        </div>
                                        }
                                        {
                                        parseInt(data.activity_id) !== 3
                                        &&
                                        <div>
                                            <label htmlFor="distance" className="text-xs text-gray-500">Distance (Km)</label>
                                            <input type="number" min={1} max={100000} name="distance" className={`w-full rounded border-0 border-b-2 ${errors.distance ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-xs basis-1/3 `} placeholder="Distances" value={data.distance} onChange={handleChange}/>
                                            <div className="col-start-5 col-span-8">{errors.distance && <InputError message={errors.distance}/>}</div>
                                        </div>
                                        }
                                        {
                                        parseInt(data.activity_id) === 3
                                        &&
                                        <div>
                                            <label htmlFor="Time" className="text-xs text-gray-500">Time (min)</label>
                                            <input type="number" min={1} max={100000} name="time" className={`w-full rounded border-0 border-b-2 ${errors.time ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-xs basis-1/3 `} placeholder="times" value={data.time} onChange={handleChange}/>
                                            <div className="col-start-5 col-span-8">{errors.time && <InputError message={errors.time}/>}</div>
                                        </div>
                                        }
                                        <div>
                                            <label htmlFor="calories" className="text-xs text-gray-500">Calories (KCal)</label>
                                            <input type="number" min={1} max={100000} name="calories" className={`w-full rounded border-0 border-b-2 ${errors.calories ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-xs basis-1/3 `} placeholder="calories" value={data.calories} onChange={handleChange}/>
                                            <div className="col-start-5 col-span-8">{errors.calories && <InputError message={errors.calories}/>}</div>
                                        </div>
                                        <div>
                                            <label htmlFor="activity_date" className="text-xs text-gray-500">Acitivty Date</label>
                                            <input type="date" name="activity_date" className={`w-full rounded border-0 border-b-2 ${errors.activity_date ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-sm `} value={data.activity_date} onChange={handleChange}/>
                                            <div className="col-start-5 col-span-8">{errors.activity_date && <InputError message={errors.activity_date}/>}</div>
                                        </div>
                                        <div>
                                            <label htmlFor="caption" className="text-xs text-gray-500">Caption</label>
                                            <input type="text" name="caption" className={`w-full rounded border-0 border-b-2 ${errors.caption ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-sm`} placeholder="What do you want to say about your activity?" value={data.caption} onChange={handleChange}/>
                                            <div className="col-start-5 col-span-8">{errors.caption && <InputError message={errors.caption}/>}</div>
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="ap-input-edit" className={`border bg-white ${errors.activity_picture ? "border-red-500 border-b-2" : "border-slate-300"} p-1 rounded-md cursor-pointer hover:bg-slate-200`}><FontAwesomeIcon icon={faImage} size="lg"/></label>
                                            <div className="col-start-5 col-span-8">{errors.activity_picture && <InputError message={errors.activity_picture}/>}</div>
                                            <input type="file" id="ap-input-edit" accept="image/*" className="invisible" onChange={handlePicture}/>
                                            {check ?
                                                <div className="absolute left-6 bottom-4 text-green-500"><FontAwesomeIcon icon={faCircleCheck} /></div>
                                                :
                                                null
                                            }
                                        </div>
                                        <div className="flex justify-center gap-4">
                                            <a className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer" onClick={onClose}>
                                                Cancel
                                            </a>
                                            <button type="submit" className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default PopupPost;
