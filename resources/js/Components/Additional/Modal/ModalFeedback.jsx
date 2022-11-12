import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import InputError from '@/Components/InputError';
import { usePage } from '@inertiajs/inertia-react'

const FeedbackModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [subject, setSubject] = useState('');
  const [detail, setDetail] = useState('');

  const { errors } = usePage().props

  const handleSubmit = () => {

    const data = {
        subject, detail
    }

    if(subject.length > 0 && detail.length > 0){
        setSubject('');
        setDetail('');
        setShowMsg(true);

        setTimeout(() => {  setShowModal(false); setShowMsg(false)}, 2500);
    }

    Inertia.post('/feedback', data);

    // setShowModal(false);
  }

  return (
    <>
        <button
            className="bg-pink-500 text-white active:bg-pink-600 p-1 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
        >
            <div className="flex justify-center items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Feedback</span>
            </div>
        </button>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                    Feedback
                    </h3>
                    <button
                    onClick={() => {setShowModal(false);setShowMsg(false)}}
                    >
                    <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">

                    {showMsg ? (
                    <>
                        <div className="text-green-500 mb-7 flex justify-center">
                            <p>Your feedback has been submitted!</p>
                        </div>
                    </>
                    ) : null}

                    <div className="mb-7">
                        <label>Subject</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            onChange={(subject) => setSubject(subject.target.value)}
                            value={subject}
                        />
                        {errors.subject && <InputError message={errors.subject}/>}
                    </div>

                    <div className="flex flex-col">
                        <label>Details</label>
                        <textarea
                            className="textarea textarea-bordered"
                            onChange={(detail) => setDetail(detail.target.value)}
                            value={detail}
                        />
                        {errors.detail && <InputError message={errors.detail}/>}
                    </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-start p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default FeedbackModal;
