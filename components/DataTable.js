import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div id="DataTables_Table_0_filter" className="dataTables_filter">
            <label>
                <input
                    type="search"
                    className="form-control"
                    placeholder="Search User"
                    aria-controls="DataTables_Table_0"
                    value={filter || ""}
                    onChange={(e) => setFilter(e.target.value || undefined)}
                />
            </label>
        </div>
    );
};

const Datatable = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const result = [
            { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
            { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Pending" },
            { id: 3, name: "Samuel Green", email: "samuel.green@example.com", role: "Subscriber", status: "Inactive" },
            { id: 4, name: "Alice Brown", email: "alice.brown@example.com", role: "Editor", status: "Active" },
            { id: 5, name: "Alice Brown", email: "alice.brown@example.com", role: "Editor", status: "Active" },
            { id: 6, name: "Alice Brown", email: "alice.brown@example.com", role: "Editor", status: "Active" },
        ];
        setData(result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            { Header: "User", accessor: "name" },
            { Header: "Role", accessor: "role" },
            { Header: "Plan", accessor: "email" },
            { Header: "Billing", accessor: "billing" },
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
        <div className="card-datatable table-responsive">
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                <div className="row">
                    <div className="col-md-2">
                        <div className="ms-n2">
                            <div className="dataTables_length" id="DataTables_Table_0_length">
                                <label>
                                    <select
                                        name="DataTables_Table_0_length"
                                        aria-controls="DataTables_Table_0"
                                        className="form-select"
                                        value={pageSize}
                                        onChange={(e) => setPageSize(Number(e.target.value))}
                                    >
                                        {[5, 10, 20, 50, 100].map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="dt-action-buttons d-flex align-items-center justify-content-end">
                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                        </div>
                    </div>
                </div>
                <table
                    id="DataTables_Table_0"
                    className="datatables-users table dataTable no-footer dtr-column"
                    {...getTableProps()}
                >
                    <thead className="border-top">
                    {headerGroups.map((headerGroup) => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    key={column.id}
                                    {...column.getHeaderProps()}
                                    aria-label={column.render("Header")}
                                >
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
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="dataTables_info" id="DataTables_Table_0_info">
                            Showing {pageIndex * pageSize + 1} to{" "}
                            {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length} entries
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="DataTables_Table_0_paginate"
                        >
                            <ul className="pagination">
                                <li
                                    className={`paginate_button page-item previous ${
                                        !canPreviousPage ? "disabled" : ""
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => previousPage()}
                                        disabled={!canPreviousPage}
                                    >
                                        <i className="ti ti-chevron-left ti-sm"></i>
                                    </button>
                                </li>
                                <li
                                    className={`paginate_button page-item next ${
                                        !canNextPage ? "disabled" : ""
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => nextPage()}
                                        disabled={!canNextPage}
                                    >
                                        <i className="ti ti-chevron-right ti-sm"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Datatable;
