import React from "react";
import Layout from "./layout";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return <Layout>
        <div className="">
            <div className="">
                <h2>Oops, we can't find that page!</h2>
                <Link className="button-primary" to="/">Return to home page</Link>
            </div>

        </div>

    </Layout>
}