import React from 'react'
import style from './index.module.scss'
import { TextField, Button } from "@mui/material";
import { toast } from 'react-toastify';
import axios from 'axios';


function CartMetaTags({titles,url, description, h1Title, h2Title}) {
    const [title, setTitle] = React.useState("")
    const [descriptions, setDescription] = React.useState("")
    const [h1, setH1] = React.useState("")
    const [h2, setH2] = React.useState("")



    React.useEffect(()=>{
        setTitle(titles)
        setDescription(description)
        setH1(h1Title)
        setH2(h2Title)
    },[titles,
        url,
        description,
        h1Title,
        h2Title])


    async function postMetaTags(){
        const response = await axios.post(`${process.env.REACT_APP_API_KEY}/addDataMetaTags`,{
            title:title,
            description:descriptions,
            url:url,
            h1:h1,
            h2:h2

        })

        if(response.status === 200){
            toast.success('Данные обновлены')
        }

    }

    React.useEffect(()=>{
            console.log(h1Title,
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
                style={{width:'300px'}}
                value={h1}
                placeholder="h1"
                onChange={(e)=>setH1(e.target.value)}
                />
                 <TextField
                style={{width:'300px'}}
                value={h2}
                placeholder="h2"
                onChange={(e)=>setH2(e.target.value)}
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