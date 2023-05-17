import React from "react";
import "./UserData.css";

function UserData({ idInstance, apiTokenInstance }) {
  return (
    <div className="user-data-auto">
      <p>idInstance:{idInstance}</p>
    </div>
  );
}
export default UserData;
