import express from 'express';
import dotenv from 'dotenv';
import apiPostimerkitRouter from './routes/apiPostimerkit';
import virhekasittelija from './errors/virhekasittelija';

dotenv.config();

const app : express.Application = express();

const portti : number = Number(process.env.PORT);

app.use("/api/postimerkit", apiPostimerkitRouter);

app.use(virhekasittelija);

app.listen(portti, () => {

    console.log("Palvelin käynnistyi porttiin: " + portti);
})