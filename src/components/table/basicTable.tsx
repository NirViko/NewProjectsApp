import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTable, useSortBy } from "react-table";
import { connect } from "react-redux";
import { COLUMNS } from "./columns";
import "./table.css";
import { TypeOfInfo } from "../CommonTypes";
import { scoreCell } from "./scoreCell";

//Getting the token object from the store
function mapStateToProps(state: any) {
  return {
    tokenObject: {
      tokenValue: state.tokenObject.tokenValue,
      personalDetails: {
        nameValue: state.tokenObject.personalDetails.nameValue,
        teamValue: state.tokenObject.personalDetails.teamValue,
        joinedAtValue: state.tokenObject.personalDetails.joinedAtValue,
        avatarValue: state.tokenObject.personalDetails.avatarValue,
      },
    },
  };
}

//Component that display the list of projects on a table
export default connect(mapStateToProps)(function BasicTable(props: any) {
  const { tokenObject } = props;
  const [listOfProjects, setlistOfProjects] = useState<TypeOfInfo[]>([]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => listOfProjects, [listOfProjects]);

  useEffect(() => {
    axios
      .get("https://private-052d6-testapi4528.apiary-mock.com/info", {
        headers: { Authorization: `Bearer ${tokenObject}` },
      })
      .then((response) => {
        var arrayUpdate: TypeOfInfo[] = [...response.data];
        setlistOfProjects([...arrayUpdate]);
      });

    console.log("token", tokenObject);
  }, [tokenObject]);

  const tableInstance = useTable<any>({ columns, data }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  //render the table header
  const renderHeaderGroups = (headerGroup: any) => {
    return (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column: any) => (
          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
            {column.render("Header")}
            <span>
              {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
            </span>
          </th>
        ))}
      </tr>
    );
  };

  const renderTableHeader = () => {
    return <thead>{headerGroups.map(renderHeaderGroups)}</thead>;
  };

  //if the score up to 90 ,colore the cell in green , else if the score is less then 70 color it in red
  const renderCells = (cell: any) => {
    if (cell.column.Header === "Score") {
      if (cell.value > 90) {
        return scoreCell("green", cell);
      } else if (cell.value < 70) {
        return scoreCell("red", cell);
      }
    }

    return <td {...cell.getCellProps()}>{cell.value.toString()}</td>;
  };

  //render the table cell
  const renderTableBody = () => {
    return (
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return <tr {...row.getRowProps()}>{row.cells.map(renderCells)}</tr>;
        })}
      </tbody>
    );
  };

  return (
    <>
      <table id="customers" {...getTableProps()}>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </>
  );
});
