
import {  BiCalendar } from "react-icons/bi";
import Search from "./components/Serach";
import Addappointment from "./components/Addappointment";
import{ useState,useCallback,useEffect} from "react";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {

  let [appointmentList, setAppointmentList] = useState([]);
  let[query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy , setOrderBy] = useState("desc");

  
  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a,b)=> {
 
     let order = (orderBy === 'asc') ? 1 : -1;

     return(
       a[sortBy].toLowerCase <  b[sortBy].toLowerCase  ? -1 * order : 1 * order
     )
 
  })


  const fetchData = useCallback(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data)
      });
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData]);
  return (
    <div className="App container mx-auto mt-5 font-thick">
     
     <h1 className = "text-5xl mb-3">  <BiCalendar className = "inline-block text-blue-900 align-top"/>  Your Appointments</h1>
     <Addappointment />
        <Search  query = {query}
         
         onQueryChange = {myQuery => setQuery(myQuery)}
        
         
        />

        <ul className="divide-y divide-gray-200">
        {filteredAppointments
          .map(appointment => (
            <AppointmentInfo key = {appointment.id}
            appointment = {appointment}

            
            onDeleteAppointment={
              appointmentId =>
                setAppointmentList(appointmentList.filter(appointment =>
                  appointment.id !== appointmentId))
            }



            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
