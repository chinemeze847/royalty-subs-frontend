import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import styles from "./styles/tailwind.css";
import toastStyle from 'react-toastify/dist/ReactToastify.css';
import { IoWarning } from "react-icons/io5";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Royaltysubs - Your #1 Mobile Data, Cable Sub, Electric Bill, Airtime (VTU) vendor",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: toastStyle },
];

function Document({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-sans">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function ErrorBox({ message }: { message: string; }) {
  return (
   <>
    <h1 className="text-color-primary font-bold text-3xl">
      <Link to="/">Royaltysubs</Link>
    </h1>

    <div className="text-center shadow shadow-color-error rounded-lg p-dimen-sm my-dimen-lg">
      <IoWarning className="mx-auto text-7xl text-color-error" />
      <div className="font-bold my-dimen-sm text-2xl">{message}</div>
    </div>
   </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <div className="container my-dimen-xl">
        <ErrorBox message={error.message} />

        {
          process.env.NODE_ENV === 'development' && (
            <pre className="bg-pink-300 overflow-auto p-dimen-lg rounded-lg my-dimen-lg">{error.stack}</pre>
          )
        }
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document>
      <div className="container my-dimen-xl">
        <ErrorBox message={`${caught.status} ${caught.statusText}`} />
      </div>
    </Document>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
