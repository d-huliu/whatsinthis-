import Header from '../components/Header';
import Search from '../components/Search';
 import React from 'react'
 
 const Home = () => {
   return (
     <main className ='w-full flex flex-col'>
    <Header
    title={
        <p>
            Discover What's In This,
            <br/> One Search Away!
        </p>
    }
    type='home'
    />

    
     <section id="search" className='md:max-w-[1440px] mx-auto px-4 md:px-20'>
        <Search/>
     </section> 
     </main>
   )
 }
 
 export default Home