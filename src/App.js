import { FormControl, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map'
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  //https://disease.sh/v3/covid-19/countries
  //UseEffect = Runs a piece of code
  //based on a given condition

  useEffect(()=>{
    //The code inside here will run once
    //when the component loads and not again
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
        setCountries(countries);
      });
    };
    getCountriesData();
  },[]);

  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);

  }

  return (
    <div className="App">
      <div className='app_header'>
        <h1>Co</h1>
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
          <InfoBox title='Coronavirus Cases' cases={1} total={2000}/>
          <InfoBox title='Recovered' cases={2} total={3000}/>
          <InfoBox title='Deaths' cases={3} total={4000}/>
      </div>

      <Map />

      {/* Table */}
      {/* Graph */}

      {/* Map */}

    </div>
  );
}

export default App;
