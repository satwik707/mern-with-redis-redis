import "./App.css";
// import Form from "./Form";
// import {BrowserRouter as Router ,Route ,Switch} from 'react-router-dom'
// import RandomPage from "./RandomPage";
import Chartss from './Chartss.js'
import { useEffect, useState } from "react";
const App = () => {
  const [Data, SetData] = useState([])
  const [Country, Setcountry]= useState([])
  const [Avg, SetAvg]=useState([])
 const [Flag, SetFlag]=useState(false)
  useEffect(()=>
  {
    fetch('http://localhost:3000/').then(response => response.json())

      .then(data => { SetData(JSON.parse(data)) ; })

      
      // console.log(country)

  },[])

  useEffect(()=>
  {
    const Arr=[]
    Data.map(d=> Arr.push(d._id))
    Setcountry(Arr)
    SetFlag(true)
   
  },[Data]
  )


  useEffect(()=>
  {
    const Arr=[]
    Data.map(d=>Arr.push(d.Avg_Price))
    SetAvg(Arr)
   
  },[Country])
  
return (
  // <>{Data.map(d=> <div key={Math.random()}>Country {d._id} Avg Age {d.Avg_age}</div>)} 
  <>
  {/* <button onClick={onsubmitHandler}>click</button> */}
  {/* {Data.map(d=> <div key={Math.random()}>Country {d._id} Avg Age {d.Avg_age}</div>)}  */}
  {(Country.length>5 && Avg.length>5)?<Chartss country={Country} Avg={Avg}/>:''}
  
  </>
  


)
  
};

export default App;
