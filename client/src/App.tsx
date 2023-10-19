import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, CardContent, CardMedia, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import RadioValinta from './components/RadioValinta';
import RangeSlider from './components/RangeSlider';



const App : React.FC = () : React.ReactElement => {

  const [apiData, setApiData] = useState<ApiData>({
                                                  postimerkit : [],
                                                  virhe : "",
                                                  haettu : false
  });

  const apiKutsu = async (kohde : string, hakusana : string, alkuVuosi : string, loppuVuosi : string) : Promise<void> => {

    setApiData({
      postimerkit : [],
      virhe : "",
      haettu : false
    })

    const url : string = `/api/postimerkit?kohde=${kohde}&hakusana=${hakusana}&alkuvuosi=${alkuVuosi}&loppuvuosi=${loppuVuosi}`;

    try {

      const yhteys = await fetch(url);
      
      if (yhteys.status === 200){
        
        setApiData({
        postimerkit : await yhteys.json(),
        virhe : "",
        haettu : true 
        })}
        
      else {
        let virheData : { virhe? : string} = await yhteys.json();
        let virheteksti : string = "";
        switch (yhteys.status) {

          case 400 : virheteksti = virheData.virhe || "Virhe pyynnön tiedoissa"; break;
          default : virheteksti = "Palvelimella tapahtui odottamaton virhe"; break;
        }

        setApiData({
          postimerkit : [],
          virhe : virheteksti,
          haettu : true
        });
      }
    }

    catch (e : any) {
      setApiData({
        ...apiData,
        virhe : "Palvelimeen ei saada yhteyttä!",
        haettu : true
      })
    }
    
  }

  /*useEffect(() => {
    console.log(apiData)
  },[apiData])*/
 
  const hakuRef : any = useRef();

  const haku = (e : React.FormEvent) => {
    
    e.preventDefault();
    
    if (hakuRef.current.hakusana.value.length > 2){
      
      //apikutsu tässä
      
      const hakusana : string = hakuRef.current.hakusana.value.toLowerCase();
      const kohde : string = hakuRef.current.kohde.value;
      const alkuVuosi : string = hakuRef.current.vuodet[0].value;
      const loppuVuosi : string = hakuRef.current.vuodet[1].value;
      //console.log(alkuVuosi + " " + loppuVuosi)
      apiKutsu(kohde, hakusana, alkuVuosi, loppuVuosi);
    }

    else {
      //Virheilmoitus
      setApiData({
        ...apiData,
        virhe : "Hakusanan on oltava yli kaksi merkkiä."
      })
    }
  }

  return (
    <Container>
      <Paper
            component="form"
            onSubmit={haku}
            ref={hakuRef}
            >
        <TextField
                  label='Hakusana...'
                  variant='outlined'
                  name='hakusana'
        />
        <br />
        <br />
        <RadioValinta/>
        <br />
        <br />
        <RangeSlider/>
        <br />
        <br />
        <Button 
              type='submit'
              variant='contained'
              >Hae
        </Button>
      </Paper>
      <br />
      <br />
      {(Boolean(apiData.virhe))
      ?<Alert severity='error'>{apiData.virhe}</Alert>
      :<Grid container columns={{ sm: 12, md:12, lg: 12}}>
        {apiData.postimerkit.length === 40 && 
        (
        <Grid item xs={12}>
          <Alert severity='warning'>Haulla löytyi yli 40 postimerkkiä, näytetään vain ensimmäiset 40. Ole hyvä ja tarkenna hakua</Alert>
        </Grid>
        )}
        {apiData.postimerkit.map((postimerkki : Postimerkki, idx : number) => {
          return(
          <Grid item xs={3} key={idx} pb={1}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
              <CardContent sx={{flex : 1}}>
                <Typography gutterBottom variant='h5' sx={{fontWeight : "bold"}}>{postimerkki.merkinNimi}</Typography>
                <Typography variant='body1'>{"Arvo: " + postimerkki.nimellisarvo + " " + postimerkki.valuutta + "a"}</Typography>
                <Typography variant='body1'>{"Painosmäärä: " + postimerkki.painosmaara}</Typography>
                <Typography variant='body1'>{"Taiteilija: " + (postimerkki.taiteilija ? postimerkki.taiteilija : "Tuntematon")}</Typography>
              </CardContent>
              <CardMedia
                      sx={{height : 250, marginBottom : 2}}
                      image={postimerkki.kuvanUrl}
              />
            </Card>
          </Grid>
        )})}
      </Grid>
      }
    </Container>
  )
}
export default App;
