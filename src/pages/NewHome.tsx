import MainLayout from "@/components/MainLayout";
import { Link } from "react-router";
import { Calculator, Clock, ShoppingCart, Percent, ChevronDown } from "lucide-react";
import { useState } from "react";

const researchTypes = [
  "Иммуногистохимия",
  "Гистохимия",
  "Гистология",
  "Биохимические",
  "Молекулярно-генетическое",
  "Электронно-микроскопическое",
  "Прочее",
];

const actionButtons = [
  { path: "/estimate", label: "Рассчитать смету на исследование", icon: Calculator, primary: true },
  { path: "/timeline", label: "Сроки исследования", icon: Clock, primary: false },
  { path: "/reagents", label: "Купить реагенты", icon: ShoppingCart, primary: false },
  { path: "/equipment", label: "Купить оборудование", icon: ShoppingCart, primary: false },
  { path: "/discounts", label: "Скидки и акции", icon: Percent, primary: false },
];

export default function NewHome() {
  const [selectedType, setSelectedType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const turquoisePanel = (
    <div className="space-y-6">
      <div>
        <label className="text-white/80 text-sm mb-2 block">Вид исследования</label>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full h-11 px-4 pr-10 rounded-lg bg-white text-[#333] text-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {selectedType || "Выберите вид исследования"}
            <ChevronDown className={`w-4 h-4 text-[#999] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-20">
              {researchTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { setSelectedType(type); setDropdownOpen(false); }}
                  className="w-full px-4 py-2.5 text-sm text-left text-[#333] hover:bg-[#00c9a7]/10 hover:text-[#00c9a7] transition-colors"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2.5">
        {actionButtons.map((btn) => (
          <Link
            key={btn.path}
            to={btn.path}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              btn.primary
                ? "bg-white text-[#00c9a7] hover:bg-white/90 shadow-sm"
                : "bg-[#00c9a7] text-white border border-white/40 hover:bg-white/20"
            }`}
          >
            <btn.icon className="w-5 h-5" />
            {btn.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout turquoiseContent={turquoisePanel}>
      <div className="p-8">
        <div className="max-w-3xl mx-auto text-center mt-16">
          <h1 className="text-4xl font-bold text-[#333] mb-4">
            Патологоанатомическое отделение
          </h1>
          <p className="text-xl text-[#00c9a7] font-semibold mb-6">
            ГБУЗ &quot;Республиканский онкологический диспансер&quot;
          </p>
          <p className="text-base text-[#666] mb-8 max-w-xl mx-auto leading-relaxed">
            Полный спектр диагностических исследований: от гистологии до
            молекулярно-генетического анализа. Выберите вид исследования
            слева или воспользуйтесь калькулятором сметы.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="p-5 bg-white rounded-xl shadow-sm border border-[#e5e5e5]">
              <div className="text-3xl font-bold text-[#00c9a7] mb-1">14+</div>
              <div className="text-sm text-[#666]">видов исследований</div>
            </div>
            <div className="p-5 bg-white rounded-xl shadow-sm border border-[#e5e5e5]">
              <div className="text-3xl font-bold text-[#00c9a7] mb-1">15 мин</div>
              <div className="text-sm text-[#666]">экспресс-диагностика</div>
            </div>
            <div className="p-5 bg-white rounded-xl shadow-sm border border-[#e5e5e5]">
              <div className="text-3xl font-bold text-[#00c9a7] mb-1">20%</div>
              <div className="text-sm text-[#666]">скидки при объёмах</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
