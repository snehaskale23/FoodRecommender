import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port =  4000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/random", async (req,res)=>{
    try{
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
        const result = response.data;
        res.render("meal.ejs",{name:result.meals[0].strMeal,img:result.meals[0].strMealThumb});
    }catch(error){
        console.error("Couldnt recieve data");
    }
});

app.post("/takeCountry",(req,res)=>{
    res.render("info.ejs",{basis:"Cuisine"});
});

app.post("/mealWC", async(req,res)=>{
    const searchCountry = req.body.inp;
    try{
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchCountry}`);
        const result = response.data;
        const num = Math.floor(Math.random()*result.meals.length+1);
        res.render("mealWC.ejs",{name:result.meals[num].strMeal,img:result.meals[num].strMealThumb});
    }catch(error){
        console.error("Couldnt recieve data");
    }
});

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});