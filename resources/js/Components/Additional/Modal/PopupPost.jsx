import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { React,useState,useEffect } from "react";

const PopupPost = ({open,onClose,post,type,onSuceed}) => {

    const {data,setData, processing, errors, reset,delete:destroy} = useForm({
        id:''
    });

    const handleDelete = () => {
        setData('id',post);
    }

    useEffect(() => {
        if(data.id!=''){
            destroy(route('delete.post'), {preserveScroll: true, onSuccess: onSuceed});
        }
    },[data.id]);


    if(!open) return null;
    return (
        <>
            {
            type === 'delete' ?
            <>
                <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen">
                    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                        <div className="bg-white px-16 py-14 rounded-md text-center">
                            <h1 className="text-xl mb-4 font-bold">Do you want to delete this post?</h1>
                            <a className="bg-red-500 px-4 py-2 rounded-md text-md text-white hover:bg-red-800" onClick={onClose}>
                                Cancel
                            </a>
                            <a  className="bg-sky-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold hover:bg-sky-800" onClick={handleDelete}>
                                Delete
                            </a>
                        </div>
                    </div>
                </div>
            </>
            :
            null
            }
        </>
    )
}

export default PopupPost;
