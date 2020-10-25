export const easer=(startValue ,targetValue, clb,speed)=>
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
export const getParentRecursive= (elem,className)=>{
    if(elem.classList.contains(className))
      return elem
    return getParentRecursive(elem.parentElement,className)
}