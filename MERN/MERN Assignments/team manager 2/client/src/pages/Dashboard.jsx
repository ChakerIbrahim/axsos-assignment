import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Dashboard = (props)=> {
  const[players, setPlayers]= useState([]);
  const[loading, setLoading]= useState(true);

  const getPlayers= async()=> {
    setLoading(true);

    try{
      const response = await axios.get("http://localhost:8000/api/players");

      setPlayers(response.data.players);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  const onDelete= async(event, id)=> {
    try{
      await axios.delete(`http://localhost:8000/api/players/${id}`);

      setPlayers(players.filter((player)=> player));
    } catch (err){
      console.log(err);
    }
  };

useEffect(()=> {
  getPlayers();
},[]);

if(loading){
  return<p style={{textAlign:"center", fontSize:"40px"}}>Loading...</p>;
}

return(
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Player Name</th>
        <th>Preferred Position</th>
      </tr>
    </thead>
    <tbody>
      {players.map((player)=>{
        return(
          <tr key={player._id}>
            <td>{player._id}</td>
            <td>{player.name}</td>
            <td>{player.preferredPosition}</td>
            <td>
              <button onClick={(e)=> onDelete(e, player._id)}>Delete</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
};

export default Dashboard;