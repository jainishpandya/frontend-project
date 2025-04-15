import { useEffect, useState } from "react";

const useSelectClub = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [roles, setRoles] = useState([]);

  const fetchInfo = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }

    try {
      const url = `http://localhost:3000/api/v1/user/clublist?userid=${userId}`;
      const res = await fetch(url);
      const json = await res.json();
      const clubs = json.listclubs || [];

      setData(clubs);
      setLabels(clubs.map((item) => item.clubusers[0]?.clubId));
      setRoles(clubs.map((item) => item.clubusers[0]?.role));
    } catch (error) {
      console.error("Error fetching club list:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return { labels, roles, data }; // you can access full data too if needed
};

export default useSelectClub;
