import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward} from '@fortawesome/free-solid-svg-icons';
const ViewFeedback = ({feedbacks, auth}) => {
    const limit = 3;
    const [highOffset,setHighOffset] = useState(limit);
    const [lowOffset,setLowOffset] = useState(0);
    const countPages = Math.ceil(feedbacks.length/limit);
    let paginationButtons= [];
    let currentPage =highOffset/limit;

    //console.log(lowOffset,highOffset);

    for (let index = 0; index < countPages; index++) {
        paginationButtons.push(<button className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-1/4 bg-white" onClick={()=>handlePaginationUser(3,index+1)}>
            {index+1}
        </button>);
    }
    const handlePagination = (type,page)=>{
        //type:
        //1. next
        //2. prev
        //3. to page
        if(type === 1){
            setHighOffset(value=>value+limit);
            setLowOffset(value=>value+limit);
        }else if(type===2){
            setHighOffset(value=>value-limit);
            setLowOffset(value=>value-limit);
        }else if(type===3){
            // console.log("page:"+page);
            // console.log("highOffset: "+highOffsetUser);
            // console.log("lowOffset: "+lowOffsetUser);
            setHighOffset(page*limit);
            setLowOffset((page-1)*limit);
        }
    }
    const slicedFeedback = feedbacks.slice(lowOffset,highOffset);

    return (
        <>
            <div className="flex flex-col bg-white border rounded-lg">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden p-4">
                            <table className="min-w-full">
                                <thead className="border-b border-sky-500">
                                    <tr>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/12">
                                            No
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/4">
                                            Subject
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/2">
                                            Detail
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/12">
                                            Creator
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-left divide-y divide-slate-200">
                                    {feedbacks
                                    .map((feedback,i) => {
                                        return(
                                            <>
                                                <tr key={i+1} className={`${feedback.username === auth.username ? "bg-sky-100" : "bg-white"}`}>
                                                    <td className="text-md p-6">{i+1}</td>
                                                    <td className="text-md p-6">{feedback.subject}</td>
                                                    <td className="text-md p-6">{feedback.detail}</td>
                                                    <td className="text-md p-6 font-bold">{feedback.username}</td>
                                                </tr>
                                            </>
                                        )
                                    })}

                                </tbody>
                            </table>
                            <div className="flex justify-end">
                                <div className=" btn-group p-5 ">
                                    {lowOffset>0 &&
                                    <button className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-1/4 bg-white">
                                    <FontAwesomeIcon icon={faBackward} size="lg" onClick={()=>handlePagination(2)}/>
                                    </button>}

                                    {paginationButtons.map(d=>d)}

                                    {highOffset<feedbacks.length &&
                                    <button className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-1/4 bg-white">
                                    <FontAwesomeIcon icon={faForward} size="lg" onClick={()=>handlePagination(1)}/>
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

export default ViewFeedback;
