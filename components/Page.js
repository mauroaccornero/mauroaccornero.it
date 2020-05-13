import React from 'react';
import Head from "next/head";

export const Page = props => {
    return (
        <div id="page">
            <Head>
{/*
                TODO: check title, description, meta, og and favicon
*/}
                <title>My page title</title>
                <meta property="og:title" content="My page title" key="title"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;700&display=swap" rel="stylesheet" />
            </Head>
            {props.children}
            <style jsx>{`
                #page{
                  display: flex;
                  align-items: start;
                  justify-content: center;
                  flex-direction: column;
                    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
                       -moz-animation: fadein 2s; /* Firefox < 16 */
                        -ms-animation: fadein 2s; /* Internet Explorer */
                         -o-animation: fadein 2s; /* Opera < 12.1 */
                            animation: fadein 2s;
                }
                
                @keyframes fadein {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                
                /* Firefox < 16 */
                @-moz-keyframes fadein {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                
                /* Safari, Chrome and Opera > 12.1 */
                @-webkit-keyframes fadein {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                
                /* Internet Explorer */
                @-ms-keyframes fadein {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                
                /* Opera < 12.1 */
                @-o-keyframes fadein {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
            `}
            </style>
        </div>
    );
};
