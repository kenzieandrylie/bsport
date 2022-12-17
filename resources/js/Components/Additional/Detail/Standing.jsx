import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from '@inertiajs/inertia-react';

const Standing = ({group,topthree}) => {
    return (
        <>
            <div className="bg-white rounded-lg p-3 border flex flex-col gap-2">

                <div className="w-full text-center">
                    <span className="font-bold text-lg">Leaderboards</span>
                </div>

                <div className="flex justify-around h-56">
                    <div className="flex flex-col justify-between items-center gap-1 basis-1/3">
                        <div className="text-slate-300">
                            <FontAwesomeIcon icon={faMedal} size="2xl"/>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-center">
                                <span>{topthree.length > 1 ? topthree[1].username : null}</span>
                            </div>
                            <div className="w-16 h-24 bg-lime-400 rounded-md">
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center gap-1 basis-1/3">
                        <div className='text-yellow-400'>
                            <FontAwesomeIcon icon={faMedal} size="3x"/>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-center">
                                <span>{topthree.length > 0 ? topthree[0].username : null}</span>
                            </div>
                            <div className="w-16 h-32 bg-lime-400 rounded-md">
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center gap-1 basis-1/3">
                        <div className="text-amber-600">
                            <FontAwesomeIcon icon={faMedal} size="2xl"/>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-center">
                                <span>{topthree.length > 2 ? topthree[2].username : null}</span>
                            </div>
                            <div className="w-16 h-16 bg-lime-400 rounded-md">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4 text-sky-500 hover:text-sky-600">
                    <Link href={`/leaderboards/${group.pin}`}>
                        <span>See more</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Standing;
