import { createFileRoute } from "@tanstack/react-router";
import providers from "@/data/providers.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Are We Asymmetric Yet — Asymmetric webhook signatures across SaaS" },
      {
        name: "description",
        content:
          "Which SaaS providers sign webhooks asymmetrically (verifiable with a public key) vs. with a shared HMAC secret.",
      },
    ],
  }),
});

type Provider = {
  name: string;
  domain: string;
  category: string;
  asymmetric: boolean;
  scheme: string;
  docs: string;
};

// Color buckets by signing scheme family.
function schemeStyle(scheme: string): string {
  const s = scheme.toLowerCase();
  if (s.includes("ed25519")) return "bg-emerald-500/15 text-emerald-700 ring-emerald-600/20";
  if (s.includes("es256") || s.includes("ecdsa")) return "bg-teal-500/15 text-teal-700 ring-teal-600/20";
  if (s.includes("rs256") || s.startsWith("rsa") || s.includes(" rsa") || s.includes("jwt"))
    return "bg-sky-500/15 text-sky-700 ring-sky-600/20";
  if (s.includes("hmac-sha256")) return "bg-amber-500/15 text-amber-800 ring-amber-600/20";
  if (s.includes("hmac-sha1")) return "bg-orange-500/15 text-orange-800 ring-orange-600/20";
  if (s.includes("bearer") || s.includes("token") || s.includes("static"))
    return "bg-rose-500/15 text-rose-700 ring-rose-600/20";
  return "bg-muted text-muted-foreground ring-border";
}

function Index() {
  const list = providers as Provider[];
  const sorted = [...list].sort((a, b) => {
    if (a.asymmetric !== b.asymmetric) return a.asymmetric ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  const yes = list.filter((p) => p.asymmetric).length;
  const total = list.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <header className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Are we asymmetric yet?
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              SaaS webhook signing schemes, ranked by verifiability without a shared secret.
            </p>
          </div>
          <div className="shrink-0 text-right font-mono text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">{yes}</span> / {total} asymmetric
          </div>
        </header>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-2.5 font-medium">Provider</th>
                <th className="px-4 py-2.5 font-medium">Scheme</th>
                <th className="px-4 py-2.5 text-right font-medium">Proof</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((p) => (
                <tr key={p.name} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 font-medium text-foreground">
                      <img
                        src={`https://www.google.com/s2/favicons?sz=64&domain=${p.domain}`}
                        alt=""
                        loading="lazy"
                        width={20}
                        height={20}
                        className="h-5 w-5 rounded-sm bg-muted object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                        }}
                      />
                      {p.name}
                    </div>
                  </td>
                  
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs ring-1 ring-inset " +
                        schemeStyle(p.scheme)
                      }
                    >
                      {p.scheme}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={p.docs}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      docs ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Edit{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono">src/data/providers.json</code>{" "}
          to add or correct entries.
        </p>
      </div>
    </div>
  );
}
