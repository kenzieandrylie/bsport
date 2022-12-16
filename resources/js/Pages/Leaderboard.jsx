import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";

const Leaderboard = (props) => {

    console.log("Leaderboard Page : ", props.values[0])

    return (
        <>
            <UserLayout
            auth={props.auth}
            users={props.users}
            notifications={props.notifications}>

            <Head title="Leaderboard" />

                <div className="p-8">
                    <div className="bg-white w-full h-full border rounded-lg">
                        <div className="flex items-center justify-between p-4 shadow-md">
                            <div>
                                <span className="font-bold text-xl ml-4">
                                    Leaderboard of <Link href={`/groups/${props.group.pin}`}><span className="text-sky-500 hover:text-sky-600">{props.group.name}</span></Link>
                                    </span>
                            </div>
                            <div className="flex basis-1/4 justify-around">
                                <div>
                                    <label className="label">
                                        <span className="label-text-alt">Filter by</span>
                                    </label>
                                    <select className="select select-ghost w-full max-w-xs" defaultValue={0}>
                                        <option value={0}>All Month</option>
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text-alt">Sort by</span>
                                    </label>
                                    <select className="select select-ghost w-full max-w-xs" defaultValue={'calories'}>
                                        <option value={'calories'}>Calories</option>
                                        <option value={'step'} >Step</option>
                                        <option value={'distance'}>Distance</option>
                                        <option value={'time'}>Time</option>
                                    </select>
                                </div>

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
                                                            <tr key={i+1}>
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

                                                {/* <tr>
                                                    <td className="p-6">
                                                        <div className='text-slate-300'>
                                                            <FontAwesomeIcon icon={faMedal} size="2x"/>
                                                        </div>
                                                    </td>
                                                    <td className="text-md p-6">
                                                        <div className="flex items-center gap-4">
                                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className="h-12 w-12 rounded-full"/>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold">Pekianto</span>
                                                                <span className="text-sm text-slate-500">pekianto</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-md p-6">80</td>
                                                    <td className="text-md p-6">80</td>
                                                    <td className="text-md p-6">0</td>
                                                    <td className="text-md p-6">120</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-6">
                                                        <div className='text-amber-600'>
                                                            <FontAwesomeIcon icon={faMedal} size="2x"/>
                                                        </div>
                                                    </td>
                                                    <td className="text-md p-6">
                                                        <div className="flex items-center gap-4">
                                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className="h-12 w-12 rounded-full"/>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold">Davin Haryadi</span>
                                                                <span className="text-sm text-slate-500">davinharyadi</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-md p-6">50</td>
                                                    <td className="text-md p-6">50</td>
                                                    <td className="text-md p-6">0</td>
                                                    <td className="text-md p-6">70</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-6"><span className="ml-3 font-bold">4</span></td>
                                                    <td className="text-md p-6">
                                                        <div className="flex items-center gap-4">
                                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className="h-12 w-12 rounded-full"/>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold">Bluedrinkers Aja</span>
                                                                <span className="text-sm text-slate-500">bluedrinkers</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-md p-6">30</td>
                                                    <td className="text-md p-6">30</td>
                                                    <td className="text-md p-6">0</td>
                                                    <td className="text-md p-6">20</td>
                                                </tr> */}
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
