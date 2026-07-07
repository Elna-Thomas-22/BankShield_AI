"use client";

import { motion } from "framer-motion";

const CENTER = {
  x: 210,
  y: 210,
};

const techs = [
  "AWS",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "JavaScript",
  "Python",
  "MySQL",
  "Git",
  "GitHub",
  "Tailwind",
  "HTML5",
  "CSS3",
  "Linux",
  "Cyber Security",
  "Data Analytics",
];

const positions = [
  [210,40],
  [300,70],
  [360,140],
  [380,220],
  [340,300],
  [270,360],
  [210,385],
  [140,360],
  [70,300],
  [40,220],
  [60,140],
  [120,70],
  [170,120],
  [250,120],
  [140,270],
  [280,270],
];

const nodes = techs.map((label,index)=>({
    id:index+1,
    label,
    x:positions[index][0],
    y:positions[index][1]
}));

const meshLines=[];

for(let i=0;i<nodes.length;i++){

    for(let j=i+1;j<nodes.length;j++){

        const ringDistance=Math.min(
            j-i,
            nodes.length-(j-i)
        );

        const t=ringDistance/8;

        meshLines.push({

            a:nodes[i],

            b:nodes[j],

            opacity:0.28-(t*0.18),

            key:`${i}-${j}`

        });

    }

}

const ROTATE_DURATION=140;

export default function NeuralNetwork(){

return(

<motion.div

initial={{opacity:0,y:20}}

animate={{
opacity:1,
y:[0,-10,0]
}}

transition={{
duration:1,
y:{
repeat:Infinity,
duration:7,
ease:"easeInOut"
}
}}

className="hidden lg:flex justify-center items-center"

>
    <svg
  width="460"
  height="460"
  viewBox="0 0 420 420"
  style={{ overflow: "visible" }}
>
  <defs>
    {/* Background Glow */}
    <radialGradient id="ambient" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
    </radialGradient>

    {/* Glass Node */}
    <radialGradient id="nodeCore" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="100%" stopColor="#d1d5db" />
    </radialGradient>

    {/* Glass Center */}
    <radialGradient id="hubCore" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="50%" stopColor="#e5e7eb" />
      <stop offset="100%" stopColor="#9ca3af" />
    </radialGradient>

    {/* Node Glow */}
    <filter
      id="glow"
      x="-200%"
      y="-200%"
      width="500%"
      height="500%"
    >
      <feGaussianBlur stdDeviation="3" result="blur" />

      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Center Glow */}
    <filter
      id="coreGlow"
      x="-200%"
      y="-200%"
      width="500%"
      height="500%"
    >
      <feGaussianBlur stdDeviation="6" result="blur" />

      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

  </defs>

  {/* Ambient Light */}

  <circle
    cx={CENTER.x}
    cy={CENTER.y}
    r="200"
    fill="url(#ambient)"
  />

  {/* Rotating Neural Network */}

  <motion.g
    style={{
      transformOrigin: `${CENTER.x}px ${CENTER.y}px`,
    }}
    animate={{
      rotate: 360,
    }}
    transition={{
      duration: ROTATE_DURATION,
      repeat: Infinity,
      ease: "linear",
    }}
  >

  </motion.g>
  {/* ================= MESH CONNECTIONS ================= */}

<motion.g
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2, delay: 0.3 }}
>
  {meshLines.map(({ a, b, opacity, key }) => (
    <line
      key={key}
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke="#ffffff"
      strokeOpacity={opacity}
      strokeWidth="0.45"
    />
  ))}
</motion.g>

{/* ================= CENTER SPOKES ================= */}

{nodes.map((node, index) => (
  <motion.line
    key={`spoke-${index}`}
    x1={CENTER.x}
    y1={CENTER.y}
    x2={node.x}
    y2={node.y}
    stroke="rgba(255,255,255,0.18)"
    strokeWidth="0.7"
    initial={{
      pathLength: 0,
      opacity: 0,
    }}
    animate={{
      pathLength: 1,
      opacity: 1,
    }}
    transition={{
      duration: 1,
      delay: 0.4 + index * 0.03,
    }}
  />
))}

{/* ================= FLOWING PULSES ================= */}

{nodes.map((node, index) => (
  <motion.circle
    key={`pulse-${index}`}
    r="2.2"
    fill="#ffffff"
    filter="url(#glow)"
    initial={{
      cx: CENTER.x,
      cy: CENTER.y,
      opacity: 0,
    }}
    animate={{
      cx: [CENTER.x, node.x],
      cy: [CENTER.y, node.y],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: index * 0.18,
      ease: "easeInOut",
    }}
  />
))}

{/* ================= TECHNOLOGY NODES ================= */}

{nodes.map((node, index) => (
  <motion.g
    key={node.id}
    initial={{
      opacity: 0,
      scale: 0.3,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    transition={{
      delay: 0.4 + index * 0.05,
      duration: 0.5,
    }}
  >
    {/* Outer Pulse */}
    <motion.circle
      cx={node.x}
      cy={node.y}
      r="6"
      fill="none"
      stroke="#d1d5db"
      strokeWidth="0.8"
      animate={{
        scale: [1, 2.2, 1],
        opacity: [0.6, 0, 0.6],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        delay: index * 0.2,
      }}
      style={{
        transformOrigin: `${node.x}px ${node.y}px`,
      }}
    />

    {/* Main Node */}
    <circle
      cx={node.x}
      cy={node.y}
      r="3.8"
      fill="url(#nodeCore)"
      stroke="#ffffff"
      strokeWidth="0.8"
      filter="url(#glow)"
    />

    {/* Keep Text Upright */}
    <motion.g
      style={{
        transformOrigin: `${node.x}px ${node.y}px`,
      }}
      animate={{
        rotate: -360,
      }}
      transition={{
        duration: ROTATE_DURATION,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <text
        x={node.x}
        y={node.y + (node.y > CENTER.y ? 18 : -12)}
        textAnchor="middle"
        fill="#d1d5db"
        fontSize="10"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="0.6"
      >
        {node.label}
      </text>
    </motion.g>
  </motion.g>
))}
{/* ================= CENTER HUB ================= */}



{/* Outer Glow Ring */}
<motion.circle
  cx={CENTER.x}
  cy={CENTER.y}
  r="18"
  fill="none"
  stroke="#d1d5db"
  strokeWidth="0.8"
  initial={{ opacity: 0.4 }}
  animate={{
    scale: [1, 1.8, 1],
    opacity: [0.4, 0, 0.4],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    transformOrigin: `${CENTER.x}px ${CENTER.y}px`,
  }}
/>

{/* Glass Core */}
<motion.circle
  cx={CENTER.x}
  cy={CENTER.y}
  r="12"
  fill="url(#hubCore)"
  stroke="#ffffff"
  strokeWidth="1"
  filter="url(#coreGlow)"
  animate={{
    scale: [1, 1.08, 1],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

{/* Initials */}
<text
  x={CENTER.x}
  y={CENTER.y + 4}
  textAnchor="middle"
  fill="#ffffff"
  fontSize="12"
  fontWeight="700"
  fontFamily="'JetBrains Mono', monospace"
  letterSpacing="1.5"
>
  ET
</text>

</svg>

</motion.div>

);
}