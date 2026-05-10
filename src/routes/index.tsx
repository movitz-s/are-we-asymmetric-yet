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

// Color by security tier, not by individual scheme name.
// Strong = asymmetric (verifiable with a public key).
// Medium = symmetric MAC (shared secret, but cryptographically authenticated).
// Weak = static token / shared password (no per-request signature).
function schemeStyle(_scheme: string, asymmetric: boolean): string {
  if (asymmetric) return "bg-emerald-500/15 text-emerald-700 ring-emerald-600/20";
  return "bg-red-500/15 text-red-700 ring-red-600/20";
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

        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 rounded-lg border border-border bg-card px-4 py-3 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-block h-2.5 w-2.5 shrink-0 rounded-sm bg-emerald-500/70 ring-1 ring-inset ring-emerald-600/30" />
            <span><span className="font-medium text-foreground">Asymmetric</span> — verifying webhooks requires no secret key material on the consumer.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-block h-2.5 w-2.5 shrink-0 rounded-sm bg-red-500/70 ring-1 ring-inset ring-red-600/30" />
            <span><span className="font-medium text-foreground">Shared secret</span> — verifying requires key material on the consumer (HMAC or static token); anyone with it can forge webhooks.</span>
          </div>
        </div>

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
                        schemeStyle(p.scheme, p.asymmetric)
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

        <div className="mt-8 flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-5 py-4">
          <div>
            <p className="text-sm font-medium text-foreground">Spotted a missing or wrong entry?</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              This list is open source. PRs and issues welcome.
            </p>
          </div>
          <a
            href="https://github.com/movitz-s/are-we-asymmetric-yet"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-foreground px-3.5 py-2 font-mono text-xs font-medium text-background transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.53 0-.26-.01-.95-.01-1.86-3.06.66-3.71-1.48-3.71-1.48-.5-1.27-1.22-1.61-1.22-1.61-1-.69.08-.68.08-.68 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.92.1-.71.39-1.2.7-1.48-2.44-.28-5.01-1.22-5.01-5.42 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.21-2.57 5.13-5.02 5.41.4.34.76 1.02.76 2.06 0 1.49-.01 2.69-.01 3.05 0 .29.2.64.76.53 4.36-1.45 7.51-5.57 7.51-10.43C23.01 5.24 18.27.5 12 .5z" />
            </svg>
            Contribute on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
