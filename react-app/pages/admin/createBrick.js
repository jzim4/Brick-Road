import AdminHeader from './adminHeader.js';
import Layout from '../layout.js';
import React from 'react';

export default function CreateBrick() {
    return (
        <Layout>
            <div className="admin-container">
                <AdminHeader page="Create Brick" />
                <div className="admin-content">
                    <h1>Create Brick</h1>
                </div>
            </div>
        </Layout>
    );
}