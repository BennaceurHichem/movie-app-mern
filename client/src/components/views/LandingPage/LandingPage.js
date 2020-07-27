import React,{useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL,API_KEY,} from '../../Config'
import MainImage from './MainImage/MainImage/MainImage';
function LandingPage() {
        
    
       const  [Movies,setMovies] = useState([])


    useEffect(() => {
        fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=ar`)
        .then(response=>
            response.json())
        .then(response=>{

            console.log("json response"+JSON.stringify(response))
            //cumulate the movies for infinite pagination 
            setMovies([...Movies,...response.result])

        })
    }, [])
    return (
        <>
            <div className="app">
             <MainImage image={Movies[0].backdrop_path} title={Movies[0].original_title} description={Movies[0].overview} />




            </div>
        </>
    )
}

export default LandingPage
