"use client";

import {ArrowUpRight} from "lucide-react";
import {motion} from "motion/react";
import dynamic from "next/dynamic";
import {useRouter} from "next/navigation";

const HeroGlobe = dynamic(
  () => import("@/components/landing/heroSectionGlobe"),
  {
    ssr: false,
  }
);

export default function HeroSection() {
  const router = useRouter();

  return (
    <div className="relative bg-gradient-to-b from-zinc-950 to-zinc-800/70 overflow-hidden h-screen w-full mx-auto flex flex-col items-center justify-center">
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="-translate-y-20 z-50">
        <h1 className="relative z-10 mx-auto max-w-2xl text-center text-4xl font-bold text-slate-700 md:text-7xl dark:text-slate-300">
          {"Global  Latency. Visualized".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{opacity: 0, filter: "blur(4px)", y: 10}}
              animate={{opacity: 1, filter: "blur(0px)", y: 0}}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-md py-4 text-center text-sm md:text-xl text-balance font-normal text-neutral-600 dark:text-neutral-400"
        >
          Real-time cloud and network insights on a 3D globe and analytics
          panel
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              router.push("/dashboard");
            }}
            className="w-60 flex items-center justify-center gap-4 cursor-pointer transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Go to Dashboard <ArrowUpRight />
          </button>
        </motion.div>
      </div>
      <div className="absolute translate-y-1/2 pointer-events-none opacity-70">
        <HeroGlobe />
      </div>
    </div>
  );
}
