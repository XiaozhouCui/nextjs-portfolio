import Pagination from "react-js-pagination";

const AppPagination = () => {
  return (
    <Pagination
      itemClass="page-item"
      linkClass="page-link"
      activePage={1}
      itemsCountPerPage={10}
      totalItemsCount={50}
      pageRangeDisplayed={5}
      onChange={() => {}}
    />
  );
};

export default AppPagination;
