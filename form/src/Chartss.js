import React from 'react';
import {Bar} from 'react-chartjs-2';



const Chartss=(props)=> {
    const state = {
        labels:props.country,
        datasets: [
          {
            label: 'Average Price',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: props.Avg
          }
        ]
      }
      
    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Price of Car companies',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        
        
      </div>
    );
  
}

export default Chartss