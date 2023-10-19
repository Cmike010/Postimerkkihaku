interface Postimerkki {
    id : number
    asiasanat : string
    ilmestymispaiva : string
    kaytonPaattyminen : string
    nimellisarvo : number
    merkinNimi : string
    merkinVari : string|null
    painopaikka : string
    painosmaara : number
    taiteilija : string|null
    valuutta : string
    kuvanUrl : string
    julkaisuvuosi : number
  }
  
  interface ApiData {
    postimerkit : Postimerkki[],
    virhe : string,
    haettu : boolean
  }