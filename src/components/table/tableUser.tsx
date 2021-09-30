import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { connect } from "react-redux";
import { COLUMNSUSER } from "./columnsUser";
import "./table.css";
import { IPersonalDetails } from "../CommonTypes";

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

export default connect(mapStateToProps)(function TableUser(props: any) {
  const { tokenObject } = props;

  const [listOfProjects, setlistOfProjects] = useState<IPersonalDetails[]>([
    {
      nameValue: tokenObject.personalDetails.nameValue,
      teamValue: tokenObject.personalDetails.teamValue,
      joinedAtValue: tokenObject.personalDetails.joinedAtValue,
      avatarValue: tokenObject.personalDetails.avatarValue,
    },
  ]);

  const columns = useMemo(() => COLUMNSUSER, []);

  const data = useMemo(() => listOfProjects, [listOfProjects]);

  useEffect(() => {
    const data = localStorage.getItem("my-list");
    if (data) {
      setlistOfProjects(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("my-list", JSON.stringify(listOfProjects));
  });

  const tableInstance = useTable<any>({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const renderTableHeader = () => {
    return (
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
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
