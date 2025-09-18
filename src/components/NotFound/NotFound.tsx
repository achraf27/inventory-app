import { Link } from "react-router-dom";


export default function NotFound() {
    return (
      <>
        <h1>Not Found Page</h1>
        <Link to={"/"}>
        <button>Go back home</button>
        </Link>
      </>
    );
  }