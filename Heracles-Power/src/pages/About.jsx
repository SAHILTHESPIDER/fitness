import { Page } from "../ui";

function Person({ name, role, image }) {
  return (
    <article className="card text-center">
      {image ? (
        <img src={image} alt={name} className="mx-auto h-28 w-28 rounded-full object-cover" />
      ) : (
        <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-ink font-display text-3xl text-lime">
          {name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
        </div>
      )}
      <h2 className="mt-4 font-display text-2xl">{name}</h2>
      <p className="text-sm text-cyan">{role}</p>
    </article>
  );
}

export default function About() {
  return (
    <Page kicker="Studio" title="About">
      <p className="max-w-2xl text-mist/75">
        Hercules Power is a fitness notebook: a food list with calories, workout demos, a BMI gauge, and an account that remembers what you ate and lifted. The coach, when the server key is set, only suggests items from those lists.
      </p>
      <h2 className="mt-10 font-display text-3xl uppercase">Team</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Person name="Sahil Gupta" role="Full stack developer" image="/Screenshot 2025-04-09 115308.png" />
        <Person name="Abhishiek Sahani" role="Full stack developer" />
      </div>
    </Page>
  );
}
