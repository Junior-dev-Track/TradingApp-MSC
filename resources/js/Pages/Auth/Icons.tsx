import React from 'react';
import { AiFillAppstore } from "react-icons/ai";
import { AiOutlineFund } from "react-icons/ai";
import { AiFillCalendar } from "react-icons/ai";




const Icons = () => {
    return (
        <div className="flex flex-col ml-8 space-y-4 text-gray-400 hover:text-gray-500 max-w-none">
            <button className="flex items-center">
                <AiFillAppstore className="w-8 h-8" />
            </button>
            <button className="flex items-center ">
                <AiOutlineFund className="w-8 h-8" />
            </button>
            <button className="flex items-center">
                <AiFillCalendar className="w-8 h-8" />
            </button>
            <button className="flex items-center">
                <AiFillCalendar className="w-8 h-8" />
            </button>
            <button className="flex items-center ">
                <AiFillCalendar className="w-8 h-8" />
            </button>
            <button className="flex items-center ">
                <AiFillCalendar className="w-8 h-8" />
            </button>
        </div>
    );
 };

 export default Icons;
