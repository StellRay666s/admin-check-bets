import React from "react";
import style from './index.module.scss'
import Header from "../../Components/Header";
import CartMetaTags from "../../Components/CatrMetaTags";
import axios from "axios";

function MetaTags(){
  const [metaTags, setMetaTags] = React.useState([])

  async function getMetaTags(){
    const {data, status} = await axios.get(`${process.env.REACT_APP_API_KEY}/getAllMetaTags`)
    console.log(data)
    if(status=== 200){
      setMetaTags(data)
    }
  }

  React.useEffect(()=>{
    getMetaTags()
  },[])


    return(
        <>
          <Header />
          <div className={style.wrapper}>
        {metaTags.map((item)=>
        <CartMetaTags url={item.url} titles={item.title} description={item.description}/>)}
          </div>
        </>
    )

}


export default MetaTags