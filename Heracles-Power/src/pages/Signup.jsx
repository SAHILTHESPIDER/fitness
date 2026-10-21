import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiError } from "../api";
import { useAuth } from "../useAuth";
import { Field, Note, Page } from "../ui";

const empty = {
  name: "",
  lastname: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  dob: "",
  gender: "male",
  weight: "70",
  heightFeet: "5",
  heightInches: "7",
  goalWeight: "65",
  dietPreference: "both",
  workoutDays: "3",
  workoutSetting: "either",
};

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function set(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (step === 1) {
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      setError("");
      setStep(2);
      return;
    }
    setBusy(true);
    setError("");
    try {
      await signup({
        ...form,
        weight: Number(form.weight),
        heightFeet: Number(form.heightFeet),
        heightInches: Number(form.heightInches),
        goalWeight: Number(form.goalWeight),
        workoutDays: Number(form.workoutDays),
      });
      navigate("/profile");
    } catch (err) {
      setError(apiError(err, "The server did not respond. Check that the API is running."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page kicker="Account" title="Sign up">
      <form onSubmit={onSubmit} className="mx-auto grid max-w-xl gap-4">
        <p className="text-sm text-mist/60">Step {step} of 2</p>
        {error ? <Note tone="danger">{error}</Note> : null}
        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" value={form.name} onChange={(event) => set("name", event.target.value)} required minLength={3} />
            <Field label="Last name" value={form.lastname} onChange={(event) => set("lastname", event.target.value)} required minLength={3} />
            <Field label="Phone" inputMode="numeric" value={form.phone} onChange={(event) => set("phone", event.target.value)} required pattern="[0-9]{10}" />
            <Field label="Email" type="email" value={form.email} onChange={(event) => set("email", event.target.value)} required />
            <Field label="Password" type="password" value={form.password} onChange={(event) => set("password", event.target.value)} required minLength={6} />
            <Field label="Confirm password" type="password" value={form.confirmPassword} onChange={(event) => set("confirmPassword", event.target.value)} required minLength={6} />
            <Field label="Date of birth" type="date" value={form.dob} onChange={(event) => set("dob", event.target.value)} required />
            <Field label="Gender">
              <select className="field" value={form.gender} onChange={(event) => set("gender", event.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Field>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Weight (kg)" type="number" min="30" max="300" value={form.weight} onChange={(event) => set("weight", event.target.value)} required />
            <Field label="Goal weight (kg)" type="number" min="30" max="300" value={form.goalWeight} onChange={(event) => set("goalWeight", event.target.value)} required />
            <Field label="Height, feet" type="number" min="1" max="8" value={form.heightFeet} onChange={(event) => set("heightFeet", event.target.value)} required />
            <Field label="Height, inches" type="number" min="0" max="11" value={form.heightInches} onChange={(event) => set("heightInches", event.target.value)} required />
            <p className="sm:col-span-2 text-sm text-cyan">{form.heightFeet || 0} ft {form.heightInches || 0} in</p>
            <Field label="Food preference">
              <select className="field" value={form.dietPreference} onChange={(event) => set("dietPreference", event.target.value)}>
                <option value="both">Both</option>
                <option value="veg">Vegetarian</option>
                <option value="nonveg">Non-vegetarian</option>
              </select>
            </Field>
            <Field label="Training days" type="number" min="1" max="7" value={form.workoutDays} onChange={(event) => set("workoutDays", event.target.value)} required />
            <Field label="Where you train">
              <select className="field" value={form.workoutSetting} onChange={(event) => set("workoutSetting", event.target.value)}>
                <option value="either">Either</option>
                <option value="gym">Gym</option>
                <option value="home">Home</option>
              </select>
            </Field>
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {step === 2 ? <button type="button" className="btn-ghost" onClick={() => setStep(1)}>Back</button> : null}
          <button type="submit" className="btn-lime" disabled={busy}>{step === 1 ? "Continue" : (busy ? "Creating…" : "Create account")}</button>
        </div>
        <Link to="/login" className="text-sm text-mist/70">Already have an account? Log in</Link>
      </form>
    </Page>
  );
}
