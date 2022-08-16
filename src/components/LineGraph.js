import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
    // legend: {
    //     display: false,
    // },
    elements: {
        point: {
            radius: 0,
        },
    },

    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data){
                console.log("Data",tooltipItem.value);
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: true,
                },
                ticks: {
                    callback: function(value, index, values){
                        const v = value;
                        console.log("Numeral:",v);
                        return numeral(value).format('0a');
                        
                    },
                },
            },
        ],
    },
};

 const buildChartData = (data, casesType="cases") => {

        let chartData =[];
        let lastDataPoint;
        
        for(let date in data.cases){
            if(lastDataPoint){
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date]-lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    };

function LineGraph({casesType="cases"}) {

    const [data, setData] = useState({});

    useEffect(()=>{
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=12')
                .then((response) => {
                   return response.json();
                })
                .then((data) =>{
                    let chartData = buildChartData(data,casesType);
                    setData(chartData);
                    console.log("ChartData",chartData);
                });
        };
       fetchData();
    },[casesType]);

    
  return (
    <div>
      <h1>Line Graph</h1>
      {data?.length> 0 && (
        // data && Object.keys(data).length 
        <Line 
        options={options}
            data={{
                datasets: [
                    {
                        backgroundColor:"#CC1034",
                        borderColor: "#CC1034",
                        data: data,
                    },
                ],
            }} 
        />
      )}
    </div>
  )
}

<script src="numeral.min.js"></script>
export default LineGraph
