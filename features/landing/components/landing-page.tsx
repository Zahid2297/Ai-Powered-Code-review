"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowsClockwiseIcon,
  GithubLogoIcon,
  GitPullRequestIcon,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SIGN_IN_PATH } from "@/features/auth/utils";
import { PLAN_DETAILS } from "@/features/settings/lib/plan-details";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function LandingNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Just AI Reviewer"
            width={32}
            height={30}
            className="size-8 object-contain"
            priority
          />
          <span className="font-heading text-sm font-semibold tracking-tight sm:text-base">
            Just AI Reviewer
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#how-it-works" className="hover:text-foreground">
            How it works
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
          <a href="#contact" className="hover:text-foreground">
            Contact
          </a>
        </nav>
        <Button
          size="lg"
          className="h-10 rounded-xl px-4"
          nativeButton={false}
          render={<Link href={SIGN_IN_PATH} />}
        >
          Sign in
        </Button>
      </div>
    </header>
  );
}

function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_oklch,var(--primary)_35%,transparent),transparent),linear-gradient(180deg,color-mix(in_oklch,var(--background)_70%,var(--primary)_8%),var(--background)_55%,var(--background))]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_18%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_18%,transparent)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-background to-transparent"
      />

      <LandingNav />

      <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.08 },
            },
          }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 font-heading text-lg font-semibold tracking-tight text-primary sm:text-xl"
          >
            Just AI Reviewer
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[2.35rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
          >
            Ship cleaner pull requests with AI that knows your codebase.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Install once on GitHub. Every new PR gets a focused review grounded
            in your synced repository context.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <Button
              size="lg"
              className="h-11 w-full rounded-xl px-6 text-sm sm:w-auto"
              nativeButton={false}
              render={<Link href={SIGN_IN_PATH} />}
            >
              Start reviewing with GitHub
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          className="mt-14 hidden overflow-hidden rounded-3xl border border-border/70 bg-card/40 p-4 backdrop-blur-sm sm:mt-16 md:block"
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl border border-border/60 bg-background/80 p-5 font-mono text-xs leading-6 text-muted-foreground">
            <p className="text-primary"># review · owner/repo · PR #42</p>
            <p className="mt-2 text-foreground">
              Findings: missing null check in{" "}
              <span className="text-primary">auth/session.ts</span>
            </p>
            <p>
              Suggestion: guard the session before writing review comments.
            </p>
            <p className="mt-3 text-foreground/80">
              Context used: 18 synced files · branch main
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: "Connect the GitHub App",
      body: "Authorize Just AI Reviewer on the accounts and repositories you care about.",
      icon: GithubLogoIcon,
    },
    {
      title: "Sync the codebase",
      body: "Index the repo once so reviews understand local patterns, not just the diff.",
      icon: ArrowsClockwiseIcon,
    },
    {
      title: "Open a pull request",
      body: "Webhooks trigger an AI review that posts clear findings back on GitHub.",
      icon: GitPullRequestIcon,
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionReveal>
          <h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            How it works
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Three steps from install to reviewed PR — built around your existing
            GitHub workflow.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <SectionReveal key={step.title} delay={0.08 * index}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"
                  />
                  <div className="mb-5 flex size-10 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                    <Icon weight="duotone" className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-heading text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const points = [
    {
      title: "Context-aware reviews",
      body: "Embeddings from your synced codebase keep comments specific to your project.",
    },
    {
      title: "Async by design",
      body: "Inngest handles long-running review jobs so GitHub webhooks stay fast.",
    },
    {
      title: "Usage that stays fair",
      body: "Free plan covers light teams. Pro unlocks unlimited reviews when you scale.",
    },
  ];

  return (
    <section className="border-t border-border/60 bg-muted/25">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionReveal>
          <h2 className="max-w-3xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Why teams use it
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Reviews that feel like a senior teammate, not a generic bot.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {points.map((point, index) => (
            <SectionReveal key={point.title} delay={0.08 * index}>
              <article className="relative h-full rounded-3xl border border-border/70 bg-background/70 p-6 sm:p-7">
                <div
                  aria-hidden
                  className="absolute top-6 bottom-6 left-0 w-1 rounded-full bg-primary/70"
                />
                <h3 className="pl-4 font-heading text-xl font-semibold tracking-tight">
                  {point.title}
                </h3>
                <p className="mt-3 pl-4 text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewPreviewSection() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <SectionReveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Inside a review
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Findings land where your team already collaborates. Status, markdown
            summaries, and GitHub comments stay linked so reviewers can act
            without leaving the PR.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <div className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <p className="text-sm font-medium">fix auth edge cases</p>
                <p className="text-xs text-muted-foreground">
                  acme/web · #128 · processing → reviewed
                </p>
              </div>
              <span className="rounded-xl border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                reviewed
              </span>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p className="text-foreground">Summary</p>
              <p>
                The session helper assumes a signed-in user before writing the
                review comment. Guard the nullable path and add a regression
                test for anonymous webhook retries.
              </p>
              <p className="pt-2 text-foreground">What looks solid</p>
              <p>
                Diff chunking and Pinecone retrieval already isolate PR context
                from the broader repo namespace.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-border/60 bg-muted/25">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Pricing
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Start free. Upgrade when reviews become daily — simple plans tied to
            AI review volume.
          </p>
        </SectionReveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {(["free", "pro"] as const).map((plan, index) => {
            const details = PLAN_DETAILS[plan];
            const isPro = plan === "pro";

            return (
              <SectionReveal key={plan} delay={0.08 * index}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-3xl border p-6 sm:p-8",
                    isPro
                      ? "border-primary/40 bg-primary/5"
                      : "border-border/70 bg-card",
                  )}
                >
                  <p className="font-heading text-sm font-semibold text-primary">
                    {details.label}
                  </p>
                  <p className="mt-3 font-heading text-3xl font-semibold tracking-tight">
                    {isPro ? "₹499" : "₹0"}
                    <span className="ml-1 text-base font-normal text-muted-foreground">
                      /month
                    </span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
                    {details.features.map((feature) => (
                      <li key={feature} className="leading-relaxed">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-8 h-11 w-full rounded-xl"
                    variant={isPro ? "default" : "outline"}
                    nativeButton={false}
                    render={<Link href={SIGN_IN_PATH} />}
                  >
                    {isPro ? "Upgrade to Pro" : "Get started free"}
                  </Button>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [pending, setPending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);

    window.setTimeout(() => {
      toast.success("Thanks — we’ll get back to you soon.");
      form.reset();
      setPending(false);
    }, 500);
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <SectionReveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Contact
          </h2>
          <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
            Product questions, GitHub App setup, or Pro billing — send a note
            and we’ll follow up.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-border/70 bg-card p-5 sm:p-7"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="h-10"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="h-10"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="How can we help?"
                className="min-h-28"
              />
            </div>
            <Button
              type="submit"
              disabled={pending}
              className="h-11 w-full rounded-xl sm:w-auto"
            >
              {pending ? "Sending…" : "Send message"}
            </Button>
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Just AI Reviewer"
                width={28}
                height={26}
                className="size-7 object-contain"
              />
              <span className="font-heading text-sm font-semibold tracking-tight">
                Just AI Reviewer
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AI pull request reviews powered by your GitHub App, synced
              codebase, and Razorpay billing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-medium">Product</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <a href="#how-it-works" className="hover:text-foreground">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <Link href={SIGN_IN_PATH} className="hover:text-foreground">
                    Sign in
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Workspace</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/repos"
                    className="hover:text-foreground"
                  >
                    Repositories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/settings"
                    className="hover:text-foreground"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Support</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <a href="#contact" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/apps/just-ai-code-reviewer"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground"
                  >
                    GitHub App
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Just AI Reviewer. All rights reserved.</p>
          <p>Built for GitHub pull requests.</p>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <HeroSection />
      <HowItWorksSection />
      <WhySection />
      <ReviewPreviewSection />
      <PricingSection />
      <ContactSection />
      <LandingFooter />
    </div>
  );
}
