import { faPersonRunning, faDumbbell, faBicycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TotalActivity = ({posts}) => {

    // console.log('filter : ',posts.filter((post) => post.activity_id === 2))
    return (
        <>
            <div className="bg-white divide-y divide-blue-300 border rounded-xl p-3">
                <div className="rounded-xl">
                    <div className="p-3 shadow-md">
                        <span className="uppercase text-lg font-bold">Total Activity</span>
                    </div>
                    <div className="p-3">
                        <div className="hover:text-sky-500">
                            <div className="grid grid-cols-3 flex items-center w-1/2 gap-4">
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faPersonRunning} size="2xl"/>
                                </div>
                                <span className="col-span-2">{posts.filter((post) => post.activity_id === 1).length} Times</span>
                            </div>
                        </div>
                        <div className="hover:text-sky-500">
                            <div className="grid grid-cols-3 flex items-center w-1/2 gap-4">
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faDumbbell} size="2xl"/>
                                </div>
                                <span className="col-span-2">{posts.filter((post) => post.activity_id === 3).length} Times</span>
                            </div>
                        </div>
                        <div className="hover:text-sky-500">
                            <div className="grid grid-cols-3 flex items-center w-1/2 gap-4">
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faBicycle} size="2xl"/>
                                </div>
                                <span className="col-span-2">{posts.filter((post) => post.activity_id === 2).length} Times</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TotalActivity;
