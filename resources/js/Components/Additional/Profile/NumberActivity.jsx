import { faShoePrints, faRoad, faFireFlameCurved, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NumberActivity = () => {
    return (
        <>
            <div className="bg-white rounded-xl p-3">
                <div className="rounded-xl">
                    <div className="p-3 shadow-md">
                        <span className="uppercase text-lg font-bold">Activity in Number</span>
                    </div>
                    <div className="p-3">
                        <div className="flex hover:text-sky-500">
                            <div className="basis-1/3 flex items-center justify-between">
                                <FontAwesomeIcon icon={faShoePrints} size="2xl"/>
                                <span>0 Steps</span>
                            </div>
                        </div>
                        <div className="flex hover:text-sky-500">
                            <div className="basis-1/3 flex items-center justify-between">
                                <FontAwesomeIcon icon={faRoad} size="2xl"/>
                                <span>0 Km</span>
                            </div>
                        </div>
                        <div className="flex hover:text-sky-500">
                            <div className="basis-1/3 flex items-center justify-between">
                                <FontAwesomeIcon icon={faFireFlameCurved} size="2xl"/>
                                <span>0 KCal</span>
                            </div>
                        </div>
                        <div className="flex hover:text-sky-500">
                            <div className="basis-1/3 flex items-center justify-between">
                                <FontAwesomeIcon icon={faStopwatch} size="2xl"/>
                                <span>0 Mins</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NumberActivity;
