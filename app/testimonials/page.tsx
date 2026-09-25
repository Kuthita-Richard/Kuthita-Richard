import type { Metadata } from "next";
import { profile, siteUrl } from "@/data/profile";
import TestimonialsList from "@/components/TestimonialsList";
import TestimonialForm from "@/components/TestimonialForm";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Testimonials — Richard Kuthita",
  description: `What people say about working with ${profile.name}. Leave a testimonial.`,
  keywords: ["testimonials", "reviews", "recommendations", "Richard Kuthita"],
  openGraph: {
    title: "Testimonials — Richard Kuthita",
    description: `What people say about working with ${profile.name}.`,
    url: `${siteUrl}/testimonials`,
  },
};

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <BreadcrumbSchema page="Testimonials" path="/testimonials" />
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep dark:text-dk-ink">Testimonials</h1>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate dark:text-dk-slate">
        Worked with me? I&apos;d love to hear about it — leave a testimonial below.
      </p>
      <div className="trace-line mt-6" />

      <div className="mt-10">
        <TestimonialsList />
      </div>

      <section className="mt-14 max-w-xl">
        <h2 className="font-display text-xl font-bold text-navy-deep dark:text-dk-ink">Leave a testimonial</h2>
        <div className="trace-line mt-3" />
        <div className="mt-6">
          <TestimonialForm />
        </div>
      </section>
    </div>
  );
}
