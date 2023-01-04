import CreatePost from "@/Components/Additional/Detail/CreatePost";
import GroupInfo from "@/Components/Additional/Detail/GroupInfo";
import GroupMember from "@/Components/Additional/Detail/GroupMember";
import MyStat from "@/Components/Additional/Detail/MyStat";
import Standing from "@/Components/Additional/Detail/Standing";
import PostActivity from "@/Components/Additional/Profile/PostActivity";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { faRotateRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GroupDetail = (props) => {

    // console.log("Group Detail Page: ",props);

    const [num, setNum] = useState(3);
    const [loading, setLoading] = useState(false);
    const loadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setNum((prev) => prev + num);
            setLoading(false);
        }, 1000);
    }
    const slicedPost = props.posts.slice(0,num);

    useEffect(() => { //infinite scroll
        window.onscroll = () => {
            //console.log("window",window.innerHeight + document.documentElement.scrollTop , document.documentElement.offsetHeight);
          if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight
          ) {
            loadMore();
          }
        };
      }, []);

    return (
        <>
            <Head title={`Group | ${props.group.name}`} />
            <UserLayout
                auth={props.auth}
                users={props.users}
                notifications={props.notifications}
            >
                <div className="grid grid-cols-4 gap-4 mx-4 mt-4 mb-4">
                    <div className="col-span-full lg:col-span-1">
                        <MyStat auth={props.auth.user} sum={props.sum} posts={props.posts}/>
                    </div>
                    <div className="col-span-full lg:col-span-2">
                        <CreatePost auth={props.auth.user} types={props.activities} flash={props.flash.message} mymemberid={props.mymemberid}/>
                    </div>
                    <div className="col-span-full lg:col-span-1 lg:row-span-2">
                        <div className="mb-4">
                            <GroupInfo group={props.group}/>
                        </div>
                        <div>
                            <GroupMember users={props.members}/>
                        </div>
                    </div>
                    <div className="col-span-full lg:col-span-1 lg:sticky lg:top-24">
                        <Standing group={props.group} topthree={props.topthree}/>
                    </div>
                    <div className="col-span-full lg:col-span-2 lg:col-start-2 lg:row-span-2">
                    {
                        slicedPost.length > 0 ?
                        slicedPost.map((post,i) => {
                           return (
                            <div key={i}>
                                <PostActivity
                                    post={post}
                                    likes={props.likes.filter((like) => like.group_activity_id === post.id)}
                                    auth={props.auth}
                                    types={props.activities}
                                    comments={props.comments.filter((comment) => comment.group_activity_id === post.id)}
                                />
                            </div>
                           )
                        }
                        ) : <div className="ml-4"><span>There's no post yet!</span></div> }

                        <div className="flex justify-center mb-4">
                                {num <= props.posts.length &&
                                    <div onClick={loadMore} className="cursor-pointer">
                                        <FontAwesomeIcon icon={loading ? faSpinner : faRotateRight} className={`${loading && 'animate-spin'}`} size="lg"/>
                                    </div>
                                }
                        </div>
                    </div>


                </div>

            </UserLayout>
        </>
    )

}

export default GroupDetail;
