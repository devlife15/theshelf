import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import productsData from "../data/products.json";

const getImage = (product) =>
  Array.isArray(product.images) ? product.images[0] : product.image;

const allImages = productsData.map(getImage).filter(Boolean);

function MarqueeStrip({ images, direction = "down", duration = 28 }) {
  const doubled = [...images, ...images];
  const isDown = direction === "down";

  return (
    <div className="relative h-full overflow-hidden w-full">
      <motion.div
        className="flex flex-col gap-3"
        animate={{ y: isDown ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 overflow-hidden"
            style={{ aspectRatio: "3/4", borderRadius: "12px" }}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover grayscale"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stripFade = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { duration: 1.2, delay: 0.2 + i * 0.15, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <div className="w-full min-h-screen">
      {/* Mobile: plain text only */}
      <div className="lg:hidden px-6 py-20 flex flex-col gap-8 max-w-[640px]">
        <motion.span
          className="text-[10px] uppercase tracking-[0.25em] text-[#9B9B9B] block"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          The Story
        </motion.span>
        <motion.h1
          className="text-[36px] font-bold font-quote tracking-[-0.03em] text-[#0A0A0A] leading-[1.1]"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Things worth owning.
        </motion.h1>
        <motion.p
          className="text-[15px] text-[#6B6B6B] leading-tight"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          It started with a YouTube rabbit hole. One vlog, then another, then
          suddenly it was 2am and I was watching a stranger in Tokyo arrange a
          desk I would never own in an apartment I would never live in.
          Something about it stayed with me.
        </motion.p>
        <motion.p
          className="text-[15px] text-[#6B6B6B] leading-tight"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          The clean lines, the intentional objects, the idea that a space could
          say something about the person inside it. I became quietly obsessed.
          Not with buying things, but with the feeling those spaces gave me. The
          calm. The focus. The sense that everything had been chosen on purpose.
        </motion.p>
        <motion.p
          className="text-[15px] text-[#6B6B6B] leading-tight"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          This site is that obsession made visible. A running list of objects I
          find beautiful, spaces I find inspiring, things I one day want to own.
          No algorithm picked these. No brand paid for placement. Just a person,
          a wishlist, and a very long memory of late nights spent watching other
          people live beautifully.
        </motion.p>
      </div>

      {/* Desktop: full grid with marquee */}
      <div
        className="hidden lg:grid w-full"
        style={{
          gridTemplateColumns: "1fr 2fr 2fr 1fr",
          minHeight: "100vh",
          gap: "0",
        }}
      >
        {/* Strip 1 */}
        <motion.div
          className="relative px-2 py-8"
          style={{ height: "100vh", position: "sticky", top: 0 }}
          custom={0}
          initial="hidden"
          animate="visible"
          variants={stripFade}
        >
          <MarqueeStrip images={allImages} direction="down" duration={26} />
        </motion.div>

        {/* Text col 1 */}
        <div className="px-10 py-24 flex flex-col justify-center border-l border-[#E8E8E8]">
          <motion.span
            className="text-[10px] uppercase tracking-[0.25em] text-[#9B9B9B] mb-8 block"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            The Story
          </motion.span>
          <motion.h1
            className="text-[38px] font-bold font-quote tracking-[-0.03em] text-[#0A0A0A] leading-[0.75] mb-12"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Things worth
            <br />
            owning.
          </motion.h1>
          <motion.p
            className="text-[15px] text-[#6B6B6B] leading-tight max-w-[320px]"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            It started with a YouTube rabbit hole. One vlog, then another, then
            suddenly it was 2am and I was watching a stranger in Tokyo arrange a
            desk I would never own in an apartment I would never live in.
            Something about it stayed with me.
          </motion.p>
        </div>

        {/* Text col 2 */}
        <div className="px-10 py-24 flex flex-col justify-center border-l border-[#E8E8E8]">
          <motion.p
            className="text-[15px] text-[#6B6B6B] leading-tight max-w-[320px] mb-10"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            The clean lines, the intentional objects, the idea that a space
            could say something about the person inside it. I became quietly
            obsessed. Not with buying things, but with the feeling those spaces
            gave me. The calm. The focus. The sense that everything had been
            chosen on purpose.
          </motion.p>
          <motion.p
            className="text-[15px] text-[#6B6B6B] leading-tight max-w-[320px]"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            This site is that obsession made visible. A running list of objects
            I find beautiful, spaces I find inspiring, things I one day want to
            own. No algorithm picked these. No brand paid for placement. Just a
            person, a wishlist, and a very long memory of late nights spent
            watching other people live beautifully.
          </motion.p>
        </div>

        {/* Strip 2 */}
        <motion.div
          className="relative px-2 py-8 border-l border-[#E8E8E8]"
          style={{ height: "100vh", position: "sticky", top: 0 }}
          custom={1}
          initial="hidden"
          animate="visible"
          variants={stripFade}
        >
          <MarqueeStrip images={allImages} direction="up" duration={32} />
        </motion.div>
      </div>
    </div>
  );
}
