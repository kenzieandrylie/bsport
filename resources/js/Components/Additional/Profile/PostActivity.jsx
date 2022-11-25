import { faBicycle,faShoePrints, faRoad, faFireFlameCurved, faStopwatch, faHeart  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostActivity = () => {
    return (
        <>
            <div className=" rounded-xl overflow-hidden border w-full bg-white mx-3 mx-0 lg:mx-0 p-4 mb-4">

                <div className="rounded-xl">

                    {/* <div className="flex justify-end">
                        <div className="dropdown dropdown-end dropdown-hover">
                            <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>

                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-50 absolute">
                                <li><a href="">Edit</a></li>
                                <li className="text-red-500"><a href="">Delete</a></li>
                            </ul>
                        </div>
                    </div> */}

                    <div className="w-full">

                        <div className="flex basis-full">
                            <div className="flex items-center p-5">
                                <div className="rounded-full h-12 w-12 flex items-center justify-center overflow-hidden">
                                    <img src="https://avatars0.githubusercontent.com/u/38799309?v=4" alt="profilepic" />
                                </div>
                            </div>
                            <div className="basis-full">
                                <div className="ml-3 flex flex-col">
                                    <div className="text-lg font-bold text-sky-500">
                                        <span className="mr-2"> 2301911060 - Kenzie Andrylie </span>
                                        <FontAwesomeIcon icon={faBicycle}/>
                                    </div>
                                    <span className="text-xs text-gray-400">Published: Tue, 22 Nov 2022, 11:03:59</span>
                                </div>
                                <div className="flex justify-around items-center p-3 w-full">
                                    <div className="flex flex-col gap-2">
                                        <FontAwesomeIcon icon={faShoePrints} size="sm"/>
                                        <span>0 Steps</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <FontAwesomeIcon icon={faRoad} size="sm"/>
                                        <span>0 Km</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <FontAwesomeIcon icon={faFireFlameCurved} size="sm"/>
                                        <span>0 KCal</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <FontAwesomeIcon icon={faStopwatch} size="sm"/>
                                        <span>0 Mins</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <span>Deskripsi Kegiatan Ku di Hari ini sangat senang</span>
                        </div>

                        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded"><i className="fas fa-ellipsis-h pt-2 text-lg"></i></span>

                        </div>
                            <img className="w-full bg-cover rounded-md" src="https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG" />
                        <div className="px-3 pb-2">

                        <div className="pt-2 flex items-center">
                            <FontAwesomeIcon icon={faHeart} size="sm"/>
                            <span className="text-sm text-gray-400 font-medium ml-2">12 likes</span>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default PostActivity;
