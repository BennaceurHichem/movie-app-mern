const express = require('express');
const router = express.Router();
const { Favorite} = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             FAVORITE
//=================================

router.post("/favoriteNumber", (req, res) => {
            //find favrite infos from favorite collection using MovieId
            Favorite.find({"movieId":req.movieId}).exec((err,favorite)=>{
 
                if(err) res.sendStatus(404).json(err)
                else{

                    res.sendStatus(200).json({
                        //length of the Favorites is the total nuùber of favorited movies 
                        "favoriteNumber":favorite.length,
                        success:"true"
                    })

                }


            })


});


//favorited a movie (jnowing if a user had favorited this movie or not )
router.post("/favorited", (req, res) => {
    /*find favrite infos from favorite collection using userId, if it's 
    included(one row as a result)==> movie favorited
    //else :
    movie not favorited by this user 
    
    
    */
    Favorite.find({
        "movieId":req.body.movieId,
        "userFrom":req.body.userFrom

}).exec((err,favorite)=>{

        if(err) res.status(404).send(err)
        else{


            let result  = false;
            if(favorite.length!==0){
                result  = true;
            }
                res.status(200).json({
                    //length of the Favorites is the total nuùber of favorited movies 
                    "favorited":result
                    ,"success":"true"
                }) 
    

      
        
        }


    })


});



router.post("/addToFavorite", (req, res) => {


//SAVE THE INFIORMATION OF THE 

        //make a favorite instance based on request body 
        const favorite  =  new Favorite(req.body) 

        favorite.save((err,res)=> {
            if(err) res.status(404).send({success:"false",err})


            res.status(200).json({success:true})
        })


});



router.post("/removeFromFavorite", (req, res) => {


    //SAVE THE INFIORMATION OF THE 
    
            //delete this specific favorite     
            Favorite.findOneAndDelete(({movieId:req.body.movieId,userFrom:req.body.userFrom}))  
            .exec((err,doc)=>
            {
                if(err)   res.sendStatus(400).json({success:false,err})


                    //return th especific favorite data 
                res.send(200).json({
                    success:true,
                    doc

                })
            })
           
    
    
    });
module.exports = router;
