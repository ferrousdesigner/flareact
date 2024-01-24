import Header from "../Header"
import React from "react"
import './VerticalBanner.css'
import Space from "../Space"

const VerticalBanner = ({title, subTitle, desc, topImg, bottomImg}) => {
    return <div className="vertical-banner">
        {topImg ? <img className="vertical-banner-top-img" src={topImg} alt='top-img' /> : ''}
        <Header lg bold>{title || 'Please provide a title'}</Header>
        <Space />
        <Header sm>{subTitle || 'Please provide a subtitle'}</Header>
        {desc ? <p>{desc}</p> : ''}
        {bottomImg ? <img className="vertical-banner-bottom-img" src={bottomImg} alt='bottom-img' /> : ''}
    </div>
}
export default VerticalBanner