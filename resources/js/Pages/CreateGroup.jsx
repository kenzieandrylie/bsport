import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Additional/Navbar';
import Hero from '@/Components/Additional/Hero';
import GroupCard from '@/Components/Additional/GroupCard';
import UserLayout from '@/Layouts/UserLayout';
import { Inertia } from '@inertiajs/inertia';
const CreateGroup = ({errors,auth,users,notifications}) => {
    //console.log(users);
    const [isError,setIsErrors] = useState([]);
    const [data,setData]= useState([
       { name:'',
        description:'',
        display_picture:'',
    }
    ]);
    const inputRef = useRef([]);
    const groupPhotoRef = useRef();
    const [isPreviewImage,setIsPreviewImage] = useState('hidden');
    const [isPlaceholderImage,setIsPlaceholderImage] = useState('');
    const groupPhotoprevRef =useRef();
    const [disable, setDisable] = useState(false);

    const handleChangeGroupPhoto = ()=>{
        groupPhotoRef.current.click();
    }
    const handleInputGroupPhoto = (e)=>{

        const imageFiles = e.target.files;
        if(imageFiles.length >0 ){
            const image =URL.createObjectURL(imageFiles[0]);

            groupPhotoprevRef.current.src = image;
            setIsPreviewImage('');
            setIsPlaceholderImage('hidden');
            setData(values => ({
                ...values,
                display_picture: imageFiles[0],
            }))
        }
    }
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setData(values => ({
            ...values,
            [key]: value,
        }))
      }

    const handleSubmit=(e)=>{
        e.preventDefault();
        //console.log(data);
        Inertia.post('/creategroup',data);
        setDisable(false)
    }
    return (
    <Fragment>
        <UserLayout
         auth={auth}
         users={users}
         notifications={notifications}
         >
        <Head title="Create Group" />
           <div className='p-8'>
  <div className="md:grid md:grid-cols-3 md:gap-6">
    <div className="mt-5 md:col-span-3 md:mt-0 ">
      <form onSubmit={handleSubmit} method="POST">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div className="gap-6">
              <div className="col-span-3 ">
                <div className=" grid grid-cols-12 flex align-items-center rounded-md">
                <label htmlFor="groupName" className="text-sm font-bold text-gray-700 col-span-4 px-3 py-2">Group Name<span className='text-red-600 font-bold'>*</span></label>

                  <input type="text" name="groupName" id="name" className={ errors.name? ' col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  border-red-500':' col-span-8 w-full rounded focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-gray-300 ' } placeholder="John Doe" onChange={handleChange}/>
                </div>
                <div className='grid grid-cols-12'>
                  <p className='col-span-4'></p>
                  <p className='col-span-8 text-red-500'>{errors.name}</p>
                  </div>
              </div>
            </div>
            <hr />
            <div className='grid grid-cols-12 '>
              <label htmlFor="group-description" className="col-span-4 text-sm font-bold text-gray-700 px-3 py-2">Group Description<span className='text-red-600 font-bold'>*</span></label>
                <textarea id="description" name="groupDesc" rows="4" className={errors.description?"col-span-8 block w-full rounded-md border-red-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm":"col-span-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"} placeholder="Brief description for group" onChange={handleChange}></textarea>

            </div>
            <div className='grid grid-cols-12'>
                  <p className='col-span-4'></p>
                  <p className='col-span-8 text-red-500'>{errors.description}</p>
                  </div>
            <hr />
            <div className='grid grid-cols-12 align-items-center'>
              <label className=" text-sm font-bold text-gray-700 col-span-4 px-3 py-2">Group Photo <span className='text-red-600 font-bold'>*</span></label>
              <div className="mt-1 flex items-center col-span-8">
                <span className={`inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 `+isPlaceholderImage}>
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                  <img id='preview-selected-image' className = {isPreviewImage} src='' ref ={groupPhotoprevRef} style={{ width:'48px',height:'48px' }}/>
                <input type="file"  id ="display_picture" ref={groupPhotoRef} accept="image/*" className='hidden' name ='groupPhoto-upload'  onChange={handleInputGroupPhoto}/>
                <button type="button"  className={errors.display_picture?"ml-5 rounded-md border border-red-500 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2":"ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"} onClick={handleChangeGroupPhoto}>Change</button>
              </div>
            </div>
              <div className='grid grid-cols-12'>
                  <p className='col-span-4'></p>
                  <p className='col-span-8 text-red-500'>{errors.display_picture}</p>
                  </div>


          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => setDisable(true)}>Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<div className="hidden sm:block" aria-hidden="true">
  <div className="py-5">
    <div className="border-t border-gray-200"></div>
  </div>
</div>

<div className="hidden sm:block" aria-hidden="true">
  <div className="py-5">
    <div className="border-t border-gray-200"></div>
  </div>
</div>
        </UserLayout>
    </Fragment>);
}

export default CreateGroup;
