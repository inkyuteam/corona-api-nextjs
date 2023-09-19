'use client'
import React, { useEffect, useState } from 'react';
import { DualAxes } from '@ant-design/plots';
import getData from '@/utils/getData';

const DualAxesComponent = () => {

    const [data, setData] = useState([]);
    const [dualAxesArray, setDualAxesArray] = useState([]);
    

    
 
    useEffect( ()=>{
        (async()=>{
            const covidData = await getData();
            setData(covidData);
        })()
        
    },[])
    
  
    useEffect(() => {
  
          if(data && data.length !== 0){
  
            const transformedArray = []
      
            for (const item of data) {
              transformedArray.push({
                time: item.date,
                value: item.newVaccinesGivenByPublishDate,
                type: 'Vacines Given'
              });
              transformedArray.push({
                time: item.date,
                value: item.dailyCases,
                type: 'Daily Cases'
              });
              transformedArray.push({
                time: item.date,
                value: item.dailyDeaths,
                type: 'Daily Deaths'
              });
              
            }
  
            setDualAxesArray(transformedArray)
            
          }
    
  
    }, [data])
    

    const transformData = [
    ];
    const config = {
      data: [dualAxesArray, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          seriesField: 'type',
        },
        {
          geometry: 'line',
          lineStyle: {
            lineWidth: 0,
          },
        },
      ],
    };

  return (
    <DualAxes {...config} />
  )
}

export default DualAxesComponent