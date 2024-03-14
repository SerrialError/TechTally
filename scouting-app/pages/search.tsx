import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search: React.FC = () => {
  const [responseData, setResponseData] = useState<any[]>([]); // Update type accordingly
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiM2ZlZWY2ZDMwMTVkNDk3MTQ1NjkzNmRiNmRiODRiNGFiMjc2NmM1Y2ZjMjFlZmE4NmNhYWZjODhmNzk3OTczMmY2ZGY4MDgwMjBmMTU4MjAiLCJpYXQiOjE3MTAyMDM4NTQuMjg0MTcyMSwibmJmIjoxNzEwMjAzODU0LjI4NDE3NDksImV4cCI6MjY1Njg5MjI1NC4yNzkxMTgxLCJzdWIiOiIxMjgxMDIiLCJzY29wZXMiOltdfQ.kfSyCadLa1SuspKO8wYbAx6GM16VeSpvto7pwxpSEGxvC-etvJVLy-XHb6T_aQB3CxnirN2yW5DWZC8DmFND9_2YaSjk6VSxL6gK0N_Oh_p_DrhXgdEe2qrK9b3M1KhOAHp_Yb6lL2FWsht5CkXEUnt575oEha7Smkoui9WjAb2YVlSSm9kyMQIWWlEEBWGG1xua15dp7CIWvQfV0HNp5Bd4GP3No7vCt1uQt32z0GmAlTWmkTpky-lVCG4KwehSjOQav9wIpLM7np3jTLUGIIPTyF_dNFT1iogCyMtB23Xg3IvbwhioIJlaHFSiQgdrQXf6q9nwuIt0SOUzyqvPnnXv3ePdH9DEHPjrmZQQM5m9vn9KRFzOoSLriwvo5vXu8Ei7rWU16N9Z6_aUSBx9077q2nw794svFntAoiJGaxUaCEvUcCLwC98ThNiIEBVDTanupsAhaHUMl4zLk_xGa0VvI_hg_JfT1FQjAqYq_vWeeju7ONCnnbCswpUGNIcvb6SeepzZzPfRWhH5xivq5mQKd1_eGkLxjEcCUKWRCytagzcS7t3jIRrBt0n8SEYGYDiuQhgE0zj8xQlessvQUCLKFVeOH-hLyzJt5d11BaGHNLWT70ZcyJN1SKj0Z3_BTz39_NA3DHwbKppfE_lZyZ4GOEdctj5qkffF9i0wTkE'; // Replace 'YOUR_ACCESS_TOKEN' with your actual access token

  useEffect(() => {
    // Fetch data from the external API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.robotevents.com/api/v2/events', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setResponseData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Search Teams</h1>
      {/* Display the formatted response data on the page */}
      {responseData.length > 0 && (
        <div>
          {responseData.map((team: any, index: number) => (
            <div key={index}>
              <h2>Team {index + 1}</h2>
              <p>Name: {team.name}</p>
              <p>Venue: {team.location.venue}</p>
              <p>Location: {team.location.city}, {team.location.region}, {team.location.country}</p>
              <p>Start Date: {team.start}</p>
              <p>End Date: {team.end}</p>
              <p>Level: {team.level}</p>
              <h3>Specific Stats</h3>
              <p>Event ID: {team.id}</p>
              <p>Event SKU: {team.sku}</p>
              <p>Season ID: {team.season.id}</p>
              <p>Season Name: {team.season.name}</p>
              <p>Awards Finalized: {team.awards_finalized.toString()}</p>
              <p>Divisions:</p>
              {team.divisions.map((division: any, index: number) => (
                <div key={index}>
                  <p>Division ID: {division.id}</p>
                  <p>Division Name: {division.name}</p>
                  <p>Division Order: {division.order}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
