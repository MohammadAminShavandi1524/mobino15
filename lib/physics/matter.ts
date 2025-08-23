// export async function initMatter(canvas: HTMLCanvasElement) {
//   const Matter = await import("matter-js");
//   const { Engine, Render, Runner, Bodies, Composite } = Matter;

//   const engine = Engine.create();
//   const render = Render.create({
//     element: canvas.parentElement || document.body,
//     engine,
//     canvas,
//     options: {
//       width: 500,
//       height: 600,
//       wireframes: false,
//       background: "#fafafa",
//     },
//   });

//   // سبد خرید (سه قسمت: کف، دیواره چپ، دیواره راست)
//   const basketBottom = Bodies.rectangle(250, 550, 200, 20, { isStatic: true });
//   const basketLeft = Bodies.rectangle(150, 500, 20, 120, { isStatic: true });
//   const basketRight = Bodies.rectangle(350, 500, 20, 120, { isStatic: true });

//   // زمین
//   const ground = Bodies.rectangle(250, 600, 500, 0, { isStatic: true });

//   Composite.add(engine.world, [basketBottom, basketLeft, basketRight, ground]);

//   // مثال: اضافه کردن یک آیتم (مثلاً گوشی)
//   const item1 = Bodies.circle(250, 50, 20, {
//     render: {
//       fillStyle: "#ff5722",
//     },
//   });

//   const mobileIcon = Bodies.circle(180, 50, 24.1, {
//     render: {
//       sprite: {
//         texture: "/canvas/mobile.png",
//         xScale: 1,
//         yScale: 1,
//       },
//     },
//   });

//   Composite.add(engine.world, [mobileIcon]);

//   const runner = Runner.create();
//   Runner.run(runner, engine);
//   Render.run(render);

//   const cleanup = () => {
//     Render.stop(render);
//     Runner.stop(runner);
//     Engine.clear(engine);
//     render.canvas.remove();
//   };

//   return { engine, render, runner, cleanup };
// }
