import './presentation-table.css';

function PresentationTable({ columns, rows }) {
  const gridStyle = { gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` };

  return (
    <div className="presentation-table">
      <div className="presentation-table-head" style={gridStyle}>
        {columns.map(column => <strong key={column}>{column}</strong>)}
      </div>
      {rows.map((row, rowIndex) => (
        <div className="presentation-table-row" style={gridStyle} key={rowIndex}>
          {columns.map((_, columnIndex) => <span key={columnIndex}>{row[columnIndex] ?? ''}</span>)}
        </div>
      ))}
    </div>
  );
}

export default PresentationTable;
