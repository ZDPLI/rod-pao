import MainLayout from "@/components/MainLayout";
import { useState } from "react";
import {
  Building2,
  ChevronDown,
  Check,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const contractTypes = [
  {
    id: "routine",
    label: "Рутинные исследования",
    items: [
      { id: "r1", name: "Гистологические исследования: неопухолевая патология", price: "от 1 500 ₽" },
      { id: "r2", name: "Гистологические исследования: онкологический материал с ИГХ (базовая панель)", price: "от 5 000 ₽" },
      { id: "r3", name: "Цитологические исследования мазка", price: "от 900 ₽" },
      { id: "r4", name: "Тонкоигольная аспирационная биопсия (ТАБ)", price: "от 2 000 ₽" },
      { id: "r5", name: "Комплексная морфологическая диагностика опухоли", price: "от 5 000 ₽" },
    ],
  },
  {
    id: "reference",
    label: "Услуги референс-центров",
    items: [
      { id: "ref1", name: "ИГХ диагностика лимфом (расширенная панель с МГИ и экспертным мнением)", price: "от 18 000 ₽" },
      { id: "ref2", name: "ИГХ диагностика мягкотканных образований", price: "от 15 000 ₽" },
      { id: "ref3", name: "Иммуногистохимическое исследование (ИГХ)", price: "от 2 500 ₽" },
      { id: "ref4", name: "Флуоресцентная гибридизация in situ (FISH)", price: "по запросу" },
    ],
  },
  {
    id: "forensic",
    label: "Судебно-медицинские",
    items: [
      { id: "f1", name: "Судебно-медицинская экспертиза трупа", price: "по запросу" },
      { id: "f2", name: "Судебно-медицинская экспертиза живого лица", price: "по запросу" },
      { id: "f3", name: "Судебно-медицинское вскрытие", price: "по запросу" },
    ],
  },
];

export default function LegalPage() {
  const [selectedContract, setSelectedContract] = useState("routine");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showContract, setShowContract] = useState(false);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const currentContract = contractTypes.find((c) => c.id === selectedContract);

  const turquoisePanel = (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-4">
        <Building2 className="w-6 h-6 text-white" />
        <h2 className="text-lg font-bold text-white">Юридическим лицам</h2>
      </div>

      <p className="text-white/80 text-sm leading-relaxed">
        Заключение договора на услуги на регулярной основе. Специальные
        условия для медицинских учреждений, страховых компаний и
        исследовательских организаций.
      </p>

      <div>
        <label className="text-white/80 text-sm mb-2 block">Выберите вид исследования</label>
        <div className="relative">
          <button
            onClick={() => setShowContract(!showContract)}
            className="w-full h-11 px-4 pr-10 rounded-lg bg-white text-[#333] text-sm text-left flex items-center justify-between"
          >
            {currentContract?.label || "Выберите тип"}
            <ChevronDown
              className={`w-4 h-4 text-[#999] transition-transform ${showContract ? "rotate-180" : ""}`}
            />
          </button>
          {showContract && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-20">
              {contractTypes.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedContract(c.id); setShowContract(false); }}
                  className="w-full px-4 py-2.5 text-sm text-left text-[#333] hover:bg-[#00c9a7]/10 hover:text-[#00c9a7]"
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="bg-white/20 rounded-lg p-4">
          <h3 className="text-white text-sm font-medium mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Выбрано: {selectedItems.length}
          </h3>
          <Link
            to="/contract"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-[#00c9a7] text-sm font-semibold hover:bg-white/90 mt-2"
          >
            Заключить договор
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <MainLayout turquoiseContent={turquoisePanel}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-[#333] mb-1">
          {currentContract?.label}
        </h3>
        <p className="text-sm text-[#888] mb-4">
          Выберите конкретные исследования для включения в договор
        </p>

        <div className="space-y-2">
          {currentContract?.items.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                  isSelected
                    ? "bg-[#00c9a7]/5 border-[#00c9a7]"
                    : "bg-white border-[#e5e5e5] hover:border-[#00c9a7]/50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#00c9a7] border-[#00c9a7]"
                      : "border-[#ccc]"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#333]">{item.name}</div>
                  <div className="text-xs text-[#00c9a7] font-medium mt-0.5">
                    {item.price}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-[#00c9a7]/5 rounded-lg border border-[#00c9a7]/20">
          <h4 className="text-sm font-semibold text-[#333] mb-2">
            Преимущества договора для юрлиц
          </h4>
          <ul className="text-sm text-[#666] space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-[#00c9a7] mt-0.5">✓</span>
              <span>Индивидуальные цены при регулярном сотрудничестве</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00c9a7] mt-0.5">✓</span>
              <span>Отсрочка платежа до 30 дней</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00c9a7] mt-0.5">✓</span>
              <span>Персональный менеджер</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00c9a7] mt-0.5">✓</span>
              <span>Электронный документооборот</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00c9a7] mt-0.5">✓</span>
              <span>Срочная обработка заказов</span>
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
