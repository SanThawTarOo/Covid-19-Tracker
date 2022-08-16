import { CardContent, FormControl, MenuItem, Select, Card} from '@mui/material';
import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map'
import Table from './components/Table'
import { sortData } from './components/util';
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css"
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng:-40.4796});
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  },[])

  //https://disease.sh/v3/covid-19/countries
  //UseEffect = Runs a piece of code
  //based on a given condition

  useEffect(()=>{
    //The code inside here will run once
    //when the component loads an d not again
    //asyn-> send a request, wait for it,do something with input

    const getCountriesData = async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((Response)=>Response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name: country.country,//United States, United Kindom
            value: country.countryInfo.iso2 //UK,USA,FR
          }
        ));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    };
    getCountriesData();
  },[]);

  const onCountryChange = async (event)=>{
    
    const countryCode = event.target.value;
    // setCountry(countryCode);

    const url =
     countryCode === 'worldwide' 
     ? 'https://disease.sh/v3/covid-19/all'
     : `https://disease.sh/v3/covid-19/countries/${countryCode}` ;
  
  //https://disease.sh/v3/covid-19/all
  //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  
    await fetch(url)
    .then(response => response.json())
    .then((data) => {
      setCountry(countryCode);

      //All of the data form the country response
      setCountryInfo(data);

      setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
      setMapZoom(4);
    });
  };
  console.log("country ",countryInfo)


  return (
    <div className="app">
      <div className='app_left'>
          <div className='app_header'>
            <h1>COVID-19 Tracker</h1>
            <FormControl className='app_dropdown'>

              {/* Loop through all the countries and show a drop down list of the options*/}
              
              <Select variant="outlined" value={country} onChange={onCountryChange}>
                <MenuItem value="worldwide">WorldWide</MenuItem>
                {
                  countries.map(country => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
                }
              </Select>
              

              {/* <Select variant="outlined" value="abc">
                <MenuItem value="worldwide">Worldwide</MenuItem>
                <MenuItem value="worldwide">Option 1</MenuItem>
                <MenuItem value="worldwide">Option 2</MenuItem>
                <MenuItem value="worldwide">Option 3</MenuItem>
              </Select> */}
            </FormControl>
          </div>
          
          <div className='app_stats'>
              <InfoBox title='Coronavirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases}/>
              <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
              <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
          </div>

          <Map center={mapCenter} zoom={mapZoom}/>
      </div>

      <Card  className='app_right'>
          <CardContent>
            <h3>Live Cases By Country</h3>
            <Table countries={tableData} />
            <h3>WorldWide new cases</h3>
            <LineGraph />
          </CardContent>   
      </Card>
    </div>
  );
}

export default App;
