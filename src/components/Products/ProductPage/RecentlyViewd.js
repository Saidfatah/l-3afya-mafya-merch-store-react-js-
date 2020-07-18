import React from 'react'

function RecentlyViewd() {
    const stories_Container = document.querySelector('.stories_Container')
const btn_left = document.querySelector('.btn_left')
const btn_right = document.querySelector('.btn_right')
const story = document.querySelector('.story')
const stories = document.querySelector('.stories')

function easer(startValue ,targetValue, clb,speed)
{
    
    const distance= targetValue - startValue
    const duration = speed
    let start= null

    window.requestAnimationFrame(step)
    function step(timestamp)
    {
       if(!start) start=timestamp
       const progress= timestamp - start
       clb(easeOutCirc(progress, startValue, distance, duration))
       if(progress < duration) window.requestAnimationFrame(step)
    }
    function easeOutCirc  (t, b, c, d) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t*t) + b;
    };
  

}


const getParentRecursive= (elem,className)=>{
    if(elem.classList.contains(className))
      return elem
    return getParentRecursive(elem.parentElement,className)
}
const toggleSliderBtns=(overflowedStoriesLeft, overflowedStoriesRight)=>{
    btn_left.style.display=overflowedStoriesRight>0?'inline':'none'
    btn_right.style.display=overflowedStoriesLeft>0?'inline':'none'
}
const countStories=(dir)=>{
    const storiesContainerWidth=parseInt(stories_Container.offsetWidth) ;
    const storiesWidth=parseInt(stories.offsetWidth) ;
    const storiesContainerX= Math.abs(parseInt(stories_Container.offsetLeft))-16 ;
    const storyWidth =parseInt(story.offsetWidth)+16;
    const oferflowedStorikesLeft=Math.round(storiesContainerX/storyWidth)
    const oferflowedStorikesRight=Math.round((storiesContainerWidth - (storiesContainerX+16+storiesWidth))/storyWidth)
    toggleSliderBtns(oferflowedStorikesLeft,oferflowedStorikesRight)
    return dir>0?oferflowedStorikesRight : oferflowedStorikesLeft;
}
const slide = (dir)=>{
    const overflowedStories = countStories(-dir);
    const storyWidth =parseInt(story.offsetWidth)+16;
    const Slide_amount = dir * storyWidth *(overflowedStories >=4 ? 4:overflowedStories)
    const X= parseInt(stories_Container.offsetLeft);
    const easer_calb=(value)=> stories_Container.style.left=(value )+'px'
    easer(X, X + Slide_amount,easer_calb,100)
    countStories(-dir);
}
const slideStoriesLeft = (e)=> slide(-1)
const slideStoriesRight = (e)=> slide(1)

btn_left.addEventListener('click',slideStoriesLeft)
btn_right.addEventListener('click',slideStoriesRight)


    return (
        <div>
            
        </div>
    )
}

export default RecentlyViewd
