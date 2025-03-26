import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  bottomImage?: {
    light: string
    dark: string
  }
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "#4a4a4a",
  darkLineColor = "#2a2a2a",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%" />
    </div>
  )
}

export const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Software Engineering Excellence",
      subtitle = {
        regular: "Transforming Ideas Into ",
        gradient: "Powerful Solutions",
      },
      description = "We specialize in developing cutting-edge websites, enterprise systems, and AI solutions tailored for modern businesses seeking technological excellence.",
      ctaText = "Explore Our Work",
      ctaHref = "/portfolio",
      secondaryCtaText = "Contact Us",
      secondaryCtaHref = "/contact",
      bottomImage,
      gridOptions,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative min-h-screen bg-black", className)} ref={ref} {...props}>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="absolute top-0 z-[1] h-screen w-screen bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        
        <section className="relative max-w-full mx-auto z-10">
          <RetroGrid {...gridOptions} />
          <div className="max-w-screen-xl z-20 mx-auto px-4 py-28 gap-12 md:px-8">
            <div className="space-y-5 max-w-4xl mx-auto text-center">
              <h1 className="text-sm text-white/80 group font-medium mx-auto px-5 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl w-fit">
                {title}
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </h1>
              
              <h2 className="text-4xl tracking-tighter font-bold text-white mx-auto md:text-6xl">
                {subtitle.regular}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-violet-400 to-indigo-600">
                  {subtitle.gradient}
                </span>
              </h2>
              
              <p className="max-w-2xl mx-auto text-white/80">
                {description}
              </p>
              
              <div className="flex items-center justify-center gap-x-4 space-y-3 sm:space-y-0">
                <Link
                  to={ctaHref}
                  className="flex items-center bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-full px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {ctaText}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
                {secondaryCtaText && (
                  <Link
                    to={secondaryCtaHref}
                    className="flex items-center backdrop-blur-sm bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-full px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {secondaryCtaText}
                  </Link>
                )}
              </div>
            </div>
            
            {bottomImage && (
              <div className="mt-32 mx-10 relative z-10">
                <img
                  src={bottomImage.light}
                  className="w-full shadow-lg rounded-lg border border-white/10 dark:hidden"
                  alt="Dashboard preview"
                />
                <img
                  src={bottomImage.dark}
                  className="hidden w-full shadow-lg rounded-lg border border-white/10 dark:block"
                  alt="Dashboard preview"
                />
              </div>
            )}
          </div>
        </section>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/20 flex items-start justify-center">
            <div className="w-1.5 h-3 bg-white/20 rounded-full mt-2 animate-fade-in-up"></div>
          </div>
        </div>
      </div>
    )
  },
)

HeroSection.displayName = "HeroSection" 