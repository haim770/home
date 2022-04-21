import React from "react";
function SearchComp(props) {
  return (
    <p>
      <input
        type="text"
        name="search"
        id="search"
        required
        value={props.searchValue}
        onChange={(e) => props.searchChange(e)}
      />
    </p>
  );
}

export default SearchComp;
