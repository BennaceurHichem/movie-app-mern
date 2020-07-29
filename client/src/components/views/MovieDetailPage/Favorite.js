import React,{useState,useEffect} from 'react'
import {Button } from 'antd'
import axios from 'axios'
function Favorite(props) {

    const [FavoriteNumber,setFavoriteNumber] = useState(0)
    const [Favorited,setFavorited] = useState(false)
    
    //make it global to acces from all   methods 
    const variables={
        userFrom:props.userFrom,
        movieId:props.movieId,
        movieTitle:props.movieInfo.original_title,
        movieImage:props.movieInfo.backdrop_path,
        movieRunTime:props.movieInfo.runtime,

    }
    useEffect(() => {
        

        axios.post('/api/favorite/favoriteNumber',variables).then(res=>{

            if(res.data.success){
                setFavoriteNumber(res.data.favoriteNumber)


            }else{
                    console.log("FAILED TO LOAD TOTAL  FAVORITE NUMBER ")
            }

        })

        axios.post('api/favorite/favorited',variables   ).then(res=>{

                setFavorited(!res.data.Favorited)

        })




    }, [])


    const handleFavorite = ()=>{

        if(Favorited){
            axios.post('api/favorite/removeFromFavorite',variables)
            .then(res=>{
                    if(res.data.success){   
                        setFavoriteNumber(FavoriteNumber-1)
                        setFavorited(!Favorited)

                    }else{
                            alert('Failed to add favorite')
                    }
    
            })

        }else{
            axios.post('api/favorite/addToFavorite',variables)
            .then(res=>{
                    if(res.data.success){
                        setFavoriteNumber(FavoriteNumber+1)
                        setFavorited(!Favorited)
                        
                        alert('added to  favorite')

                    }else{
                            alert('Failed to add favorite')
                    }
    
            })

        }
      
    }
    return (
        <div>
                <Button onClick ={handleFavorite}>
 {
     Favorited ? "Remove from Favorited":"Add to favorited"

     
 }       
 {FavoriteNumber}         </Button>
         </div>
    )
}

export default Favorite
