import React,{useEffect,useState} from 'react'
import {API_KEY,API_URL,} from '../../Config'



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
            
            this is the movie detail page

            {
                Movie &&
                <>
                <p>{Movie.id}</p>
                <p>{Movie.overview}</p>

                <p>{Movie.backdrop_path}</p>
                <p>{Movie.belongs_to_collection}</p>
                <p>{Movie.budget}</p>
                <p>{Movie.genres ? Movie.genres.name :" "}</p>
                <p>{Movie.original_language}</p>

                </>
                
                

            } 
        </div>
    )
}
