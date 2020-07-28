import React,{useState,useEffect} from 'react'
import {Button } from 'antd'
import axios from 'axios'
function Favorite(props) {

    const [favoriteNumber,setFavoriteNumber] = useState(0)
    const [favorited,setFavorited] = useState(false)

    useEffect(() => {
        const variables={
            userFrom:props.userFrom,
            movieId:props.movieId,
            movieTitle:props.movieInfo.original_title,
            movieImage:props.movieInfo.backdrop_path,
            movieRunTime:props.movieInfo.runtime,

        }

        axios.post('/api/favorite/favoriteNumber',variables).then(res=>{

            if(res.data.success){
                setFavoriteNumber(res.data.favoriteNumber)


            }else{
                    console.log("FAILED TO LOAD TOTAL  FAVORITE NUMBER ")
            }

        })




    }, [])


    const handleFavorite = ()=>{
        axios.post('api/favorite/favorited',{
            userFrom:props.userFrom,
            movieId:props.movieId
        }).then(res=>{

                setFavorited(!res.data.favorited)

        })
    }
    return (
        <div>
                <Button onClick ={handleFavorite}>
 {
     favorited ? "Remove from Favorited":"Add to favorited"

     
 }       
 {favoriteNumber}         </Button>
         </div>
    )
}

export default Favorite
