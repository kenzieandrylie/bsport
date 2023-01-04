import { faBicycle,faPersonRunning, faDumbbell,faShoePrints, faRoad, faFireFlameCurved, faStopwatch, faHeart  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia,useForm} from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react';
import PopupComment from '../Modal/PopupComment';
import PopupPost from '../Modal/PopupPost';
import PopupUser from '../Modal/PopupUser';


const PostActivity = ({post,likes,auth, types, comments}) => {

    const [type, setType] = useState('');
    const [labelpop, setLabelpop] = useState('');
    const [datapop, setDatapop] = useState([]);
    const [isopen, setIsopen] = useState(false);

    const [typepost, setTypepost] = useState('');
    const [isopenpost, setIsopenpost] = useState(false);
    const [datapost, setDatapost] = useState([]);

    const [isopencomment, setIsopencomment] = useState(false);
    const [datacomment, setDatacomment] = useState([]);
    const [idpostcomment, setIdpostcomment] = useState('');

    const {data,setData,post:store, processing, errors, reset,delete:destroy} = useForm({
        post_id:''
    });

    const handleLike = () => {
        setData('post_id',post.id);
        setType('like');
    }

    const handleUnlike = () => {
        setData('post_id',post.id);
        setType('unlike');
    }

    const handlePop = () => {
        setLabelpop('Likes');
        setDatapop(likes);
        setIsopen(true);
    }

    const clearViewState = () => {
        setIsopen(false);
    }

    useEffect(() => {
        if(type === 'like'){
            store(route('like'), {preserveScroll: true});
        }
        else if(type === 'unlike'){
            destroy(route('unlike'), {preserveScroll: true});
        }
    },[type])

    const handlePoppost = (type) => {
        setIsopenpost(true);
        setTypepost(type);
        setDatapost(post);
    }

    const handlePopcomment = () => {
        setIdpostcomment(post.id);
        setDatacomment(comments);
        setIsopencomment(true);
    }

    useEffect(() => {
        // Ketika props `comments` bertambah, kita setdatacomment dengan data `comments` yang baru, sehingga langsung muncul di pop up.
        setDatacomment(comments);
    }, [comments]);

    let date = new Date(Date.parse(post.created_at));
    date.setHours(date.getHours() + 7);
    const formatted_post_created_at = date.toLocaleString();

    return (
        <>
        <PopupComment open={isopencomment} onClose={() => setIsopencomment(false)} idpost={idpostcomment} comments={datacomment}/>
        <PopupPost open={isopenpost} post={datapost} type={typepost} onClose={() => setIsopenpost(false)} activitytypes={types}/>
        <PopupUser open={isopen} users={datapop} label={labelpop} onClose={clearViewState}/>
            <div className=" rounded-xl overflow-hidden border w-full bg-white mx-3 mx-0 lg:mx-0 p-4 mb-4">

                <div className="rounded-xl">

                    {
                    post.user_id === auth.user.id &&
                        <div className="flex justify-end">
                            <div className="dropdown dropdown-end dropdown-hover">
                                <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>

                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-50 absolute">
                                    <li><span onClick={() => handlePoppost('edit')}>Edit</span></li>
                                    <li className="text-red-500"><span onClick={() => handlePoppost('delete')}>Delete</span></li>
                                </ul>
                            </div>
                        </div>
                    }

                    <div className="w-full">

                        <div className="flex basis-full">
                            <div className="flex items-center p-5">
                                <div className="rounded-full h-12 w-12 flex items-center justify-center overflow-hidden">
                                    <img src={post.profile_picture ? `../storage/${post.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profilepic" />
                                </div>
                            </div>
                            <div className="basis-full">
                                <div className="ml-3 flex flex-col">
                                    <div className="text-lg font-bold text-sky-500">
                                        <span className="mr-2">{post.username} </span>
                                        { post.activity_id === 1 && <FontAwesomeIcon icon={faPersonRunning}/> }
                                        { post.activity_id === 2 && <FontAwesomeIcon icon={faBicycle}/> }
                                        { post.activity_id === 3 && <FontAwesomeIcon icon={faDumbbell}/> }

                                    </div>
                                    <span className="text-xs text-gray-400">Published in:
                                        <span className="font-bold mr-2"> {post.group_name}</span>  at: <span className="font-bold">{formatted_post_created_at}</span></span>
                                </div>
                                <div className="flex justify-around items-center p-3 w-full">
                                    {post.activity_id === 1 &&
                                    <div className="flex flex-col gap-2">
                                        <FontAwesomeIcon icon={faShoePrints} size="sm"/>
                                        <span>{post.step} Steps</span>
                                    </div>
                                    }
                                    {post.activity_id !== 3 &&
                                    <div className="flex flex-col gap-2">
                                        <FontAwesomeIcon icon={faRoad} size="sm"/>
                                        <span>{post.distance} Km</span>
                                    </div>
                                    }

                                    <div className="flex flex-col gap-2">
                                        <FontAwesomeIcon icon={faFireFlameCurved} size="sm"/>
                                        <span>{post.calories} Cal</span>
                                    </div>
                                    {post.activity_id === 3  &&
                                    <div className="flex flex-col gap-2">
                                        <FontAwesomeIcon icon={faStopwatch} size="sm"/>
                                        <span>{post.time} Mins</span>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <span>{post.caption}</span>
                        </div>

                        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded"><i className="fas fa-ellipsis-h pt-2 text-lg"></i></span>

                        </div>
                            <img className="w-full bg-cover rounded-md" src={`../storage/${post.activity_picture}`} />
                        <div className="px-3 pb-2">

                        <div className="flex justify-between items-center w-full">
                            <div className="pt-2 flex items-center">
                                {
                                    likes.find(e => e.user_id === auth.user.id) ?
                                    <>
                                    <span className="cursor-pointer text-red-500"><FontAwesomeIcon icon={faHeart} size="sm" onClick={handleUnlike}/></span>
                                    </>
                                    :
                                    <>
                                    <span className="cursor-pointer text-slate-300 hover:text-red-300 transition duration-150 ease-out"><FontAwesomeIcon icon={faHeart} size="sm" onClick={handleLike}/></span>
                                    </>
                                }

                                <span className="text-sm text-gray-400 font-medium ml-2 cursor-pointer hover:text-gray-500" onClick={handlePop}>{likes.length} likes</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400">Activity Date: {post.activity_date}</span>
                            </div>
                            <div>
                                <span className="text-sm text-gray-400 font-bold cursor-pointer hover:text-gray-500" onClick={handlePopcomment}>({comments.length}) Comments</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default PostActivity;
