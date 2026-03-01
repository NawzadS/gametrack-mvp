import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ padding: 16 }}>
      <h1>404 - Not Found</h1>
      <p>That page doesn’t exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}