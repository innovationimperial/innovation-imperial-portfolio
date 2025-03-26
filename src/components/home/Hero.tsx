import React from "react"
import { HeroSection } from "@/components/blocks/hero-section-dark"

const Hero: React.FC = () => {
  return (
    <HeroSection
      title="Software Engineering Excellence"
      subtitle={{
        regular: "Transforming Ideas Into ",
        gradient: "Powerful Solutions",
      }}
      description="We specialize in developing cutting-edge websites, enterprise systems, and AI solutions tailored for modern businesses seeking technological excellence."
      ctaText="Explore Our Work"
      ctaHref="/portfolio"
      secondaryCtaText="Contact Us"
      secondaryCtaHref="/contact"
      gridOptions={{
        angle: 65,
        opacity: 0.4,
        cellSize: 50,
        lightLineColor: "#4a4a4a",
        darkLineColor: "#2a2a2a",
      }}
    />
  )
}

export default Hero
