import { faPersonRunning, faDumbbell, faBicycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TotalActivity = () => {
    return (
        <>
            <div className="bg-white divide-y divide-blue-300 border rounded-xl p-3">
                <div className="rounded-xl">
                    <div className="p-3 shadow-md">
                        <span className="uppercase text-lg font-bold">Total Activity</span>
                    </div>
                    <div className="p-3">
                        <div className="flex hover:text-sky-500">
                            <div className="basis-1/3 flex items-center justify-between">
                                <FontAwesomeIcon icon={faPersonRunning} size="2xl"/>
                                <span>0 Times</span>
                            </div>
                        </div>
                        <div className="flex hover:text-sky-500">
                            <div className="basis-1/3 flex items-center justify-between">
                                <FontAwesomeIcon icon={faDumbbell} size="2xl"/>
                                <span>0 Times</span>
                            </div>
                        </div>
                        <div className="flex hover:text-sky-500">
                            <div className="basis-1/3 flex items-center justify-between">
                                <FontAwesomeIcon icon={faBicycle} size="2xl"/>
                                <span>0 Times</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TotalActivity;
