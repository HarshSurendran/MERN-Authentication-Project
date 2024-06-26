import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { updateUserSuccess, updateUserFailure, updateUserStart, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOut } from '../redux/user/userSlice';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);  
  const [imagePercent , setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false); 
  const [formData, setFormData] = useState({});

  const { currentUser, loading, error } = useSelector((state)=>state.user);
  
  useEffect(()=>{
    fetch('/api/user/checkuser')
    .then((res) => res.json())
    .then((data)=>{      
      if(!data.status){        
        dispatch(signOut());
        navigate("/");
      }      
    })
  });

  useEffect(()=>{
    if(image) {
      handleFileUpload(image)
    }
  },[image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const date = new Date;
    const fileName = date.getTime() + image.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(( snapshot.bytesTransferred/snapshot.totalBytes) * 100);
        setImagePercent(progress);
      },
      (error) =>{
        setImageError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
          setFormData({...formData,
            profilePicture : downloadURL
          })
        )
      }
    );
  }

  const handleChange = (e) => {
    setFormData({...formData,  [e.target.id] : e.target.value});    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  const handleDeleteAccount = async () =>{
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure to delete the account. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async(result) => {
        if (result.isConfirmed) {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE',
          })
          const data = await res.json();
          if(data.success === false){
            dispatch(deleteUserFailure(data));
            return;
          }
          dispatch(deleteUserSuccess(data));
        }
      }); 
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }

  const handleSignOut = async () =>{
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);      
    }
  }
  
  return (
    <div>
      <Header/>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
          <img  src={formData.profilePicture || currentUser.profilePicture} alt="profile" className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' onClick={()=> fileRef.current.click()}/>
                    
          <p className='text-sm self-center'>
            {imageError ? 
            (<span className='text-red-700'>Error Uploading image (file size must be less than 2 MB)</span>) : 
            imagePercent > 0 && imagePercent < 100 ? 
            (<span className='text-slate-700'>{`Uploading : ${imagePercent} %`}</span> ) :
            imagePercent === 100 ? ( <span className='text-green-700'>Image Upload successfull.</span> ) : '' }
          </p>

          <input defaultValue={currentUser.username} type="text" id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3' onChange={(e) => handleChange(e)} />

          <input defaultValue={currentUser.email} type="email" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3' onChange={(e) => handleChange(e)}/>

          <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3' onChange={(e) => handleChange(e)}/>

          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'Loading..' : 'Update'}</button>

        </form>
        <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer' >Delete Account</span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer' >Sign Out</span>
        </div>
        <p className='text-red-700 mt-5'>{error && 'Something went Wrong'}</p>
        <p className='text-green-700 mt-5'>{updateSuccess && 'User is updated succesfully'}</p>
      </div>
    </div>
  )
}

export default Profile
