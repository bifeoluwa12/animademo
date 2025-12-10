import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { CheckCircle, ArrowRight, Star } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-950 text-white flex flex-col items-center justify-center p-6 space-y-12">
      {/* PROGRESS INDICATOR */}
      <ProgressSection />

      {/* SWIPE CARD */}
      <SwipeCard />

      {/* INTERACTIVE BUTTON */}
      <FloatingButton />
    </div>
  );
}

function ProgressSection() {
  const [progress, setProgress] = useState(40);

  return (
    <div className="flex flex-col items-center space-y-4">
      <CircularProgress value={progress} size={150} />

      <div className="flex space-x-3">
        <button
          onClick={() => setProgress((p) => Math.max(0, p - 10))}
          className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
        >
          -10
        </button>

        <button
          onClick={() => setProgress((p) => Math.min(100, p + 10))}
          className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 transition"
        >
          +10
        </button>
      </div>
    </div>
  );
}

function CircularProgress({ value, size }) {
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (value / 100) * circumference;

  return (
    <motion.svg
      width={size}
      height={size}
      className="drop-shadow-[0_0_25px_rgba(150,100,255,0.35)]"
    >
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        stroke="#333"
        strokeWidth="10"
        fill="transparent"
      />

      <motion.circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        stroke="#9F7AEA"
        strokeWidth="10"
        fill="transparent"
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: progressOffset }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{
          strokeDasharray: circumference,
        }}
      />
    </motion.svg>
  );
}

function SwipeCard() {
  const cards = [
    { id: 1, text: "Swipe Right to Approve", color: "bg-purple-700" },
    { id: 2, text: "Swipe Left to Decline", color: "bg-blue-700" },
    { id: 3, text: "Try One More!", color: "bg-green-700" },
  ];

  const [index, setIndex] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 130) {
      setIndex((prev) => (prev + 1) % cards.length);
      x.set(0);
    }
  };

  return (
    <div className="h-60 w-full max-w-xs relative">
      <AnimatePresence>
        <motion.div
          key={cards[index].id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x, rotate }}
          onDragEnd={handleDragEnd}
          className={`absolute top-0 w-full h-full rounded-2xl ${cards[index].color} flex items-center justify-center text-center px-6 shadow-2xl`}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -30 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <p className="text-lg font-semibold">{cards[index].text}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


function FloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 p-3 rounded-full bg-gray-800 shadow-lg"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <Star className="w-6 h-6 text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>

     
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.85 }}
        className="px-7 py-3 bg-purple-600 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-500 transition flex items-center space-x-2"
      >
        <span>Toggle</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
