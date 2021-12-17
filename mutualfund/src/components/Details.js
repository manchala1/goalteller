import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Details() {
  const [details, setDetails] = useState([]);
  const [meta, setMeta] = useState({});
  const [latest, setLatest] = useState({});

  useEffect(async () => {
    axios
      .get("https://api.mfapi.in/mf/100027")
      .then((res) => {
        const answer = res.data.data.sort((prev, curr) => {
          return new Date(prev.date) > new Date(curr.date) ? -1 : 1;
        });
        setLatest((prevState) => ({
          ...prevState,
          ...res.data.data[0],
        }));

        setDetails(res.data.data);
        setMeta((prevState) => ({
          ...prevState,
          ...res.data.meta,
        }));
      })
      .catch((err) => console.log(err));
    // console.log("data.date b", data[0]);

    // data.sort((prev, curr) => {
    //   return prev.date - curr.date;
    // });
    // console.log("data.date a", data.data[0]);
  }, []);
  return (
    <div class="container">
      <div class="card">
        <div class="card-header">{meta.scheme_name}</div>
        <div class="card-body">
          <h5 class="card-title">{meta.scheme_category}</h5>
          <p class="card-text">{meta.scheme_type}</p>
          <p class="card-text">{meta.fund_house}</p>
          <p class="card-text">{latest.date}</p>
          <p class="card-text">{latest.nav}</p>
          <p class="card-text">{meta.scheme_type}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
