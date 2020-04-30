import React from 'react';
import {Page} from "../components/Page";
import {Animation} from "../animation";
/**/

const Homepage = () => {
    return (
        <>
            <Page>
                <div id="main">
                    <h1>Mauro Accornero</h1>
                    <h2>Progettazione e sviluppo web</h2>
                    <small>Per informazioni, preventivi e richieste di consulenza o docenza:</small>
                    <ul>
                        <li>Email: <a href="mailto:info@mauroaccornero.it">info@mauroaccornero.it</a></li>
                        <li>Linkedin: <a href="https://it.linkedin.com/in/mauroaccornero/it" target="_blank">https://it.linkedin.com/in/mauroaccornero/it</a></li>
                    </ul>
                </div>
                <Animation/>
            </Page>
            <style jsx>{`
                #main{
                font-family: 'Lato',sans-serif;
                    position: absolute;
                    z-index: 2;
                    display:flex;
                    color:#fff;
                    text-align: center;
                    flex-direction: column;
                    font-size:14px;
                    background-color: rgba(0,0,0,0.2);
                    width: 40%;
                    min-width:320px;
                    padding: 40px 0;
                }
                ul,li{
                    list-style:none;
                }
                li{
                  margin: 0 10px;
                }
                small{
                    display:block;
                    padding: 20px;
                }
                a{
                    color: #fff;
                    font-size:1em;
                }
                h1{
                    font-weight: 100;
                    font-size:4em;
                    margin-bottom: 20px;
                }
                h2{
                    font-weight: 700;
                    font-size:2em;
                    text-transform: uppercase;
                }
               
            `}
            </style>
        </>
    );
};

export default Homepage;
