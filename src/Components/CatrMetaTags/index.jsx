import React from 'react'
import style from './index.module.scss'
import { TextField, Button } from "@mui/material";
import { toast } from 'react-toastify';
import axios from 'axios';


function CartMetaTags({titles,url, description}) {
    const [title, setTitle] = React.useState("")
    const [descriptions, setDescription] = React.useState("")



    React.useEffect(()=>{
        setTitle(titles)
        setDescription(description)
    },[])


    async function postMetaTags(){
        const response = await axios.post(`${process.env.REACT_APP_API_KEY}/addDataMetaTags`,{
            title:title,
            description:descriptions,
            url:url
        })

        if(response.status === 200){
            toast.success('Данные обновлены')
        }

    }

    React.useEffect(()=>{
            console.log(title,
                descriptions)
    },[title, descriptions])


    return (


    <div className={style.block_page_metatags}>
        <div className={style.blocks}>
                <h2>{titles} {url}</h2>
                <TextField
                style={{width:'300px'}}
                value={title}
                placeholder="Заголовок"
                onChange={(e)=>setTitle(e.target.value)}
                />
                <TextField

                value={descriptions}
                placeholder='Описание'
                onChange={(e)=>setDescription(e.target.value)}

                />
                <Button onClick={()=>postMetaTags()} style={{width:'200px'}} variant="contained" >saveChangeOnAdmin</Button>
                </div>
                </div>
  )
}

export default CartMetaTags