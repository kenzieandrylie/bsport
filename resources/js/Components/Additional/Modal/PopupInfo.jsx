import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const PopupInfo = ({open, onClose}) => {

    return (
        <div>
            {open && (
                <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen">
                    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                        <div className="bg-white px-16 py-4 rounded-md text-center">
                            <div>
                                <h1 className="text-3xl mb-4 font-bold">Success !</h1>
                            </div>
                            <div>
                                <span className="text-gray-500">Post has been deleted!</span>
                            </div>
                            <a className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer" onClick={onClose}>
                                OK
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PopupInfo;
