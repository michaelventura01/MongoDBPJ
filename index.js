
const mongoose = require('mongoose');
//const conectionString = "mongodb+srv://michael:secreto01@cluster0.1lcel.azure.mongodb.net/db_test?retryWrites=true&w=majority";

const {MONGO_URI} = require('./config');
const axios = require("axios").default;
const cheerio = require("cheerio");
const cron = require("node-cron");
const { Noticia } = require("./model")

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// supuesto a ejecutarse cada hora
cron.schedule("* */1 * * * *", async () => {

    const html = await axios.get("https://noticiassin.com/");
    const $ = cheerio.load(html.data);
    // selector css
    const titulos = $(".be2020-o-list-content");
    titulos.each((index, element)=> {
        //objeto creado en model
        const noticia = {
            titulo: $(element).text().toString(),
            enlace: $(element).children().attr("href")
        };
        console.log(noticia);
        Noticia.create([noticia]);
    });
})
    









