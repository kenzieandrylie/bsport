import { faShoePrints, faRoad, faFireFlameCurved, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NumberActivity = ({sum}) => {
    return (
        <>
            <div className="bg-white rounded-xl p-3">
                <div className="rounded-xl">
                    <div className="p-3 shadow-md">
                        <span className="uppercase text-lg font-bold">Activity in Number</span>
                    </div>
                    <div className="p-3">
                        <div className="hover:text-sky-500">
                            <div className="grid grid-cols-3 flex items-center w-1/2 gap-4">
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faShoePrints} size="2xl"/>
                                </div>
                                <span className="col-span-2">{sum.sumstep} Steps</span>
                            </div>
                        </div>
                        <div className="hover:text-sky-500">
                            <div className="grid grid-cols-3 flex items-center w-1/2 gap-4">
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faRoad} size="2xl"/>
                                </div>
                                <span className="col-span-2">{sum.sumdistance} Km</span>
                            </div>
                        </div>
                        <div className="hover:text-sky-500">
                            <div className="grid grid-cols-3 flex items-center w-1/2 gap-4">
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faFireFlameCurved} size="2xl"/>
                                </div>
                                <span className="col-span-2">{sum.sumcalories} Cal</span>
                            </div>
                        </div>
                        <div className="hover:text-sky-500">
                            <div className="grid grid-cols-3 flex items-center w-1/2 gap-4">
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faStopwatch} size="2xl"/>
                                </div>
                                <span className="col-span-2">{sum.sumtime} Mins</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NumberActivity;
