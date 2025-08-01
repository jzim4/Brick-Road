import React, { useEffect, useState } from "react"
import AdminHeader from "./adminHeader"
import Layout from "../layout"
import { createColumnHelper, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import axios from "axios";
import {serverLink} from '../app.js'

export default function Reports() {

    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [columnFilters, setColumnFilters] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    useEffect(() => {

        axios.get(serverLink + "/reports")
            .then(response => {
                const reports = response.data;
                setReports(reports);
                console.log(reports);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    const columnHelper = createColumnHelper()

    const defaultColumns = [
        columnHelper.accessor('purchaserName', {
            header: "Purchaser Name",
        }),
        columnHelper.accessor('reporterEmail', {
            header: "Email",
        }),
        columnHelper.accessor('panel', {
            header: "Panel",
        }),
        columnHelper.accessor('errorExplanation', {
            header: "Message",
        }),
        columnHelper.accessor('comment', {
            header: "Comment",
        }),
        columnHelper.accessor('isFixed', {
            header: "Addressed",
            cell: props => (
                <input
                    type="checkbox"
                    className="isFixedCheckbox"
                    checked={props.getValue()}
                    readOnly
                />
            )
        })
    ]


    const table = useReactTable({
        data: reports,
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
    });

    return <Layout>

        <div className="admin-container">
            <AdminHeader />
            {loading && (
                <div>Loading...</div>
            )}
            {error && (
                <div> Error: {error.message}</div>
            )}
            {reports && (
                <div className="report-table-container">
                    <table className="report-table">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}

        </div>
    </Layout>
}