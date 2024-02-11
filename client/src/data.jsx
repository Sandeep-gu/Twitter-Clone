import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
function Data() {
  const [dataset, setDataSet] = useState([]);
  useEffect(() => {
    handleData();
  }, []);
  const handleData = async () => {
    try {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (data) {
        console.log(data);
        setDataSet(data.data);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const allEvenIdData = dataset.filter((user) => user.id % 2 == 0);
  console.log("all Even Data", allEvenIdData);

  return <div>data</div>;
}

export default Data;
