import { useState } from "react";
import BtnLink from "../BtnLink";

const GroupInfo = ({group}) => {

    return (
        <>
            <div className="bg-white rounded-lg p-5 border flex flex-col gap-4">

                <div className="w-full text-center flex items-center gap-4">
                    <div>
                        <img src={group.display_picture ? `../storage/${group.display_picture}` : "https://i.pinimg.com/originals/50/46/0c/50460cdffd8bb7e3e387f3d456b6d633.jpg"} alt="" className="rounded" style={{width:`80px`,height:`80px`,objectFit:`cover`}}/>
                    </div>
                    <span className="text-lg font-bold">{group.name}</span>
                </div>

                <div className="w-full text-md">
                    <span>{group.description}</span>
                </div>

                <div className="w-full h-full flex justify-center items-center justify-between">
                    <span className="text-lg font-bold">PIN</span>
                    <span>{group.pin}</span>
                </div>

            </div>
        </>
    )
}

export default GroupInfo;
