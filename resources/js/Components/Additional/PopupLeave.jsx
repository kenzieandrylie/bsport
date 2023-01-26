import { Head, Link,useForm } from '@inertiajs/inertia-react';
import React, { useState, useEffect,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faXmark } from '@fortawesome/free-solid-svg-icons';

const PopupLeave = ({open,onClose,group,type}) => {
    const {data,setData,post, processing, errors, reset,delete:destroy} = useForm({
        id:''
    });

    const handleDelete=()=>{
        if(type=='leave'){
            setData('id',group.id);
        }else if(type =='deletegroup'){
            setData('id',group.group_id);
        }
        onClose();
    }

    useEffect(()=>{

        if(data.id!=''){
            if(type =='leave'){
                destroy(route('leave.group'), {preserveScroll: true})
            }else if(type =='deletegroup'){

                destroy(route('delete.group'), {preserveScroll: true})
            }
        }
    },[data]);
    if(!open) return null;
    return(
        <>
        <div className="fixed top-0 left-0 flex items-center justify-center h-full lg:h-screen w-screen z-50">
            <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div className="bg-white px-16 py-14 rounded-md text-center">

                    {type == 'leave' ? <h1 className="text-xl mb-4 font-bold">Do you want to leave group {group.name} ?</h1>:
                    <h1 className="text-xl mb-4 font-bold">Do you want to delete group {group.name} ?</h1>}

                    <div className="flex justify-center gap-4">
                        <a className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer" onClick={onClose}>
                            Cancel
                        </a>
                        <a  className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer" onClick={handleDelete}>
                        {type == 'leave'?'Leave':'Delete Group'}
                        </a>
                    </div>

                </div>
            </div>
        </div>

        </>
    )
}

export default PopupLeave;
