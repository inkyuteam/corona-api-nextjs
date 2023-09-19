import { Pie } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';
import getData from '@/utils/getData';

export const PieComponent = () => {
    const [data, setData] = useState([]);
    const [pieDataArray, setPieDataArray] = useState([]);
    

    



    
 
    useEffect( ()=>{
        (async()=>{
            const covidData = await getData();
            setData(covidData);
        })()
        
    },[])


    useEffect(() => {
      
        const result = data.reduce((acc, entry) => {
            const year = entry.date.slice(0, 4);
            const index = acc.findIndex(item => item.type === year);
          
            if (index === -1) {
              acc.push({ type: year, value: entry.cumVaccinesGivenByPublishDate });
            } else if (entry.date > acc[index].latestDate) {
              acc[index].value = entry.cumVaccinesGivenByPublishDate;
              acc[index].latestDate = entry.date;
            }
          
            return acc;
          }, []);
          
          const formattedResult = result.map((entry, index) => {
            if (index === 0) {
              return entry;
            }
          
            const prevYearIndex = result.findIndex(item => item.type === String(Number(entry.type) - 1));
            const prevYearValue = prevYearIndex !== -1 ? result[prevYearIndex].value : 0;
          
            return {
              type: entry.type,
              value: entry.value - prevYearValue
            };
          });
          
          setPieDataArray(formattedResult);
    }, [data])
    

    

      const config = {
        appendPadding: 10,
        data : pieDataArray,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 8,
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
        statistic: {
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'eclipsis',
              textAlign: 'center',
              fontSize: 14,
            },
            content: 'Vaccines',
          },
        },
      };
      return <Pie {...config} />;


}
