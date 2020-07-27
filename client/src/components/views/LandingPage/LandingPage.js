import React,{useEffect,useState,useRef} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL,API_KEY,IMAGE_URL,MAIN_IMAGE_SIZE,MOVIE_CARD_SIZE} from '../../Config'
import MainImage from './MainImage/MainImage/MainImage';
import GridCard from './MainImage/GridCard'
import { Typography, Row, Button } from 'antd';

const { Title } = Typography;


function LandingPage() {
        
    
       const  [Movies,setMovies] = useState([])
       const [MainMovieImage, setMainMovieImage] = useState(null)
       const [currentPage, setCurrentPage] = useState(0)
       const [Loading, setLoading] = useState(true)
       const buttonRef = useRef(null);


/*
    initial fetching 
*/
    useEffect(() => {
        fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=ar`)
        .then(response=>
            response.json())
        .then(response=>{

            console.log("json response"+JSON.stringify(response))
            //cumulate the movies for infinite pagination 
            setMovies([...Movies,...response.results])

            if(Movies) console.log(`Image url: ${IMAGE_URL}${MAIN_IMAGE_SIZE}`)

        })
    }, [])
/*
automati scrolling by handling handleScroll when scrolling 
*/
useEffect(() => {
   window.addEventListener("scroll", handleScroll);
}, [])



const handleScroll = ()=>{
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {

        // loadMoreItems()
        console.log('clicked')
        buttonRef.current.click();

    }


}


    const getMovies = (endpoint)=> {

        fetch(endpoint).then((result=>result.json())
        .then(result=>{
            /**
            Update current page 
            updte all movies by adding new page movies to the latest 

            */
           setMovies([...Movies, ...result.results])
           setCurrentPage(result.page)

        })
        
        )
    }
    const loadMoreItems = ()=>{
        let endpoint = '';
        setLoading(true);
        console.log("LOADING...,current page"+currentPage)
       //load the current page only 
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ar&page=${currentPage + 1}`;
        


    }
    return (
        <>
        
            <div className="app">
           
            {Movies[0] &&
            <MainImage image={`${IMAGE_URL}${MAIN_IMAGE_SIZE}${Movies[0].backdrop_path}`} title={Movies[0].original_title} description={Movies[0].overview?Movies[0].overview:"No overview found"} />

            }
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title level={2} > أخر الأفلام  </Title>
                <hr />
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path ?
                                    `${IMAGE_URL}${MOVIE_CARD_SIZE}${movie.poster_path}`
                                    : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {Loading &&
                    <div>Loading...</div>}

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>Load More</button>
                </div>
                </div>

          

            </div>
         
        </>
    )
}

export default LandingPage
