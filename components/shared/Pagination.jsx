import { useState } from "react";
import Pagination from "react-js-pagination";

const AppPagination = ({ count }) => {
  const [activatePate, setActivatePage] = useState(1);
  return (
    <Pagination
      itemClass="page-item"
      linkClass="page-link"
      activePage={activatePate}
      itemsCountPerPage={10}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      onChange={(page) => setActivatePage(page)}
    />
  );
};

export default AppPagination;
