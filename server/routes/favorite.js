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
 
                if(err) res.send(404).json(err)
                else{

                    res.send(200).json({
                        //length of the Favorites is the total nuùber of favorited movies 
                        "favoriteNumber":favorite.length,
                        success:"true"
                    })

                }


            })


});


//favorited a movie (adding an elemtn to the Favorit Model)
router.post("/favorited", (req, res) => {
    /*find favrite infos from favorite collection using userId, if it's 
    included(one row as a result)==> movie favorited
    //else :
    movie not favorited by this user 
    
    
    */
    Favorite.find({
        "movieId":req.body.movieId,
        "userFrom":req.bosy.userFrom

}).exec((err,favorite)=>{

        if(err) res.sendStatus(404).json(err)
        else{


            let result  = false;
            if(favorite!==0){
                result  = true;
            }

            if(favorite.length !==0){

                res.sendStatus(200).json({
                    //length of the Favorites is the total nuùber of favorited movies 
                    "favorited":result
                    ,"success":"true"
                }) 
    

            }
        
        }


    })


});
module.exports = router;
