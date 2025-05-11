import React from 'react'
import './Introduction.css'
import img2 from './ChatGPT Image Apr 6, 2025, 10_16_41 PM.png'
import img1 from './ChatGPT Image Apr 6, 2025, 10_20_12 PM.png'  

const Introduction = () => {
  return (
    <div>
<div className='introduction'>
<img src={img1} className='img' width={300} height={300}/>
  <div className='intro-paragraph'>
  <h1>Welcome to TasteBites!</h1>
  <p>
    TasteBites is more than just a recipe-sharing platform — it's a community built for food lovers of all kinds. Whether you're 
    experimenting in your home kitchen or crafting dishes professionally, this is your space to shine.
    <br />
    Share your favorite recipes, explore unique dishes from around the world, and connect with fellow food enthusiasts. 
    From quick weekday meals to gourmet creations, there's something here for everyone.
    <br />
    We created TasteBites to feel like a cozy kitchen table — a place where stories, flavors, and inspiration are always on the menu.
    Come cook with us!
  </p>
  </div>

</div>

      <br/>

      <div className='introduction'>
        <div className='intro-paragraph'>
        <h1>What Can I Do on This Platform?</h1>
  <p>
    TasteBites is your all-in-one destination for discovering, sharing, and connecting through food.
    <br />
    Explore a constantly growing collection of recipes created by people from all walks of life — from passionate home cooks 
    to seasoned professional chefs. Whether you're looking for something quick and easy or bold and adventurous, there's always 
    something new to try.
    <br />
    Create your own account to start sharing your personal creations with the world. You can upload detailed recipes, add images, 
    and even tell the story behind each dish. Your profile becomes your own digital cookbook that others can follow and get inspired by.

  </p>
        </div>
        <img src={img2} className='img' width={300} height={300}/>
</div>

    </div>
  )
}

export default Introduction
