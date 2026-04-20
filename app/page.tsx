import { Link2, BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HeroCTA } from "@/components/hero-cta";

const features = [
  {
    icon: Link2,
    title: "Shorten any URL",
    description:
      "Paste a long URL and get a compact, shareable link in seconds. No sign-up required to try it.",
  },
  {
    icon: BarChart3,
    title: "Track every click",
    description:
      "See how many times your link has been clicked. Know what's working and what's not.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center gap-8 px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Short links, big impact
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground">
            Create clean, memorable short links in seconds. Share them anywhere
            and watch the clicks roll in.
          </p>
        </div>
        <HeroCTA />
      </section>

      {/* Features */}
      <section className="border-t px-6 py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Everything you need
            </h2>
            <p className="max-w-md text-muted-foreground">
              A focused set of tools to create, manage, and measure your short
              links.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="size-5 text-muted-foreground" />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t px-6 py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground">
            Sign up for free and start shortening links today. No credit card
            required.
          </p>
          <HeroCTA />
        </div>
      </section>
    </main>
  );
}
