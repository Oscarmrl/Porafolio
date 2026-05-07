"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Full Stack Development",
    description:
      "End-to-end web applications built with modern frameworks. From database architecture to pixel-perfect frontends — scalable, performant, and maintainable.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=380&fit=crop&auto=format&q=80",
  },
  {
    number: "02",
    title: "AI Automation",
    description:
      "Intelligent workflows that eliminate repetitive tasks. I design and implement automation pipelines using LLMs, custom agents, and no-code/low-code tools.",
    tags: ["LangChain", "OpenAI", "n8n", "Zapier"],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&h=380&fit=crop&auto=format&q=80",
  },
  {
    number: "03",
    title: "Web Design",
    description:
      "Interfaces that balance aesthetics and usability. I create design systems, interactive prototypes and production-ready UI that converts visitors into clients.",
    tags: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=380&fit=crop&auto=format&q=80",
  },
  {
    number: "04",
    title: "AI Integration",
    description:
      "Embedding AI capabilities into existing products. APIs, chat interfaces, semantic search, vector databases — making your software smarter without rebuilding it.",
    tags: ["API Integration", "Vector DBs", "RAG", "Claude/GPT"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=380&fit=crop&auto=format&q=80",
  },
];

function ServiceItem({
  service,
  index,
  isOpen,
  onToggle,
  onHover,
}: {
  service: (typeof services)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onHover: (image: string | null) => void;
}) {
  return (
    <div className="border-t border-[#E5E5E5] last:border-b">
      <button
        onClick={onToggle}
        onMouseEnter={() => onHover(service.image)}
        onMouseLeave={() => onHover(null)}
        className="w-full flex items-center justify-between py-7 md:py-8 text-left group"
      >
        <div className="flex items-center gap-5 md:gap-8">
          <span className="text-xs font-bold text-[#737373] tracking-widest">{service.number}</span>
          <h3
            className={`font-bold tracking-tight transition-colors duration-200 ${
              isOpen ? "text-[#0A0A0A]" : "text-[#0A0A0A] group-hover:text-[#0A0A0A]"
            }`}
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)" }}
          >
            {service.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center flex-shrink-0 group-hover:border-[#0A0A0A] transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v11M1 6.5h11" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 md:pb-8 pl-12 md:pl-20 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-[#737373] leading-relaxed text-sm md:text-base max-w-md">{service.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-[#0A0A0A] border border-[#E5E5E5] rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Mobile image */}
              <div className="md:hidden relative w-full h-40 rounded-xl overflow-hidden">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      className="bg-[#FAFAFA] py-24 md:py-36"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-16">
        {/* Left column: heading */}
        <div className="md:w-80 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="text-xs font-bold tracking-widest text-[#737373] uppercase mb-4">Services</p>
            <h2 className="font-black text-[#0A0A0A] text-4xl md:text-5xl leading-tight tracking-tighter">
              What I Can Do For You
            </h2>
            <p className="mt-5 text-[#737373] text-sm leading-relaxed max-w-xs">
              As a developer and designer, I build digital products that blend engineering precision with creative vision.
            </p>
          </motion.div>

          {/* Floating preview image (desktop, follows mouse) */}
          <AnimatePresence>
            {hoverImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="hidden md:block mt-8 rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-lg"
                style={{ aspectRatio: "4/3" }}
              >
                <Image src={hoverImage} alt="Service preview" fill className="object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right column: accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          {services.map((service, i) => (
            <ServiceItem
              key={service.number}
              service={service}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              onHover={setHoverImage}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
