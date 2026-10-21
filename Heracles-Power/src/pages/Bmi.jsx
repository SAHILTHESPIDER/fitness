import { useMemo, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { useAuth } from "../useAuth";
import { Field, Note, Page } from "../ui";

function heightCm(feet, inches) {
  const f = Number(feet);
  const i = Number(inches);
  if (!Number.isFinite(f) || !Number.isFinite(i)) return null;
  return f * 30.48 + i * 2.54;
}

function scoreBmi(weight, feet, inches) {
  const kg = Number(weight);
  const cm = heightCm(feet, inches);
  if (!Number.isFinite(kg) || kg <= 0 || !Number.isFinite(cm) || cm <= 0) return null;
  const metres = cm / 100;
  return Math.round((kg / (metres * metres)) * 10) / 10;
}

function band(value) {
  if (value < 18.5) return "Underweight";
  if (value < 25) return "Normal";
  if (value < 30) return "Overweight";
  return "Obese";
}

export default function Bmi() {
  const { user } = useAuth();
  const [weight, setWeight] = useState(user?.weight || "");
  const [feet, setFeet] = useState(user?.heightFeet || "");
  const [inches, setInches] = useState(user?.heightInches ?? "");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const width = useMemo(() => Math.min(340, typeof window === "undefined" ? 340 : window.innerWidth - 64), []);

  function onSubmit(event) {
    event.preventDefault();
    const value = scoreBmi(weight, feet, inches);
    if (value == null) {
      setResult(null);
      setError("Enter a weight in kilograms and a height in feet and inches.");
      return;
    }
    setError("");
    setResult(value);
  }

  return (
    <Page kicker="Tool" title="BMI">
      <form onSubmit={onSubmit} className="grid max-w-xl gap-4 sm:grid-cols-3">
        <Field label="Weight (kg)" type="number" min="1" step="0.1" value={weight} onChange={(event) => setWeight(event.target.value)} required />
        <Field label="Feet" type="number" min="1" max="8" value={feet} onChange={(event) => setFeet(event.target.value)} required />
        <Field label="Inches" type="number" min="0" max="11" value={inches} onChange={(event) => setInches(event.target.value)} required />
        <button type="submit" className="btn-lime sm:col-span-3 w-fit">Calculate</button>
      </form>
      {error ? <div className="mt-4"><Note tone="danger">{error}</Note></div> : null}
      {result != null ? (
        <div className="card mt-6 max-w-xl overflow-hidden">
          <ReactSpeedometer
            value={Math.min(50, result)}
            minValue={0}
            maxValue={50}
            customSegmentStops={[0, 18.5, 25, 30, 50]}
            segmentColors={["#5ce1ff", "#d6ff4a", "#f0b429", "#ff5a6a"]}
            needleColor="#e7f2ff"
            textColor="#e7f2ff"
            currentValueText={`${result} BMI`}
            width={width}
            height={210}
            ringWidth={28}
          />
          <p className="text-center font-display text-3xl text-lime">{band(result)}</p>
          <p className="mt-2 text-center text-sm text-mist/60">Under 18.5 underweight, under 25 normal, under 30 overweight, then obese.</p>
        </div>
      ) : null}
    </Page>
  );
}
