import { Html, Head, Main, NextScript } from 'next/document'
function Document () {
    return (
        <Html>
            <Head>
                <link
                    href='https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;500;600;700;800;900&display=swap'
                    rel='stylesheet'
                />
                <link rel='shortcut icon' href='/public/static/favicon.ico' />
            </Head>
            <body className={"Page"}>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}

export default Document