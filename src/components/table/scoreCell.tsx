export const scoreCell = (color: string, cell: any) => {
  return (
    <td style={{ background: color }} {...cell.getCellProps()}>
      {cell.render("Cell")}
    </td>
  );
};
