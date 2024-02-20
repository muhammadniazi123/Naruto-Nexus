import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
const API_URL = "https://dattebayo-api.onrender.com";
let category = '';
let name='';

app.get("/", async (req, res) => {
  try {
    let response;

    // Check if a category is selected
    if (category === "Characters") {
      response = await axios.get(API_URL+"/characters?name="+name);
      const character = response.data.characters;
      res.render("character.ejs", { content: character[0] });
    }
    //category akatsuki 
    else if (category === "Akatsuki") {
      response = await axios.get(API_URL + "/Akatsuki?name=" + name);
      const akatsuki = response.data.akatsuki;
      res.render("Akatsuki.ejs", { content: akatsuki[0] });
    }
     //category kara 
     else if (category === "kara") {
      response = await axios.get(API_URL + "/kara?name=" + name);
      const kara = response.data.kara;
      res.render("Akatsuki.ejs", { content: kara[0] });
    }
     //category Tailed-Beasts
     else if (category === "Tailed-Beasts") {
      response = await axios.get(API_URL + "/Tailed-Beasts?name=" + name);
      const TailedBeasts = response.data['tailed-beasts'];
      res.render("Tailed-Beasts.ejs", { content: TailedBeasts[0] });
    }
     //category Kekkei-Genkai 
     else if (category === "Kekkei-Genkai") {
      response = await axios.get(API_URL + "/Kekkei-Genkai?name=" + name);
      const kekkeigenkai = response.data['kekkei-genkai'];
      const firstKekkeiGenkai = kekkeigenkai[0];
      const characters = firstKekkeiGenkai.characters;
      const againresponse = await axios.get(API_URL + "/characters/" + characters.join(","));
      const characterDetails = againresponse.data;    
      const characterData = characterDetails.map(character => ({
        names: character.name,
        images: character.images[0]
        }));
      res.render("Kekkei-Genkai.ejs",  { content: characterData, heading: category, type: name });
    }
    //category clan 
    else if (category === "clan") {
      response = await axios.get(API_URL + "/clans?name=" + name);
      const clan = response.data.clans;
      const firstclan = clan[0];
      const characters = firstclan.characters;
      const againresponse = await axios.get(API_URL + "/characters/" + characters.join(","));
      const characterDetails = againresponse.data;    
      const characterData = characterDetails.map(character => ({
        names: character.name,
        images: character.images[0]
        }));
      res.render("Clan.ejs",  { content: characterData, heading: category, type: name });
    }
    //category village
    else if (category === "Village") {
      response = await axios.get(API_URL + "/villages?name=" + name);
      const village = response.data.villages;
      const firstvillage = village[0];
      const characters = firstvillage.characters;
      const againresponse = await axios.get(API_URL + "/characters/" + characters.join(","));
      const characterDetails = againresponse.data;   
      const characterData = characterDetails.map(character => ({
        names: character.name,
        images: character.images[0]
        }));
      res.render("village.ejs",  { content: characterData, heading: category, type: name });
    }
    //category teams
    else if (category === "Teams") {
      response = await axios.get(API_URL + "/Teams?name=" + name);
      const Team = response.data.teams;
      const firstTeam = Team[0];
      const characters = firstTeam.characters;
      const againresponse = await axios.get(API_URL + "/characters/" + characters.join(","));
      const characterDetails = againresponse.data;    
      // Extract names from character details
      const characterData = characterDetails.map(character => ({
        names: character.name,
        images: character.images[0]
        }));
      res.render("Teams.ejs",  { content: characterData, heading: category, type: name });
    }
    else {
      // Default behavior: render random character
      const response = await axios.get(API_URL + "/characters");
      const characters = response.data.characters;
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters[randomIndex];
      res.render("index.ejs", { content: randomCharacter });
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("error.ejs"); 
    console.error("Error rendering error page:", error);
}
});

// Category selection
app.post("/category", async (req, res) => {
  try {
    category = req.body.category;
    name = req.body.name;
    res.redirect("/");
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("error.ejs"); 
    console.error("Error rendering error page:", error);
}
});

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).render("error.ejs");
});
