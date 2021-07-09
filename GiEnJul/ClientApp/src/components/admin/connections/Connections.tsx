import * as React from "react";
import { useState } from "react";
import AdminMenu from "../common/AdminMenu";
import Suggested from "./Suggested";
import Completed from "./Completed";

function Connections() {
  const [search, setSearch] = useState("");

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const onSearchSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    alert(search);
  };

  return (
    <div>
      <AdminMenu />
      <h4 className="text-uppercase">ADMIN karianne</h4>
      <form onSubmit={onSearchSubmit}>
        <input
          name="search"
          value={search}
          onChange={onSearchChange}
          placeholder="Search"
        />
      </form>
      <Suggested />
      <Completed />
    </div>
  );
}

export default Connections;
