import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning, faDumbbell, faBicycle, faImage, faCircleCheck, faPerson  } from '@fortawesome/free-solid-svg-icons';
import { React,useState,useEffect } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";

const CreatePost = ({auth, types, flash, mymemberid,groupName}) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        group_member_id: mymemberid,
        activity_id: 1,
        distance: '',
        step: '',
        time: '',
        calories: 0,
        activity_date : '',
        activity_picture : '',
        caption: '',
        group_id:''
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const [check, setCheck] = useState(false);

    const handlePicture = (e) => {
        const imageFiles = e.target.files;
        setCheck(true);
        setData('activity_picture',imageFiles[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('create.post'), {
            preserveScroll: true,
            onSuccess: (() => {reset(), setCheck(false)})
        });
    }

    useEffect(() => {
        reset('calories','distance','step','time','activity_date');
    },[data.activity_id])

    useEffect(() => {
        if(!data.distance || !data.time){
            setData('calories', data.activity_id === 3 ? Math.ceil(data.time * 3.71) : data.activity_id === 2 ? (data.distance * 32) : data.activity_id === 1 ? (data.distance * 60) : null)
        }
    }, [data.distance, data.time])

    // useEffect(()=>{
    //     console.log(data.group_id);
    // });

    return (
        <>
            <div className="bg-white rounded-lg p-3 border flex flex-col gap-4">
                <div className="w-full">
                    <span className="font-bold text-lg">Post Activity</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-6 grid-rows-4 gap-2">
                        <div className="col-span-full lg:col-span-3 row-span-2">
                            <div>
                                <label htmlFor="type" className="col-span-4 pt-3 pb-2 text-sm text-gray-500">Choose Activity</label>
                            </div>
                            <div className="flex justify-between items-center gap-2 mt-2">
                                {types.map((type, i) => {
                                    return (
                                        <div key={i} className={`basis-1/3 rounded-md border-2 p-1 ${data.activity_id === type.id ? "bg-sky-500 text-white" : "border-sky-500 text-sky-500"} hover:bg-sky-500 hover:text-white transition duration-150 ease-out cursor-pointer`} onClick={() => {setData('activity_id', type.id)}}>
                                            <div className="flex flex-col item-center text-center justify-center">
                                                {type.id === 1 ? <FontAwesomeIcon icon={faPersonRunning} size="xl"/>
                                                :
                                                type.id === 2 ? <FontAwesomeIcon icon={faBicycle} size="xl"/>
                                                :
                                                type.id === 3 ? <FontAwesomeIcon icon={faDumbbell} size="xl"/>
                                                :
                                                null
                                                }
                                                <span>{type.name}</span>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>

                        <div className="col-span-full lg:col-span-3 row-span-2">
                            <div className="flex justify-between items-center gap-4">
                                {data.activity_id === 1 ?
                                    <div>
                                        <input type="number" min={1} name="step" className={`w-full rounded border-0 border-b-2 ${errors.step ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-xs basis-1/3 `} placeholder="Steps" value={data.step} onChange={handleChange}/>
                                    </div>
                                : null
                                }
                                {data.activity_id !== 3 ?
                                    <div>
                                        <input type="number" min={1} name="distance" className={`w-full rounded border-0 border-b-2 ${errors.distance ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-xs basis-1/3 `} placeholder="Distance (Km)" value={data.distance} onChange={handleChange}/>
                                    </div>
                                :
                                    null
                                }
                                {data.activity_id === 3 ?
                                    <div>
                                        <input type="number" min={1} name="time" className={`w-full rounded border-0 border-b-2 ${errors.time ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-xs basis-1/3 `} placeholder="Times (Mins)" value={data.time} onChange={handleChange}/>
                                    </div>
                                :
                                    null
                                }
                                <div className="flex w-3/4 relative justify-center">
                                    <input type="number" min={1} name="calories" className={`w-full basis-1/2 rounded border-0 border-b-2 ${errors.calories ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-xs basis-1/2 `} placeholder="Calories (Kcal)" value={data.calories} onChange={handleChange} disabled/>
                                    <div className="flex -mr-px basis-1/3">
                                        <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 w-full border-grey-light px-3 whitespace-no-wrap text-grey-dark text-xs bg-slate-200">Calories</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center h-2/3">
                                <div className="w-full ">
                                    <input type="date" name="activity_date" className={`w-full rounded border-0 border-b-2 ${errors.activity_date ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-sm `} value={data.activity_date} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 lg:row-span-4 flex justify-center items-center">
                            <img src={auth.profile_picture ? `../storage/${auth.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="rounded-full h-10 w-10 lg:h-20 lg:w-20"/>
                        </div>
                        <div className="col-span-5 lg:row-span-4 flex flex-col gap-3">
                            {mymemberid===null &&
                                <div className="w-1/2 lg:w-full flex gap-4 items-center">
                                    <label className="col-span-5 text-sm text-gray-500" htmlFor="selectGroup">Choose Group</label>
                                    <select className = {`select select-ghost select-sm w-full max-w-xs text-xs ${errors.group_member_id ? "border-red-500" : "border-slate-300"}` } name="group_id" id="" onChange={handleChange}>

                                    <option value="" selected={!data.group_id && true}> <span className="text-gray-500">Select Group</span> </option>
                                        {groupName.length>0 && groupName.map((data,i)=>{
                                                return (
                                                <option value={data.id}>{data.name}</option>
                                                )
                                        })}

                                    </select>
                                </div>
                            }
                            <div className="w-full">
                                <input type="text" name="caption" className={`w-full rounded border-0 border-b-2 ${errors.caption ? "border-red-500" : "border-slate-300"} focus:border-indigo-500 focus:ring-indigo-500 text-sm`} placeholder="What do you want to say about your activity?" value={data.caption} onChange={handleChange}/>
                            </div>
                            <div className="flex justify-between flex-col lg:flex-row">
                                <div className="relative">
                                    <label htmlFor="ap-input" className={`border bg-white ${errors.activity_picture ? "border-red-500 border-b-2" : "border-slate-300"} p-1 rounded-md cursor-pointer hover:bg-slate-200`}><FontAwesomeIcon icon={faImage} size="lg"/></label>
                                    <input type="file" id="ap-input" accept="image/*" className="invisible" onChange={handlePicture}/>
                                    {check ?
                                        <div className="absolute left-6 bottom-3 lg:bottom-0 text-green-500"><FontAwesomeIcon icon={faCircleCheck} /></div>
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

            {Object.keys(errors).length > 0 ?
                <div className="bg-white rounded-md p-2 border mt-2">
                    <InputError message={errors.step} />
                    <InputError message={errors.distance} />
                    <InputError message={errors.time} />
                    <InputError message={errors.calories} />
                    <InputError message={errors.captions} />
                    <InputError message={errors.activity_date} />
                    <InputError message={errors.activity_picture} />
                    <InputError message={errors.group_member_id}/>
                </div>
            : null}

            {flash &&
                <div className="bg-white rounded-md p-2 border border-green-500 mt-2">
                    <span className="text-md text-green-500"> {flash}</span>
                </div>}
        </>
    )
}

export default CreatePost;
