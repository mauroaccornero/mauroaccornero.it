import React from 'react';
import {Page} from "../components/Page";
import {Animation} from "../animation";
/**/

const Homepage = () => {
    return (
        <>
            <Page>
                <div id="main">
                    <h2>Web Developer Freelance</h2>
                    <h1>Mauro Accornero - P.I. 01455130052</h1>
                    <h3>Servizi</h3>
                    <ul>
                        <li>Consulenza</li>
                        <li>Formazione</li>
                        <li>Sviluppo e progettazione web</li>
                    </ul>
                    <h3>Tecnologie</h3>
                    <ul className={"column"}>
                        <li>Frontend: HTML, Javascript, React, Redux, Next, Webpack, Gulp, Babel, CSS, Sass, Canvas</li>
                        <li>Backend: Node, Express, Strapi, Firebase, PHP, Laravel, Symfony, Wordpress, Woocommerce</li>
                        <li>Test: Mocha, Jest, PhpUnit</li>
                        <li>OS: Windows, MacOs, Linux</li>
                    </ul>
                    <h3>Contatti</h3>
                    <ul>
                        <li><a href="mailto:info@mauroaccornero.it">Email</a></li>
                        <li><a href="https://it.linkedin.com/in/mauroaccornero/it" target="_blank">Linkedin</a></li>
                    </ul>
                </div>
{/*
                <Animation/>
*/}
            </Page>
            <style jsx>{`
                #main{
                    font-family: 'Lato',sans-serif;
                    position: absolute;
                    z-index: 2;
                    display:flex;
                    color:#000;
                    text-align: left;
                    flex-direction: column;
                    font-size:14px;
                    //background-color: rgba(255,255,255,0.5);
                    width: calc(100% - 80px);
                    padding: 40px;
                     -webkit-font-smoothing: antialiased;
                      -moz-osx-font-smoothing: grayscale;
                }
                ul{
                    display:flex;
                    align-content: space-around;
                    justify-content: left;
                    flex-wrap: wrap;
                    margin-bottom: 5px;
                    padding-left: 10px;
                }
                ul.column{
                    flex-direction:column;
                    align-content:start;
                }
                ul,li{
                    list-style:none;
                }
                li{
                  margin: 0 10px 0 0;
                  padding: 5px 0;
                  font-size:1.1em;
                  font-weight: 600;
                  white-space: nowrap;
                }
                small{
                    display:block;
                    padding: 20px;
                }
                a{
                    color: #000;
                    font-size:1em;
                    text-decoration: none;
                }
                h1{
                    font-weight: 300;
                    font-size:2em;
                    margin-bottom: 20px;
                    padding-left: 10px;
                    color:#333;
                }
                h2{
                    font-weight: 300;
                    margin-bottom: 10px;
                    font-size:4em;
                    padding-left: 10px;
                }
                h3{
                  font-weight:300;
                  font-size:2em;
                  margin-top: 10px;
                  padding: 10px 10px 5px 10px;
                  border-top:1px solid rgba(0,0,0,0.1);
                  color:#333;
                }
               
            `}
            </style>
        </>
    );
};

export default Homepage;
