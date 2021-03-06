import React from 'react'
import { Typography } from 'antd';
import {IMAGE_URL} from '../../../../Config'



const { Title } = Typography;



export default function MainImage(props) {
    return (
        <div
            style={{
                background:
           `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url('${props.image}'), #1c1c1c`,
                height: '300px',
                backgroundSize: '100%, cover',
                backgroundPosition: 'center, center',
                width: '100%',
                position: 'relative'
            }}
            >
            
            <div>
                <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }} >
                    <Title style={{ color: 'white' }} level={2} > {props.title} </Title>
                    <p style={{ color: 'white', fontSize: '1rem' }}  >{props.description} </p>
                </div>
            </div>


        </div>
    )
}
