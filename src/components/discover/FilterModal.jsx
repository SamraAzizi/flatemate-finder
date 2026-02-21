import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FILTER_OPTIONS = {
  looking_for: ["Room in shared flat", "Flatmate for my place", "Looking together"],
  sleep_schedule: ["Early bird", "Night owl", "Flexible"],
  cleanliness: ["Very tidy", "Tidy", "Relaxed", "Creative chaos"],
  smoking: ["Non-smoker", "Outside only", "Smoker"],
  pets: ["No pets", "Have pets", "Pet friendly", "No pets please"],
  guests: ["Often", "Sometimes", "Rarely"],
  communication_style: ["Very social", "Balanced", "Private", "Independent"],
  recently_active: ["Last 24 hours", "Last 3 days", "Last 7 days"],
};

export default function FilterModal({ isOpen, onClose, filters, onFilterChange, onApply, onClear }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-[#FF6B6B]" />
              <h2 className="text-xl font-bold text-[#1a1a2e]">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X size={18} className="text-gray-600" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="px-6 py-6 space-y-5">
            {/* City */}
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">City</Label>
              <Input
                value={filters.city || ""}
                onChange={e => onFilterChange("city", e.target.value)}
                placeholder="Enter city..."
                className="rounded-xl border-gray-200 h-11"
              />
            </div>

            {/* Budget Range */}
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Budget Range ($/month)</Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  value={filters.budget_min || ""}
                  onChange={e => onFilterChange("budget_min", e.target.value)}
                  placeholder="Min"
                  className="rounded-xl border-gray-200 h-11"
                />
                <Input
                  type="number"
                  value={filters.budget_max || ""}
                  onChange={e => onFilterChange("budget_max", e.target.value)}
                  placeholder="Max"
                  className="rounded-xl border-gray-200 h-11"
                />
              </div>
            </div>

            {/* Move-in Date */}
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Move-in Date (After)</Label>
              <Input
                type="date"
                value={filters.move_in_date || ""}
                onChange={e => onFilterChange("move_in_date", e.target.value)}
                className="rounded-xl border-gray-200 h-11"
              />
            </div>

            {/* Looking For */}