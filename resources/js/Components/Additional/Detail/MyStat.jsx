import { Link } from "@inertiajs/inertia-react";
import { faShoePrints, faRoad, faFireFlameCurved, faStopwatch, faPersonRunning, faDumbbell, faBicycle  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyStat = ({auth, sum, posts}) => {
    return (
        <>
            <div className="bg-white rounded-lg p-3 border">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div>
                        <img src={auth.profile_picture ? `../storage/${auth.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-20 w-20 rounded-full border-2 border-sky-500" />
                    </div>
                    <div className="flex flex-col text-center">
                        <span className="text-xl font-bold">{auth.name + ' ' + auth.last_name}</span>
                        <span>{auth.username}</span>
                    </div>
                    <div>
                        <Link href={route('index.edit.profile')}>
                            <span className="text-sky-500 hover:text-sky-600">Edit profile</span>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                    <div className="w-full mb-5 border flex flex-col gap-2">
                        <div className="text-center">
                            <span className="font-bold">Total Activity</span>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="grid grid-cols-2">
                                <FontAwesomeIcon icon={faPersonRunning} size="lg" className="text-sky-500"/>
                                <span>{posts.filter((post) => parseInt(post.activity_id) === 1 && parseInt(post.user_id) === parseInt(auth.id)).length} Times</span>
                            </div>
                            <div className="grid grid-cols-2">
                                <FontAwesomeIcon icon={faDumbbell} size="lg" className="text-sky-500"/>
                                <span>{posts.filter((post) => parseInt(post.activity_id) === 3 && parseInt(post.user_id) === parseInt(auth.id)).length} Times</span>
                            </div>
                            <div className="grid grid-cols-2">
                                <FontAwesomeIcon icon={faBicycle} size="lg" className="text-sky-500"/>
                                <span>{posts.filter((post) => parseInt(post.activity_id) === 2 && parseInt(post.user_id) === parseInt(auth.id)).length} Times</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full justify-around text-sm">
                        <div className="flex flex-col gap-2">
                            <FontAwesomeIcon icon={faShoePrints} size="lg" className="text-sky-500"/>
                            <span>{sum.sumstep} Steps</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <FontAwesomeIcon icon={faRoad} size="lg" className="text-sky-500"/>
                            <span>{sum.sumdistance} Km</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <FontAwesomeIcon icon={faFireFlameCurved} size="lg" className="text-sky-500"/>
                            <span>{sum.sumcalories} Cal</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <FontAwesomeIcon icon={faStopwatch} size="lg" className="text-sky-500"/>
                            <span>{sum.sumtime} Mins</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyStat;
