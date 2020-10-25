import React,{useEffect} from 'react'
import {withRouter} from "react-router-dom";

function ScrollToTop({history}) {
     useEffect(() => {
         console.log()
        const unlisten = history.listen(() => {
          window.scrollTo(0, 0);
        });
        return () => {
          unlisten();
        }
      }, []);
    
    return (null);
}

export default withRouter(ScrollToTop)
