import React from "react";
import style from './index.module.scss'
import Header from "../../Components/Header";
import CartMetaTags from "../../Components/CatrMetaTags";

function MetaTags(){

    return(
        <>
          <Header />
          <div className={style.wrapper}>
          <CartMetaTags url={'/'} titles={'Главная'}/>
          <CartMetaTags url={'/how-it-work'} titles={'Как это работает'}  />
          <CartMetaTags url={'/hockey-league'}   titles={'Хоккейная лига'} />
          <CartMetaTags url={'/football-leagues'}  titles={'Футбольные лиги'} />
          <CartMetaTags url={'/tariffs'} titles={'Тарифы'} />
          <CartMetaTags url={'/news'} titles={'Новости'} />
          </div>
        </>
    )

}


export default MetaTags