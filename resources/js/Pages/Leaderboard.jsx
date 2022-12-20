import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";

const Leaderboard = (props) => {

    console.log("Leaderboard Page : ", props)

    const { data, setData, get, processing, errors, reset } = useForm({
        sortby: props.p_sort,
        filterby: props.p_filter
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        get(`/leaderboards/${props.group.pin}`);
    }

    return (
        <>
            <UserLayout
            auth={props.auth}
            users={props.users}
            notifications={props.notifications}>

            <Head title={`Leaderboard | ${props.group.name}`} />

                <div className="p-8">
                    <div className="bg-white w-full h-full border rounded-lg">
                        <div className="flex items-center justify-between p-4 shadow-md">
                            <div>
                                <span className="font-bold text-xl ml-4">
                                    Leaderboard of <Link href={`/groups/${props.group.pin}`}><span className="text-sky-500 hover:text-sky-600">{props.group.name}</span></Link>
                                    </span>
                            </div>
                            <div className="basis-1/3">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex justify-around items-center">
                                        <div>
                                            <label className="label">
                                                <span className="label-text-alt">Filter by</span>
                                            </label>
                                            <select className="select select-ghost w-full max-w-xs" defaultValue={data.filterby} name="filterby" onChange={handleChange}>
                                                <option value={0}>All Month</option>
                                                <option value={1}>January</option>
                                                <option value={2}>February</option>
                                                <option value={3}>March</option>
                                                <option value={4}>April</option>
                                                <option value={5}>May</option>
                                                <option value={6}>June</option>
                                                <option value={7}>July</option>
                                                <option value={8}>August</option>
                                                <option value={9}>September</option>
                                                <option value={10}>October</option>
                                                <option value={11}>November</option>
                                                <option value={12}>December</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="label-text-alt">Sort by</span>
                                            </label>
                                            <select className="select select-ghost w-full max-w-xs" defaultValue={data.sortby} name="sortby" onChange={handleChange}>
                                                <option value={'calories'}>Calories</option>
                                                <option value={'step'} >Step</option>
                                                <option value={'distance'}>Distance</option>
                                                <option value={'duration'}>Time</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Apply</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>

                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden p-4">
                                        <table className="min-w-full">
                                            <thead className="bg-white border-b border-sky-500">
                                                <tr>
                                                    <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/12">
                                                        Rank
                                                    </th>
                                                    <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/2">
                                                        Name
                                                    </th>
                                                    <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/8">
                                                        Steps
                                                    </th>
                                                    <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/8">
                                                        Distance
                                                    </th>
                                                    <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/8">
                                                        Duration
                                                    </th>
                                                    <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/8">
                                                        Calories
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="text-left divide-y divide-slate-200">
                                                {props.values.map((value,i) => {
                                                    return(
                                                        <>
                                                            <tr key={i+1} className={`${value.user_id === props.auth.user.id ? "bg-sky-100" : "bg-white"}`}>
                                                                <td className="p-6">
                                                                    <div className={`${
                                                                            i === 0 ? "text-yellow-400"
                                                                            :
                                                                            i === 1 ? "text-slate-300"
                                                                            :
                                                                            i === 2 ? "text-amber-600"
                                                                            :
                                                                            null
                                                                        }`}>

                                                                        {
                                                                        i < 3 ? <FontAwesomeIcon icon={faMedal} size="2x"/>
                                                                        :
                                                                        <span className="ml-3 font-bold">{i+1}</span>
                                                                        }

                                                                    </div>
                                                                </td>
                                                                <td className="text-md p-6">
                                                                    <div className="flex items-center gap-4">
                                                                        <img src={value.profile_picture ? `../storage/${value.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-12 w-12 rounded-full"/>
                                                                        <div className="flex flex-col">
                                                                            <span className="font-bold">{value.name + ' ' + value.last_name}</span>
                                                                            <span className="text-sm text-slate-500">{value.username}</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-md p-6">{value.step}</td>
                                                                <td className="text-md p-6">{value.distance}</td>
                                                                <td className="text-md p-6">{value.duration}</td>
                                                                <td className="text-md p-6">{value.calories}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </UserLayout>
        </>
    )
}

export default Leaderboard;
