import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [data, setData] = useState({
    name: { title: "", first: "", last: "" },
    email: "",
  });

  const [apiLoading, setApiLoading] = useState(false);

  const url = "https://randomuser.me/api";

  const apiCall = async () => {
    setApiLoading(true);
    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        const result = response.data.results[0];
        const responseProfileData = {
          name: result.name,
          email: result.email,
        };
        setData(responseProfileData);
        localStorage.setItem("user", JSON.stringify(responseProfileData));
      }
      setApiLoading(false);
    } catch (error) {
      alert(error);
      setApiLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className="App">
      <p>{`${data.name.title} ${data.name.first} ${data.name.last}`}</p>
      <p>{data.email}</p>
      <button
        className="button"
        onClick={apiCall}
        disabled={!apiLoading ? false : true}
      >
        Refresh
      </button>
    </div>
  );
}
