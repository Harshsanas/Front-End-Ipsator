import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {

  return (
    <nav className={styles.navCont}>
        <div>
          <Link className={styles.navLogo} to="/">
            VEHICLE CRASH RECORDS
          </Link>
        </div>
    </nav>
  );
}

export default Navbar;
