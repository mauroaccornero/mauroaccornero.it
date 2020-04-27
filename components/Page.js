import React from 'react';
import Head from "next/head";

export const Page = props => {
    return (
        <div>
            <Head>
                <title>My page title</title>
                <meta property="og:title" content="My page title" key="title" />
                <link href="/static/css/styles.css" rel="stylesheet" />
            </Head>
            {props.children}
        </div>
    );
};
