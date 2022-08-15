import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import numeral from 'numeral';

const buildChartData = [
  ['x', 'dogs', 'cats'],
  [0, 0, 0],
  [1, 10, 5],
  [2, 23, 15],
  [3, 17, 9],
  [4, 18, 10],
  [5, 9, 5],
  [6, 11, 3],
  [7, 27, 19],
]

// const buildChartData = (data, casesType='cases') => {

//     let chartData =[];
//     let lastDataPoint;
        
//     for(let date in data.cases){
//         if(lastDataPoint){
//             let newDataPoint = {
//                 x: date,
//                 y: data[casesType][date]-lastDataPoint,
//             }
//             chartData.push(newDataPoint);
//         }
//         lastDataPoint = data[casesType][date];

//         }
//     return chartData;
// };

const LineChartOptions = {
  hAxis: {
    title: 'Year',
  },
  vAxis: {
    title: 'Cases',
  },
  series: {
    1: { curveType: 'function' },
  },
}
// const LineChartOptions = {
//     legend: {
//         display: false,
//     },
//     elements: {
//         point: {
//             radius: 0,
//         },
//     },

//     maintainAspectRatio: false,
//     tooltips: {
//         mode: "index",
//         intersect: false,
//         callbacks: {
//             label: function(tooltipItem, data){
//                 return numeral(tooltipItem.value).format("+0,0");
//             },
//         },
//     },
//     scales:{
//         hAxis: [
//             {
//                 gridLines: {
//                     display: false,
//                 },
//                 ticks: {
//                     callback: function(value, index, values){
//                         return numeral(value).format("0a");
//                     },
//                 },
//             },
//         ],
//          vAxis: [
//             {
//                 type: "time",
//                 time: {
//                     format: "MM/DD/YY",
//                     tooltipFormat: "ll",
//                 },
//             },
//         ],
//     },
// };
function Linechart() {
    // const [data, setData] = useState({});

    // useEffect(()=>{
    //     const fetchData = async() =>{
    //         await  fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    //             .then((response)=>{
    //                 return response.json();
    //             })
    //             .then((data) =>{
    //                 let chartData = buildChartData(data,"cases");
    //                 setData(chartData);
    //                 console.log(chartData);
    //             });
    //     };
    //    fetchData();
    // },[casesType]);
  
    return (
      <div className="container mt-5">
        <h2>React Google Line Chart Example</h2>
        <Chart
          width={'700px'}
          height={'410px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={buildChartData}
        // data={{
        //         datasets: [
        //             {
        //                 backgroundColor: "rgba(204, 16, 52, 0)",
        //                 borderColor: "#CC1034",
        //                 data: data,
        //             }
        //         ]
        //     }} 
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
    )
  }
export default Linechart