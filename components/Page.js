import React from 'react';
import Head from "next/head";

export const Page = props => {
    return (
        <div>
            <Head>
                <title>My page title</title>
                <meta property="og:title" content="My page title" key="title" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
            </Head>
            {props.children}
        </div>
    );
};
