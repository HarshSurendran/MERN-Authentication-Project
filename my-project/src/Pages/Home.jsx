import React from 'react';
import Header from '../components/Header';

const Home = () => {
  const [val, setVal] = useState("hello");
  
  return (
    <div>
      <Header/>
      <ChildComponent props={setVal} ></ChildComponent>
      
      <div className='px-4 py-12 max-w-2xl mx-auto' >
        <h1 className='text-3xl font-bold mb-4 text-slate-800 '>Welcome to E-Diary.</h1>
        <p className='mb-4 text-slate-700'>
        Welcome to our Diary App – your ultimate digital companion for capturing daily moments, thoughts, and reflections. Whether you're on your laptop or phone, our app ensures your diary is always within reach, anytime, anywhere.
        </p>
        <p className='mb-4 text-slate-700'>
        Personalize your diary with our customizable themes and add pictures to make each entry uniquely yours. Experience the joy of journaling with a beautifully designed interface that makes writing easy, enjoyable, and deeply immersive.
        </p>
        <p className='mb-4 text-slate-700'>
        Thank you for choosing us to be part of your daily journey. Happy journaling!
        </p>
      </div>
    </div>
  )
}

export default Home
