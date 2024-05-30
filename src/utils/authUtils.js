export const getAuthHeaders = () => {
    const sessionId = localStorage.getItem('sessionId');
    const idToken = localStorage.getItem('idToken');
  
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
      'X-Session-ID': sessionId
    };
  };
  
  // Function to fetch data from a protected endpoint
  export const fetchData = async () => {
    const headers = getAuthHeaders();
  
    try {
      const response = await fetch('http://localhost:8080/api/your-protected-endpoint', {
        method: 'GET',
        headers: headers
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Data fetched successfully:", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };