import { useEffect, useState } from "react";

const useSelectClub = () => {
  const [data, setData] = useState();
  const [labels, setLabels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const res = await fetch(url);
      const json = await res.json();
      const clubs = json.listclubs || [];

      await setData(clubs);
      console.log(data);

      // Extract club names and roles more safely
      const extractedLabels = [];
      const extractedRoles = [];

      data.forEach((data) => {
        if (data.clubusers && data.clubusers.length > 0) {
          // Assuming the club name is stored somewhere in the club object
          extractedLabels.push(
            data.clubusers[0]?.club?.club_name || "Unknown Club"
          );
          extractedRoles.push(data.clubusers[0]?.role || "Member");
        }
      });

      setLabels(extractedLabels);
      setRoles(extractedRoles);
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

  return { labels, roles, data, isLoading, error, refetch: fetchInfo };
};

export default useSelectClub;
