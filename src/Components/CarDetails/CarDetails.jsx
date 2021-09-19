import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarCrashContext } from "../../Context/CarCrashContext";
import styles from "./Cardetails.module.css";

function CarDetails() {
  const [data, setData] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsEroor] = useState(false);

  const [page, setPage] = useState(0);

  const { theme } = useContext(CarCrashContext); 

  const [query, setQuery] = useState("");

  const getCrashData = (date = "2021-04-14", page = 0) => {
    setIsLoading(true);

    return axios
      .get(
        `https://data.cityofnewyork.us/resource/h9gi-nx95.json?crash_date=${date}T00:00:00.000&$offset=${page}&$limit=15`
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsEroor(true);
        setIsLoading(false);
      })
      .finally(() => {
        setIsEroor(false);
        setIsLoading(false);
      });
  };
  


  useEffect(() => {
    getCrashData(query, page);
  });

  const handleFilter = () => {
    getCrashData(query);
  };

  console.log(data);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getCrashData(query);
    }
  };

  return (
    <div className={styles.carCrashCont}>
      <header className={styles.headerCont}>
        <h1>Vehical Crash Data</h1>
      </header>

      <section>
        <div>
          <div className={styles.filterCont}>
            <input
              placeholder="Search by Date"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleFilter}>Search</button>
          </div>
        </div>
      </section>


      <>
        {(
          <section>
            {isLoading ? (
              <h3>Loading...</h3>
            ) : isError ? (
              <h3>Something went wrong...</h3>
            ) : (
              <section>
                <div
                  className={styles.tableHeader}
                  style={{ border: theme.tableBorder }}
                >
                  <div style={{ border: theme.tableBorder }}>Car type - 1</div>
                  <div style={{ border: theme.tableBorder }}>Car type - 2</div>
                  <div style={{ border: theme.tableBorder }}>Crash Date</div>
                  <div style={{ border: theme.tableBorder }}>Crash Time</div>
                </div>
                <div>
                  {data.map((item) => {
                    return (
                      <Link
                        key={item.collision_id}
                        className={styles.tableRows}
                        to={item.collision_id}
                        style={{
                          border: theme.tableBorder,
                          borderBottom: theme.tableBorderBottom,
                          borderTop: theme.tableBorderTop,
                        }}
                      >
                        <div style={{ border: theme.tableBorder }}>
                          {item.vehicle_type_code1}
                        </div>
                        <div style={{ border: theme.tableBorder }}>
                          {item.vehicle_type_code2}
                        </div>
                        <div style={{ border: theme.tableBorder }}>
                          {item.crash_date}
                        </div>
                        <div style={{ border: theme.tableBorder }}>
                          {item.crash_time}
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className={styles.paginationCont}>
                  <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 5)}
                  >
                    PREVIOUS
                  </button>

                  <button onClick={() => setPage(page + 5)}>Next</button>
                </div>
              </section>
            )}
          </section>
        )}
      </>
    </div>
  );
}

export default CarDetails;
