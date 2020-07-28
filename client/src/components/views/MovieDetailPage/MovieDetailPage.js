import React,{useEffect,useState} from 'react'
import {API_KEY,API_URL,} from '../../Config'
import { Descriptions, Badge ,Row,Button} from 'antd';
import {IMAGE_URL,MAIN_IMAGE_SIZE,MOVIE_CARD_SIZE} from '../../Config'
import MainImage from '../LandingPage/MainImage/MainImage/MainImage'
import GridCards from '../LandingPage/MainImage/GridCards'

import Favorite from './Favorite'
export default function MovieDetailPage(props) {
    
    
    const movieId = props.match.params.movieId

    const [Movie,setMovie] = useState("")
    const [ActorToggle, setActorToggle] = useState(false)

    //booleans to detect of data loading or not 
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [Casts, setCasts] = useState([])

    useEffect(() => {

        //get the movie id from the url 
            const endpoint  = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ar`
            console.log("endpoint"+endpoint)
            fetch(endpoint)
            .then(res=>res.json())
            .then(response=>{


                console.log("response"+response)
                setMovie(response)
                setLoadingForMovie(false)

                //fetching all casts  from another endpoint 
                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCasts(result.cast)
                    })
                setLoadingForCasts(false)

            })
           


            


    }, [])


    const handleActorToggle = ()=>{

        setActorToggle(!ActorToggle)


    }


    return (
        <div>
            
            {Movie &&

                <MainImage image={`${IMAGE_URL}${MAIN_IMAGE_SIZE}${Movie.backdrop_path}`} title={Movie.original_title} description={Movie.overview?Movie.overview:""} />

            }

            <div style={{width:'85%', margin:'1rem auto'}}>
                <div style={{display:'flex',justifyContent:'flex-end'}}>

                <Favorite />
                </div>

            </div>
{!LoadingForMovie && 
    <Descriptions title="Movie Detail" bordered  style={{"text-align":"center"}}>
                <Descriptions.Item label="Movie_id">{Movie.id}</Descriptions.Item>
                <Descriptions.Item label="belongs to a collection">{Movie.belongs_to_collection? Movie.belongs_to_collection:"غير متوفر"}</Descriptions.Item>
                <Descriptions.Item label="Runtime">{Movie.runtime}</Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>
                {Movie.status?Movie.status:"None"}
                </Descriptions.Item>
                <Descriptions.Item label="Title" span={3}>
                            {Movie.original_title?Movie.original_title:"None"}
                </Descriptions.Item>
                <Descriptions.Item label="Popuarity">{Movie.popularity?Movie.popularity:"None"}</Descriptions.Item>
                <Descriptions.Item label="Discount">{Movie.revenue?Movie.revenue:"None"}</Descriptions.Item>
                <Descriptions.Item label="Description">
                {Movie.overview?Movie.overview:"None"}
                </Descriptions.Item>
  </Descriptions>

}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={handleActorToggle}>Show/Hide Actors </Button>
                </div>
        {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            !LoadingForCasts && Casts ? Casts.map((cast, index) => (
                                cast.profile_path &&
                                <GridCards actor image={cast.profile_path} characterName={cast.characterName} />
                            )) :
                                <div>loading...</div>
                        }
                    </Row>
                }
        </div>
    )
}
