import { useState } from "react";
import { Link } from "react-router-dom";
import api, { apiError } from "../api";
import { Field, Note, Page } from "../ui";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [tone, setTone] = useState("cyan");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setTone("cyan");
      setNote(res.data.message);
    } catch (error) {
      setTone("danger");
      setNote(apiError(error, "The server did not respond."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page kicker="Account" title="Forgot password">
      <form onSubmit={onSubmit} className="mx-auto grid max-w-md gap-4">
        <p className="text-sm text-mist/70">If email is set up on the server, we send a reset link. The reply does not say whether the address is registered.</p>
        {note ? <Note tone={tone}>{note}</Note> : null}
        <Field label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <button type="submit" className="btn-lime" disabled={busy}>{busy ? "Sending…" : "Send reset link"}</button>
        <Link to="/login" className="text-sm text-cyan">Back to log in</Link>
      </form>
    </Page>
  );
}
