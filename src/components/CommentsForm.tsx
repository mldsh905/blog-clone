import React, {useEffect, useRef, useState} from 'react';
import {any} from "prop-types";
import {submitComment} from "@/services";

const CommentsForm = ({slug}: { slug: string }) => {
    const [error, setError] = useState(false);
    // const[localStorage,setLocalStorage]=useState<any>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef<HTMLTextAreaElement|any>(null);
    const nameEl = useRef<HTMLInputElement|any>(null);
    const emailEl = useRef<HTMLInputElement|any>(null);
    // const storeDataEl = useRef<HTMLInputElement|any>(null);


    const handleCommentSubmission = () => {
        setError(false);
        if (!commentEl.current?.value || !nameEl.current?.value || !emailEl.current?.value) {
            setError(true);
            return
        }

        const commentObj = {
            name: nameEl.current.value,
            email: emailEl.current.value,
            comment: commentEl.current.value,
            slug: slug
        }

        // if (storeDataEl.current?.checked){
        //     localStorage.setItem('name',nameEl.current.value)
        //     localStorage.setItem('email',emailEl.current.value)
        // }else{
        //     localStorage.removeItem('name',nameEl.current.value)
        //     localStorage.removeItem('email',emailEl.current.value)
        // }

        submitComment(commentObj)
            .then(res => {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 3000)
            })
            .then(() => {
                    commentEl.current.value = '';
                    nameEl.current.value = '';
                    emailEl.current.value = '';
                }
            )
    }

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Comments
            </h3>
            <div className='grid grid-cols-1 gap-4 mb-4 '>
                <textarea ref={commentEl}
                          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                          name="comment" id="" cols={30} rows={10} placeholder='Comment'/>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 '>
                <input type="text" ref={nameEl}
                       className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                       placeholder='name' name='name'/>
                <input type="text" ref={emailEl}
                       className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                       placeholder='email' name='email'/>
            </div>
            {/*<div className='grid grid-cols-1 gap-4 mb-4'>*/}
            {/*    <div>*/}
            {/*        <input type="checkbox" ref={storeDataEl} id='storeData' name='storeData' value='true'/>*/}
            {/*        <label className='text-gray-500 cursor-pointer ml-2' htmlFor="storeData">Save my E-mail and name for the next time commenting</label>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {error && <p className='text-xs text-red-500'>All fields are required.</p>}
            <div className='mt-8'>
                <button
                    className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-amber-400 text-lg rounded-full text-white px-8 py-3 cursor-pointer font-bold'
                    type='button' onClick={handleCommentSubmission}>
                    Post Comment
                </button>
                {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment submitted for review</span>}
            </div>
        </div>
    );
};

export default CommentsForm;