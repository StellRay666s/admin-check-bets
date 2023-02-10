import React from 'react'
import style from './index.module.scss'
import { TextField, Button } from "@mui/material";
import { toast } from 'react-toastify';
import axios from 'axios';


function CartMetaTags({titles,url}) {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")

    async function postMetaTags(){
        const response = await axios.post('http://localhost:8000/addDataMetaTags',{
            title:title,
            description:description,
            url:url
        })

        if(response.status === 200){
            toast.success('Данные обновлены')
        }

    }

    React.useEffect(()=>{
        
    },[])


    return (


    <div className={style.block_page_metatags}>
        <div className={style.blocks}>
                <h2>{titles}</h2>
           
                <TextField
                style={{width:'300px'}}
                value={title}
                placeholder="Заголовок"
                onChange={(e)=>setTitle(e.target.value)}
                />
                <TextField

                value={description}
                placeholder='Описание'
                onChange={(e)=>setDescription(e.target.value)}

                />
                <Button onClick={()=>postMetaTags()} style={{width:'200px'}} variant="contained" >saveChangeOnAdmin</Button>
                </div>
                </div>
  )
}

export default CartMetaTags