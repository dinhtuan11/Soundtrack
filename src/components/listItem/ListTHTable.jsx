import PropTypes from "prop-types";

function ListTHTable({ items }) {
  
  return (
    <>
    <tr>
      {items.map((item, key) => 
        <th key={key} scope="col" className={`p-4 ${item === "Name" || item === "Title" || item === "Transaction Type" ? "": "text-center"}`}>
          {item}
        </th>
      )}
      </tr>
    </>
  )
}

ListTHTable.propTypes = {
  items: PropTypes.array,
};

export default ListTHTable;
