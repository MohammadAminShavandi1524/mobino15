"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine, Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // این فقط یکبار اجرا میشه
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  //   const particlesLoaded = (container?: Container) => {
  //     console.log(container);
  //   };

  const particlesLoaded = async (container?: Container) => {
    // console.log("Particles loaded!", container);
    // اگر کاری async ندارید، همین هم کافیه
  };

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          className="max-lg:hidden"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: {
                  enable: true,
                },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              // color: {
              //   value: "#ffffff",
              // },
              color: {
                value: "rgba(255, 255, 255, 0.3)", // سفید با شفافیت 30%
              },
              links: {
                // color: "#ffffff",
                 value: "rgba(255, 255, 255, 0.6)", // سفید با شفافیت 30%
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,

                  height: 800,
                  width: 600,
                },
                value: 50,
              },
              opacity: { value: { min: 0.3, max: 0.7 } },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 2, max: 5 }, // حداقل و حداکثر اندازه ذرات
                animation: {
                  enable: true,
                  speed: 3,
                  sync: false, // هر ذره جداگانه تغییر کند
                },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
};

export default ParticlesBackground;
