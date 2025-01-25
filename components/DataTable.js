import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";

// Global Filter Component
const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className="mb-3">
            <input
                type="text"
                value={filter || ""}
                onChange={(e) => setFilter(e.target.value || undefined)}
                placeholder="Search..."
                className="form-control"
            />
        </div>
    );
};

const Datatable = () => {
    const [data, setData] = useState([]);

    // Simulated API call
    useEffect(() => {
        const fetchData = async () => {
            const result = [
                { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
                { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Pending" },
                { id: 3, name: "Samuel Green", email: "samuel.green@example.com", role: "Subscriber", status: "Inactive" },
                { id: 4, name: "Alice Brown", email: "alice.brown@example.com", role: "Editor", status: "Active" },
            ];
            setData(result);
        };

        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            { Header: "Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Role", accessor: "role" },
            { Header: "Status", accessor: "status" },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        usePagination
    );

    return (
        <div className="container">
            {/* Search Box */}
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

            {/* Table */}
            <div className="table-responsive">
                <table
                    className="table table-striped table-bordered table-hover"
                    {...getTableProps()}
                >
                    <thead className="table-light">
                    {headerGroups.map((headerGroup) => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th key={column.id} {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr key={row.id} {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td key={cell.column.id} {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {"<"}
                    </button>
                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        {">"}
                    </button>
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {">>"}
                    </button>
                </div>
                <div>
                    <span className="me-3">
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </span>
                    <select
                        className="form-select form-select-sm"
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[5, 10, 20].map((size) => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Datatable;
