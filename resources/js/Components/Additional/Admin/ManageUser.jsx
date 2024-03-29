import { useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { faArrowDownAZ, faArrowUpAZ, faBackward, faForward, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";


const ManageUser = ({users,auth}) => {
    //console.log(users);
    const {data,setData,post, processing, errors, reset,delete:destroy} = useForm({
        id:'',
        role:''
    });
    const limit = 5;
    const [highOffsetUser,setHighOffsetUser] = useState(limit);
    const [lowOffsetUser,setLowOffsetUser] = useState(0);

    let paginationButtons= [];
    let currentPage =highOffsetUser/limit;

    //console.log(lowOffset,highOffset);



    const [type, setType] = useState('');
    const [query, setQuery] = useState('');
    const slicedUsers = users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase())).slice(lowOffsetUser,highOffsetUser);

    const countPages = Math.ceil(users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase())).length/limit);


    for (let index = 0; index < countPages; index++) {
        paginationButtons.push(<button className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-1/4 bg-white" onClick={()=>handlePaginationUser(3,index+1)}>
            {index+1}
        </button>);
    }

    const[isSort,setIsSort]= useState({
        username:false,
        email:false,
        role:false
    })
    const [sortOrder, setSortOrder] = useState({
        username:'asc',
        email:'asc',
        role:'asc'
    });
    const handleBan = (id) => {
        setData('id',id);
        setType('ban');
    }

    const handleUnban = (id) => {
        setData('id',id);
        setType('unban');
    }

    const handleRole = (id, role) => {
        setData({'id' : id, 'role' : role});
        setType('role');
    }
    const fetchData = async ()=>{
        const response = await Inertia.post(route('dashboard.post'),
        {"sortOrder":sortOrder,
        "isSort":isSort}
        );
        //console.log(response);
    }
    useEffect(()=>{
        fetchData();
    },[sortOrder,isSort]);

    const handleSort = (type)=>{

        if(isSort[type]){
            if(sortOrder[type]=='asc'){
                setSortOrder(values=>({
                    ...values,
                    [type] :'desc'
            }))

            }else{
                setSortOrder(values=>({
                    ...values,
                    [type] :'asc'
                }))
                isSort[type] = false;
            }

        }else{
            setIsSort({
                username:false,
                email:false,
                role:false
            });

            setIsSort(values=>({
                ...values,
                [type]:true
            }));


        }
    }
    const handlePaginationUser = (type,page)=>{
        //type:
        //1. next
        //2. prev
        //3. to page
        if(type === 1){
            setHighOffsetUser(value=>value+limit);
            setLowOffsetUser(value=>value+limit);
        }else if(type===2){
            setHighOffsetUser(value=>value-limit);
            setLowOffsetUser(value=>value-limit);
        }else if(type===3){
            // console.log("page:"+page);
            // console.log("highOffset: "+highOffsetUser);
            // console.log("lowOffset: "+lowOffsetUser);
            setHighOffsetUser(page*limit);
            setLowOffsetUser((page-1)*limit);
        }
    }
    const handleSearch= (e)=>{
        setQuery(e.target.value);

        // console.log(users.filter((user) => user.username.toLowerCase().includes(e.target.value.toLowerCase())).length);
        setHighOffsetUser(limit);
        setLowOffsetUser(0);
    }
    useEffect(() => {
        if(type === 'ban'){
            post(route('ban.user'), {preserveScroll: true});
        }
        else if(type === 'unban'){
            post(route('unban.user'), {preserveScroll: true});
        }
        else if(type === 'role'){
            post(route('change.role'), {preserveScroll: true});
        }
    },[data]);

    return (
        <>
            <div className="flex flex-col bg-white border rounded-lg">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">

                        <div className="flex justify-end items-center p-4">
                            <div className="w-1/4">
                                <input type="text" placeholder="Search user" onChange={handleSearch} name="search user" className={`col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 text-sm border-gray-300`}/>
                            </div>
                        </div>

                        <div className="overflow-hidden p-4">
                            <table className="min-w-full">
                                <thead className="border-b border-sky-500">
                                    <tr>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/8">
                                            No
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/4 flex items-center gap-2">
                                        <button className="btn btn-ghost" onClick={()=>handleSort('username')}>
                                        Username
                                           {isSort.username && ( sortOrder.username === 'asc'?
                                            <FontAwesomeIcon icon={faArrowUpAZ} size="sm" />
                                            : <FontAwesomeIcon icon={faArrowDownAZ} size="sm" />)}

                                            </button>
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/4">
                                        <button className="btn btn-ghost" onClick={()=>handleSort('email')}>
                                        Email
                                           {isSort.email && ( sortOrder.email === 'asc'?
                                            <FontAwesomeIcon icon={faArrowUpAZ} size="sm" />
                                            : <FontAwesomeIcon icon={faArrowDownAZ} size="sm" />)}

                                            </button>
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/4">
                                            <div className="flex items-center gap-2">
                                                <button className="btn btn-ghost" onClick={()=>handleSort('role')}>
                                                    <span>Role</span>
                                                    <div className="tooltip tooltip-top cursor-pointer" data-tip="click badge to change user's role">
                                                        <FontAwesomeIcon icon={faQuestionCircle} size="sm"/>
                                                    </div>
                                                    {isSort.role && ( sortOrder.role === 'asc'?
                                                <FontAwesomeIcon icon={faArrowUpAZ} size="sm" />
                                                : <FontAwesomeIcon icon={faArrowDownAZ} size="sm" />)}

                                                </button>
                                            </div>
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/8">
                                            Option
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-left divide-y divide-slate-200">
                                    {slicedUsers

                                    .map((user,i) => {
                                        return(
                                            <>
                                                <tr key={i+1} className={`${user.id === auth.id ? "bg-sky-100" : "bg-white"}`}>
                                                    <td className="text-md p-6">{i+1}</td>
                                                    <td className="text-md p-6">
                                                        <div className="flex items-center gap-4">
                                                            <img src={user.profile_picture ? `../storage/${user.profile_picture}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-12 w-12 rounded-full"/>
                                                            <div className="flex items-center gap-1">
                                                                <span>{user.username}</span>
                                                                {parseInt(user.is_banned) ? <span className="text-sm text-red-500">#banned</span> : null}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-md p-6">{user.email}</td>
                                                    <td className="text-md p-6">
                                                        {
                                                        parseInt(user.is_admin) ?
                                                        <span className="bg-green-200 text-green-900 text-sm px-2 py-1 rounded-full font-bold hover:bg-green-300 cursor-pointer" onClick={() => handleRole(user.id,'user')}>admin</span>
                                                        :
                                                        <span  className="bg-sky-200 text-sky-900 text-sm px-2 py-1 rounded-full font-bold hover:bg-sky-300 cursor-pointer" onClick={() => handleRole(user.id,'admin')}>user</span>
                                                        }
                                                    </td>
                                                    <td className="text-md p-6">
                                                        {
                                                        parseInt(user.is_banned) ?
                                                        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-3/4 bg-white" onClick={() => {handleUnban(user.id)}}>Unban</button>
                                                        :
                                                        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-3/4 bg-white" onClick={() => {handleBan(user.id)}}>Ban</button>
                                                        }
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}

                                </tbody>
                            </table>
                            <div className="flex justify-end">
                                <div className=" btn-group p-5 ">
                                    {lowOffsetUser>0 &&
                                    <button className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-1/4 bg-white">
                                    <FontAwesomeIcon icon={faBackward} size="lg" onClick={()=>handlePaginationUser(2)}/>
                                    </button>}

                                    {paginationButtons.map(d=>d)}

                                    {highOffsetUser<users.length &&
                                    <button className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-1/4 bg-white">
                                    <FontAwesomeIcon icon={faForward} size="lg" onClick={()=>handlePaginationUser(1)}/>
                                    </button>}



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
    )
}

export default ManageUser;
