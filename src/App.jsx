import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

const getTier = (points) => {
  if (points >= 15000) return "Gold";
  if (points >= 9000) return "Silver";
  return "Bronze";
};

export default function App() {
 return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Page Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 py-10 space-y-12">
        <ProgressSection />
        <ProductCard />
        <ConfirmButton />
      </div>

    </div>
  );
}

function ProgressSection() {
  const points = 7500;
  const tier = getTier(points);

  return (
    <div className="flex flex-col items-center space-y-4">
      <CircularProgress value={(points / 15000) * 100} size={160} />

      <div className="text-center">
        <p className="text-xs tracking-widest text-gray-500 uppercase">Tier</p>
        <p className="text-xl font-semibold text-gray-900">{tier}</p>
        <p className="text-sm text-gray-600">{points} points</p>
      </div>
    </div>
  );
}

function CircularProgress({ value, size }) {
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <motion.svg width={size} height={size}>
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        stroke="#D1C7B8"
        strokeWidth="10"
        fill="transparent"
      />

      <motion.circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        stroke="#B89B5E"
        strokeWidth="10"
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function ProductCard() {
  const products = [
    { id: 1, title: "Tailored Suit Set", price: "$420" },
    { id: 2, title: "Classic Beige Blazer", price: "$260" },
    { id: 3, title: "Minimal Wide Pants", price: "$190" },
  ];

  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-8, 8]);

  const onDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 120) {
      setIndex((prev) => (prev + 1) % products.length);
      x.set(0);
    }
  };

  return (
    <div className="relative w-full max-w-xs h-72">
      <AnimatePresence>
        <motion.div
          key={products[index].id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x, rotate }}
          onDragEnd={onDragEnd}
          className="absolute inset-0 rounded-3xl bg-[#F5F1EB] shadow-xl p-6 flex flex-col justify-end"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -30 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          <p className="text-sm text-gray-500">Swipe to view</p>
          <h3 className="text-xl font-semibold text-gray-900 mt-1">
            {products[index].title}
          </h3>
          <p className="text-lg text-[#B89B5E] font-medium">
            {products[index].price}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
function ConfirmButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PurchaseOverlay open={open} onClose={() => setOpen(false)} />

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 px-8 py-4 bg-[#B89B5E] text-white rounded-full shadow-lg"
      >
        <span>Confirm Order</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </>
  );
}

function PurchaseOverlay({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#E9E4DB] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex flex-col items-center text-center space-y-4"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-full bg-[#B89B5E] flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Purchase Confirmed
            </h2>

            <p className="text-sm text-gray-600">
              Order #12345 has been successfully placed
            </p>

            <button
              onClick={onClose}
              className="mt-6 px-6 py-3 rounded-full border border-gray-400 text-sm"
            >
              Continue Shopping
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
function AnimatedBackground() {
  return (
    <div className="absolute inset-0">
      {/* Background Image with subtle motion */}
      <motion.img
        src="/bg.jpg" 
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: [1, 1.05, 1], x: [0, -15, 0] }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Soft dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Animated light sweep */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}
