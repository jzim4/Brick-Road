import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout.js';
import { useAuth } from '../../contexts/AuthContext.js';
import axios from 'axios';
import { createColumnHelper, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';

export default function AdminDashboard() {
    const { user, signOut } = useAuth();
    const [bricks, setBricks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalBricks: 0,
        totalSections: 0,
        totalPurchasers: 0
    });
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    function searchChange(e) {
        const val = e.target.value;
        setGlobalFilter(val);
    }

    useEffect(() => {
        // Fetch bricks data for admin overview
        axios.get("http://localhost:8000/bricks")
            .then(response => {
                const bricksData = response.data;
                setBricks(bricksData);

                // Calculate statistics
                const uniqueSections = new Set(bricksData.map(brick => brick.Paver_Assigned_Section));
                const uniquePurchasers = new Set(bricksData.map(brick => brick.Purchaser_Name));

                setStats({
                    totalBricks: bricksData.length,
                    totalSections: uniqueSections.size,
                    totalPurchasers: uniquePurchasers.size
                });
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSignOut = () => {
        signOut();
    };

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
        columnHelper.accessor('Row_Number', {
            header: 'Row',
        }),
        columnHelper.accessor('Col_Number', {
            header: 'Column',
        }),
        columnHelper.display({
            id: 'Edit',
            header: 'Edit',
            cell: ({ row }) => {
                const brick = row.original;
                return (
                    <Link
                        className="edit-button"
                        to={`/admin/manage/${brick.Panel_Number}/${brick.Col_Number}/${brick.Row_Number}`}
                    >
                        Edit
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
        globalFilterFn: 'includesString',
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        state: {
            globalFilter,
            pagination
        }
    });


    if (loading) {
        return (
            <Layout>
                <div className="admin-container">
                    <div className="loading">Loading dashboard...</div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="admin-container">
                    <div className="error">Error loading dashboard: {error}</div>
                </div>
            </Layout>
        );
    }
    return (
        <Layout>
            <div className="admin-container">
                <div className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <div className="admin-user-info">
                        <span>Welcome, {user?.email} </span>
                        <button onClick={handleSignOut} className="sign-out-button">
                            Sign Out
                        </button>
                    </div>
                </div>

                <div className="admin-stats">
                    <div className="stat-card">
                        <h3>Total Bricks</h3>
                        <div className="stat-number">{stats.totalBricks}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Sections</h3>
                        <div className="stat-number">{stats.totalSections}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Purchasers</h3>
                        <div className="stat-number">{stats.totalPurchasers}</div>
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