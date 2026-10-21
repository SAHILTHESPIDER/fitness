import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api, { apiError } from "../api";
import { Field, Note, Page } from "../ui";

export default function Reset() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [note, setNote] = useState(token ? "" : "This reset link is incomplete.");
  const [tone, setTone] = useState(token ? "cyan" : "danger");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      const res = await api.post("/auth/reset-password", { token, password, confirmPassword });
      setTone("cyan");
      setNote(res.data.message);
    } catch (error) {
      setTone("danger");
      setNote(apiError(error, "The password could not be changed."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page kicker="Account" title="New password">
      <form onSubmit={onSubmit} className="mx-auto grid max-w-md gap-4">
        {note ? <Note tone={tone}>{note}</Note> : null}
        <Field label="New password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} />
        <Field label="Confirm password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required minLength={6} />
        <button type="submit" className="btn-lime" disabled={busy || !token}>{busy ? "Saving…" : "Update password"}</button>
        <Link to="/login" className="text-sm text-cyan">Log in</Link>
      </form>
    </Page>
  );
}
