import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiError } from "../api";
import { useAuth } from "../useAuth";
import { Field, Note, Page } from "../ui";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(email, password);
      navigate(location.state?.from || "/profile");
    } catch (err) {
      setError(apiError(err, "The server did not respond. Check that the API is running."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page kicker="Account" title="Log in">
      <form onSubmit={onSubmit} className="mx-auto grid max-w-md gap-4">
        {user ? <Note>You are already logged in.</Note> : null}
        {error ? <Note tone="danger">{error}</Note> : null}
        <Field label="Email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <Field label="Password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} />
        <button type="submit" className="btn-lime" disabled={busy}>{busy ? "Checking…" : "Log in"}</button>
        <div className="flex flex-wrap justify-between gap-3 text-sm">
          <Link to="/forgot-password" className="text-cyan">Forgot password?</Link>
          <Link to="/signup" className="text-mist/70">Create an account</Link>
        </div>
      </form>
    </Page>
  );
}
