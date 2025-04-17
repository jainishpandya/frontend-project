import axios from "axios";
import { useEffect, useState } from "react";

const useSelectClub = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pushInfo = async () => {
    // Extract club names and roles more safely
    const extractedLabels = [];
    const extractedRoles = [];

    data.listclubs.forEach((item) => {
      console.log("item : ", item); // Log the item for debugging
      if (item.clubusers && item.clubusers.length > 0) {
        // Assuming the club name is stored somewhere in the club object
        console.log("club Name : ", item.clubusers[0]?.club?.club_name); // Log the item for debugging
        extractedLabels.push(item.clubusers[0]?.club?.club_name || "Unknown Club");
        console.log("club Name : ", item.clubusers[0]?.role);
        extractedRoles.push(item.clubusers[0]?.role || "Member");
      }
    });

    setLabels(extractedLabels);
    setRoles(extractedRoles);
  }

  const fetchInfo = async () => {
    setIsLoading(true);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("No userId found in localStorage");
      setIsLoading(false);
      return;
    }

    try {
      const url = `http://localhost:3000/api/v1/user/clublist/${userId}`;
      console.log("URL:", url); // Log the URL for debugging
      
      const response1 = await axios.get(url).then(function (response) {
        console.log("Response from axios:", response.data);
        setData(response.data);
    });
     
    } catch (error) {
      console.error("Error fetching club list:", error);
      setError("Error fetching club list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    if (data && data.listclubs) {
      pushInfo();
    }
  }, [data]);

  return { labels, roles, isLoading, error, refetch: fetchInfo };
};

export default useSelectClub;
