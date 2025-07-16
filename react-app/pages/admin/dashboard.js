import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout.js';
import axios from 'axios';
import { createColumnHelper, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import AdminHeader from './adminHeader.js';
import '../../styles/admin.css';
import { SquarePen } from 'lucide-react';


export default function AdminDashboard() {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [bricks, setBricks] = useState([]);
    const [reports, setReports] = useState([]);
    const [brickLoading, setBrickLoading] = useState(true);
    const [reportLoading, setReportLoading] = useState(true);

    const [brickError, setBrickError] = useState(null);
    const [reportError, setReportError] = useState(null);
    const [brickStats, setBrickStats] = useState({
        totalBricks: 0,
        totalPurchasers: 0,
    });
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState([{ id: 'Purchaser_Name', desc: false }]);

    function searchChange(e) {
        const val = e.target.value;
        setGlobalFilter(val);
    }

    function handleSortingChange(id) {
        setSorting(prev => {
            const isSorted = prev.some(sort => sort.id === id);
            if (isSorted) {
                return [{id: id, desc: !prev.find(sort => sort.id === id).desc}]
            }
            return [{ id, desc: false }];
        });
    }

    useEffect(() => {
        // Fetch bricks data for admin overview
        axios.get(`${serverUrl}/bricks`)
            .then(response => {
                const bricksData = response.data;
                setBricks(bricksData);

                // Calculate statistics
                const uniquePurchasers = new Set(bricksData.map(brick => brick.Purchaser_Name));

                setBrickStats({
                    totalBricks: bricksData.length,
                    totalPurchasers: uniquePurchasers.size
                });
            })
            .catch(err => {
                setBrickError(err.message);
            })
            .finally(() => {
                setBrickLoading(false);
            });

        axios.get(`${serverUrl}/reports`)
            .then(response => {
                const reports = response.data;
                setReports(reports);
            })
            .catch(err => {
                setReportError(err.message);
            })
            .finally(() => {
                setReportLoading(false);
            })
    }, []);

    const columnHelper = createColumnHelper()

    const defaultColumns = [
        columnHelper.accessor('Purchaser_Name', {
            header: 'Purchaser',
        }),
        columnHelper.accessor(row => (
            `${row.Inscription_Line_1 || ''}\n${row.Inscription_Line_2 || ''}\n${row.Inscription_Line_3 || ''}`
        ), {
            id: 'Message',
            header: 'Message',
            cell: info => <pre>{info.getValue()}</pre>,
        }),
        columnHelper.accessor('Paver_Assigned_Section', {
            header: 'Section',
            cell: info => <div className="assignedSectionTag">{info.getValue()}</div>
        }),
        columnHelper.accessor('Panel_Number', {
            header: 'Panel',
        }),
        columnHelper.accessor('Col_Number', {
            header: 'Column',
        }),
        columnHelper.accessor('Row_Number', {
            header: 'Row',
        }),
        columnHelper.display({
            id: 'Edit',
            header: '',
            cell: ({ row }) => {
                const brick = row.original;
                return (
                    <Link
                        className="edit-cell"
                        to={`/admin/manage/${brick.Panel_Number}/${brick.Col_Number}/${brick.Row_Number}`}
                        title="Edit Brick"
                    >
                        <SquarePen size={25} />
                    </Link>
                );
            }
        })
    ];


    const table = useReactTable({
        data: bricks,
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        globalFilterFn: 'includesString',
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        state: {
            globalFilter,
            pagination,
            sorting
        }
    });


    if (brickLoading) {
        return (
            <Layout>
                <div className="admin-container">
                    <div className="loading">Loading dashboard...</div>
                </div>
            </Layout>
        );
    }

    if (brickError) {
        return (
            <Layout>
                <div className="admin-container">
                    <div className="error">Error loading dashboard: {brickError}</div>
                </div>
            </Layout>
        );
    }
    return (
        <Layout>
            <div className="admin-container">
                <AdminHeader page="Admin Dashboard"/>

                <div className="admin-stats">
                    <div className="stat-card">
                        <h3 className="stat-header">Total Bricks</h3>
                        <div className="stat-number">{brickStats.totalBricks}</div>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-header">Purchasers</h3>
                        <div className="stat-number">{brickStats.totalPurchasers}</div>
                    </div>
                    <div className="stat-card">
                        <Link to="/admin/requests">
                        <h3 className="stat-header">Open Requests</h3>
                        <div className="stat-number">{reports.filter(r => !r.isFixed).length}</div>
                        </Link>
                    </div>
                </div>

                <div className="admin-content">
                    <div className="admin-section">
                        <h2>Bricks</h2>
                        <input
                            type="search"
                            id="brick-search"
                            name="DashboardBrickSearch"
                            placeholder="Search bricks..."
                            onChange={searchChange}
                        />
                        <div id="searchSubtext">Start typing a purchaser name or inscription to find brick</div>
                        <div className="bricks-table-container">
                            <table className="bricks-table">
                                <thead>
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id} 
                                                    onClick={() => header.id !== 'Edit' && handleSortingChange(header.id)} 
                                                    className={header.id === 'Edit' ? 'edit-header-cell' : 'sortable-header'} 
                                                    title={header.id === 'Edit' ? '' : `Click to sort by ${header.column.columnDef.header}`}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header + (
                                                                sorting.find(sort => sort.id === header.id) ?
                                                                sorting.find(sort => sort.id === header.id).desc ? ' ▼' : ' ▲' : ''
                                                            ),
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
                                                <td key={cell.id} className={cell.column.id === 'Edit' ? 'edit-cell' : ''}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                        <div id="pagination">
                            <button
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                                className="paginationButton"
                            >
                                &lt;&lt;
                            </button>
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="paginationButton"
                            >
                                &lt;
                            </button>
                            <span>
                                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </span>
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="paginationButton"
                            >
                                &gt;
                            </button>
                            <button
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                                className="paginationButton"
                            >
                                &gt;&gt;
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
} 