"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    { label: "Institutions Empowered", value: 500, suffix: "+" },
    { label: "Students Managed", value: 10000, suffix: "+" },
    { label: "Countries Served", value: 25, suffix: "+" },
    { label: "Uptime Reliability", value: 99.9, suffix: "%" },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-green-50 dark:bg-background/80 relative"
    >
      <div className="absolute inset-0 bg-green-100/30 dark:bg-primary/5 z-0">
        <Image
          src="/patterns/wave.svg"
          alt="Wave pattern"
          fill
          className="object-cover opacity-20 dark:opacity-10"
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl border border-green-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const increment = target / (duration / 16); // 60fps

    let start = 0;
    const animate = () => {
      start += increment;
      if (start < target) {
        setCount(Math.ceil(start));
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animate();
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
