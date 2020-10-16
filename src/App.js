import React, { useCallback, useEffect, useState } from "react";
import BarChart from "./Charts/barChart";
// import dummy_data from "./dummy_data.json";

function App() {
  const [loader, setLoader] = useState(false);
  const [dataSource, updateDataSource] = useState([]);

  const fetchData = useCallback(() => {
    setLoader(true);

    fetch(`${process.env.REACT_APP_BASE_URL}/api/configure_chart/`, {
      method: "POST",
      body: JSON.stringify({
        file_id: 1,
        chart_type: "Bar",
        chart_title: "Name vs Borrowed ",
        x_axis_label: "Person Name",
        y_axis_label: "Borrowed",
        aggregation_type: "avg",
        aggregation_field_value: ["salary"],
        aggregation_field_name: ["first_name"],
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        updateDataSource(data["res"]);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <div>{loader ? "...loading" : <BarChart data={dataSource} />}</div>;
}

export default App;
