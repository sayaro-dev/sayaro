import { LenisWrapper } from "@/components/sites/resido/LenisWrapper";
import { Header } from "@/components/ui/header-2";
import { Hero } from "@/components/sites/resido/Hero";
import { TrustMarquee } from "@/components/sites/resido/TrustMarquee";
import { AboutBlock } from "@/components/sites/resido/AboutBlock";
import { ProjectsCarousel } from "@/components/sites/resido/ProjectsCarousel";
import { Services } from "@/components/sites/resido/Services";
import { WhyChooseUs } from "@/components/sites/resido/WhyChooseUs";
import { Testimonials } from "@/components/sites/resido/Testimonials";
import { FAQ } from "@/components/sites/resido/FAQ";
import { ContactCTA } from "@/components/sites/resido/ContactCTA";
import { LetsBuildTogether } from "@/components/sites/resido/LetsBuildTogether";
import { Footer } from "@/components/sites/resido/Footer";
import { client } from "@/lib/sanity";
import { featuredProductsQuery, testimonialsQuery, faqsQuery, servicesQuery } from "@/lib/sanity-queries";

export default async function Home() {
  const [featuredProducts, testimonials, faqs, services] = await Promise.all([
    client.fetch(featuredProductsQuery),
    client.fetch(testimonialsQuery),
    client.fetch(faqsQuery),
    client.fetch(servicesQuery),
  ]);
  return (
    <LenisWrapper>
      <Header />
      <main>
        <Hero />
        <TrustMarquee />
        <AboutBlock />
        <ProjectsCarousel products={featuredProducts} />
        <Services services={services} />
        <WhyChooseUs />
        <Testimonials testimonials={testimonials} />
        <FAQ faqs={faqs} />
        <ContactCTA />
        <LetsBuildTogether />
      </main>
      <Footer />
    </LenisWrapper>
  );
}
