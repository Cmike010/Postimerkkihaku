import express, { NextFunction } from 'express';
import { Postimerkki, PrismaClient } from '@prisma/client';
import { Virhe } from '../errors/virhekasittelija';

const prisma : PrismaClient = new PrismaClient();

const apiPostimerkitRouter : express.Router = express.Router();

apiPostimerkitRouter.use(express.json());

apiPostimerkitRouter.get("/", async (req : express.Request, res : express.Response, next : NextFunction) => {
    
    try {

        let kohde : string = String(req.query.kohde)
        let hakusana : string = String(req.query.hakusana)
        let alkuvuosi : number = Number(req.query.alkuvuosi)
        let loppuvuosi : number = Number(req.query.loppuvuosi)

        let tulokset : Postimerkki[] = [];
        
        switch (kohde) {

            case "asiasanat" : 

            tulokset = await prisma.postimerkki.findMany({
            
                where : {
                    AND: [{
                        asiasanat : {
                            search : hakusana,
                        },
                        julkaisuvuosi : {
                            gte : alkuvuosi,
                            lte : loppuvuosi
                        }
                    }]
                }
                , take : 40
            })
            
            ; break;

            case "merkinNimi" : 

            tulokset = await prisma.postimerkki.findMany({
            
                where : {
                    AND: [{
                        merkinNimi : {
                            search : hakusana,
                        },
                        julkaisuvuosi : {
                            gte : alkuvuosi,
                            lte : loppuvuosi
                    }
                }]
                }
                , take : 40
            })
            
            ; break;

            case "taiteilija" : 

            tulokset = await prisma.postimerkki.findMany({
            
                where : {
                    AND: [{
                        taiteilija : {
                            search : hakusana,
                        },
                        julkaisuvuosi : {
                            gte : alkuvuosi,
                            lte : loppuvuosi
                        }
                    }]
                }
                , take : 40
            })
            
            ; break;
          }
        
        if (tulokset.length > 0){
            res.json(tulokset)
        }

        else { 
            next(new Virhe(400, `Hakusanalla ${hakusana} ei löytynyt yhtään postimerkkiä.`))
        }
    } 

    catch (e : any) {
        next(new Virhe(e));
    }
})

export default apiPostimerkitRouter;