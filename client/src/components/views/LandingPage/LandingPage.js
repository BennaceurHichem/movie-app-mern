import React,{useEffect,useState,useRef} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL,API_KEY,IMAGE_URL,MAIN_IMAGE_SIZE,MOVIE_CARD_SIZE} from '../../Config'
import MainImage from './MainImage/MainImage/MainImage';
import GridCards from './MainImage/GridCards'
import { Typography, Row, Button } from 'antd';

const { Title } = Typography;


function LandingPage() {
        
    
       const  [Movies,setMovies] = useState([])
       const [MainMovieImage, setMainMovieImage] = useState(null)
       const [CurrentPage, setCurrentPage] = useState(0)
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


    const getMovies =  (endpoint)=> {

        fetch(endpoint).then((result)=>result.json())
        .then(result=>{
            /**
            Update current page 
            updte all movies by adding new page movies to the latest 

            */
           setMovies([...Movies, ...result.results])
           setMainMovieImage(MainMovieImage || result.results[0])
           setCurrentPage(result.page)

        })
        
        
    }
    const loadMoreItems = ()=>{
        let endpoint = '';
        setLoading(true);
        console.log("LOADING...,current page"+CurrentPage)
       //load the current page only 
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ar&page=${CurrentPage + 1}`;
        
        getMovies(endpoint);


    }
    return (
        <>
        
            <div style={{ width: '100%', margin: '0' }}>
           
            {MainMovieImage &&

            <MainImage image={`${IMAGE_URL}${MAIN_IMAGE_SIZE}${Movies[0].backdrop_path}`} title={Movies[0].original_title} description={Movies[0].overview?Movies[0].overview:""} />

            }
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title level={2} > أخر الأفلام  </Title>
                <hr />
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image={movie.poster_path ?
                                    `${IMAGE_URL}${MOVIE_CARD_SIZE}${movie.poster_path}`
                                    : null}
                                movieId={movie.id? movie.id:0}
                                movieName={movie.original_title?movie.original_title:""}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {Loading &&
                    <div style={{"margin-top":"30px"}}>Loading...</div>}

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
