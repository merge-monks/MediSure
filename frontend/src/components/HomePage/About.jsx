import React from "react";
import { cn } from "../lib/utils";
import { BotMessageSquare, Cable, CircleHelp, Cloud, DollarSign, Waypoints } from "lucide-react";

function Features() {
  return (
    <section id="features">
    <div className="min-h-screen w-full relative py-16">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-center">Key Features</h1>
        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
    </section>
  );
}

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "AI-Powered Report Scanning",
      description:
        "AI-driven model analyzes and extracts key insights from reports significantly reducing doctor's workload.",
      icon: <BotMessageSquare className="w-8 h-8" />,
      color: "from-blue-500/20 to-blue-500/0",
    },
    {
      title: "Powerful U-Net Model",
      description:
        "Deep learning-based U-Net for accurate medical image segmentation.",
      icon: <CircleHelp className="w-8 h-8" />,
      color: "from-purple-500/20 to-purple-500/0",
    },
    {
      title: "Intuitive Dashboard",
      description:
        "Real-time data visualization for seamless health monitoring.",
      icon: <Waypoints className="w-8 h-8" />,
      color: "from-green-500/20 to-green-500/0",
    },
    {
      title: "Reliable and Secure Platform",
      description:
        "High availability and robust security for sensitive patient data.",
      icon: <Cloud className="w-8 h-8" />,
      color: "from-cyan-500/20 to-cyan-500/0",
    },
    {
      title: "Scalable & Efficient",
      description:
        "Designed to handle increasing data and users with high performance.",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-amber-500/20 to-amber-500/0",
    },
    {
      title: "24/7 Dedicated Support",
      description:
        "Round-the-clock access to reports, analytics, and insights anytime, anywhere.",
      icon: <Cable className="w-8 h-8" />,
      color: "from-indigo-500/20 to-indigo-500/0",
    },
  ];
 
  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({ title, description, icon, color }) => {
  return (
    <div
      className={cn(
        "group relative rounded-2xl p-6 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "bg-background/50 backdrop-blur-sm",
        "border border-border/50 sm:p-8"
      )}
    >
      {/* Gradient Background Effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300 rounded-2xl bg-gradient-to-b",
          color
        )}
      />

      {/* Icon Container */}
      <div className="relative mb-4 sm:mb-6">
        <div
          className={cn(
            "inline-flex items-center justify-center p-3 rounded-xl bg-background/80",
            "ring-1 ring-border/50 shadow-sm",
            "transition-transform duration-300",
            "group-hover:scale-110"
          )}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative space-y-3">
        <h3 className="text-lg font-semibold leading-tight tracking-tight sm:text-xl">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed sm:text-base">
          {description}
        </p>
      </div>

      {/* Hover Indicator */}
      <div
        className={cn(
          "absolute left-0 top-8 h-12 w-1 opacity-0 group-hover:opacity-100",
          "transition-all duration-300 bg-gradient-to-b from-cyan-500 to-cyan-600",
          "rounded-r-full"
        )}
      />
    </div>
  );
};

export default Features;