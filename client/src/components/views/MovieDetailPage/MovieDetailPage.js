import React,{useEffect,useState} from 'react'
import {API_KEY,API_URL,} from '../../Config'
import { Descriptions, Badge } from 'antd';
import {IMAGE_URL,MAIN_IMAGE_SIZE,MOVIE_CARD_SIZE} from '../../Config'
import MainImage from '../LandingPage/MainImage/MainImage/MainImage'

export default function MovieDetailPage(props) {
    
    
    const movieId = props.match.params.movieId

    const [Movie,setMovie] = useState("")

    useEffect(() => {

        //get the movie id from the url 
            const endpoint  = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ar`
            console.log("endpoint"+endpoint)
            fetch(endpoint)
            .then(res=>res.json())
            .then(response=>{


                console.log("response"+response)
                setMovie(response)
            })
           
            


    }, [])
    return (
        <div>
            
            {Movie &&

                <MainImage image={`${IMAGE_URL}${MAIN_IMAGE_SIZE}${Movie.backdrop_path}`} title={Movie.original_title} description={Movie.overview?Movie.overview:""} />

            }

     <Descriptions title="Movie Detail" bordered>
                <Descriptions.Item label="Movie_id">{Movie.id}</Descriptions.Item>
                <Descriptions.Item label="belongs to a collection">{Movie.belongs_to_collection? Movie.belongs_to_collection:"غير متوفر"}</Descriptions.Item>
                <Descriptions.Item label="Runtime">{Movie.runtime}</Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>
                {Movie.status}
                </Descriptions.Item>
                <Descriptions.Item label="Title" span={3}>
                            {Movie.original_title}
                </Descriptions.Item>
                <Descriptions.Item label="Popuarity">{Movie.popularity}</Descriptions.Item>
                <Descriptions.Item label="Discount">{Movie.revenue}</Descriptions.Item>
                <Descriptions.Item label="Description">
                {Movie.overview}
                </Descriptions.Item>
  </Descriptions>
        </div>
    )
}
