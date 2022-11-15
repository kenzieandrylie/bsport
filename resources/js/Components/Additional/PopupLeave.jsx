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
                destroy(route('leave.group'))
            }else if(type =='deletegroup'){

                destroy(route('delete.group'))
            }
        }
    },[data]);
    if(!open) return null;
    return(
        <>
        <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen">
            <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div className="bg-white px-16 py-14 rounded-md text-center">

                    {type == 'leave' ? <h1 className="text-xl mb-4 font-bold">Do you want to leave group {group.name} ?</h1>:
                    <h1 className="text-xl mb-4 font-bold">Do you want to delete group {group.name} ?</h1>}


                        <a className="bg-red-500 px-4 py-2 rounded-md text-md text-white hover:bg-red-800" onClick={onClose}>
                            Cancel
                        </a>
                        <a  className="bg-sky-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold hover:bg-sky-800" onClick={handleDelete}>
                        {type == 'leave'?'Leave':'Delete Group'}
                        </a>

                </div>
            </div>
        </div>

        </>
    )
}

export default PopupLeave;
