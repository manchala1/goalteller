import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "../components/main.css";

function Mutualmain() {
  const [data, setData] = useState([]);
  const [issearch, setIssearch] = useState(false);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);
  const [meta, setMeta] = useState({});
  const [latest, setLatest] = useState({});

  useEffect(() => {
    if (issearch) {
      axios
        .get(`https://api.mfapi.in/mf/search?q=${search}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("https://api.mfapi.in/mf")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  });
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
    <div>
      <div class="container-fluid py-5">
        <h1 class="name">Mutual Fund Store</h1>
        <form>
          <div class="row">
            <div class="col-lg-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Mutual fund"
                onChange={(e) => {
                  setIssearch(true);
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div class="col-lg-4">
              <button class="btn btn-success">Search</button>
            </div>
          </div>
        </form>
      </div>
      <h2 class="portfolio">Portfolio List</h2>
      <table className="table maintable">
        <thead>
          <tr className="table-dark ">
            <th>Mutual Funds</th>
            <th>More info</th>
            <th>Units </th>
          </tr>
        </thead>
        <tbody className="container mx-auto">
          {data.length &&
            data.map((d, key) => (
              <tr>
                <td>
                  <p key={key}>{d.schemeName}</p>
                </td>
                <td>
                  <button
                    class="btn btn btn-primary proceed"
                    onClick={() => setShow(true)}
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                </td>
                <td>
                  <input type="number" min="1" />
                </td>
              </tr>
            ))}
          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Scheme Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="confirm_page">
                <div class="row mainadd">
                  <div class="col-lg-12">
                    <div class="card">
                      <div class="card-header">{meta.scheme_name}</div>
                      <div class="card-body">
                        <h5 class="card-title">{meta.scheme_category}</h5>
                        <p class="card-text">{meta.scheme_type}</p>
                        <p class="card-text">{meta.fund_house}</p>
                        <p class="card-text">{latest.date}</p>
                        <p class="card-text">{latest.nav}</p>
                        <p class="card-text">{meta.scheme_type}</p>
                        <label>Available Units</label>
                        <p class="card-text">10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </tbody>
      </table>
    </div>
  );
}

export default Mutualmain;
