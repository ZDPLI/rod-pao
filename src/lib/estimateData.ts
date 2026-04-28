export interface ResearchItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface ResearchCategory {
  id: string;
  name: string;
  items: ResearchItem[];
}

export const estimateData: ResearchCategory[] = [
  {
    id: "immunohistochemistry",
    name: "Иммуногистохимия",
    items: [
      { id: "er", name: "Гормональный статус - ER", price: 2500, category: "Иммуногистохимия" },
      { id: "pr", name: "Гормональный статус - PR", price: 2500, category: "Иммуногистохимия" },
      { id: "ki67", name: "Ki-67 (индекс пролиферации)", price: 1800, category: "Иммуногистохимия" },
      { id: "cd138", name: "CD138 (плазматические клетки)", price: 2200, category: "Иммуногистохимия" },
      { id: "her2", name: "HER2/neu (статус)", price: 3500, category: "Иммуногистохимия" },
      { id: "p53", name: "p53 (мутационный статус)", price: 2000, category: "Иммуногистохимия" },
      { id: "cd20", name: "CD20 (В-клеточный маркер)", price: 2200, category: "Иммуногистохимия" },
      { id: "cd3", name: "CD3 (Т-клеточный маркер)", price: 2200, category: "Иммуногистохимия" },
      { id: "ck7", name: "CK7 (цитокератин 7)", price: 2000, category: "Иммуногистохимия" },
      { id: "ck20", name: "CK20 (цитокератин 20)", price: 2000, category: "Иммуногистохимия" },
      { id: "ema", name: "EMA (эпителиальный мембранный антиген)", price: 2200, category: "Иммуногистохимия" },
      { id: "vim", name: "Виментин", price: 2000, category: "Иммуногистохимия" },
      { id: "desmin", name: "Десмин", price: 2200, category: "Иммуногистохимия" },
      { id: "s100", name: "S-100 (меланоцитарный маркер)", price: 2500, category: "Иммуногистохимия" },
      { id: "lymphoma-ext", name: "ИГХ диагностика лимфом (расширенная панель)", price: 18000, category: "Иммуногистохимия" },
      { id: "soft-tissue", name: "ИГХ диагностика мягкотканных образований", price: 15000, category: "Иммуногистохимия" },
    ],
  },
  {
    id: "histochemistry",
    name: "Гистохимия",
    items: [
      { id: "pas", name: "PAS-окраска", price: 800, category: "Гистохимия" },
      { id: "trichrome", name: "Трихромная окраска (по Массону)", price: 900, category: "Гистохимия" },
      { id: "silver", name: "Серебряная импрегнация", price: 1100, category: "Гистохимия" },
      { id: "orcein", name: "Орцеиновая окраска (эластические волокна)", price: 900, category: "Гистохимия" },
      { id: "perl", name: "Окраска по Перлу (железо)", price: 1000, category: "Гистохимия" },
      { id: "ziel", name: "Окраска по Циль-Нильсену", price: 1100, category: "Гистохимия" },
    ],
  },
  {
    id: "histology",
    name: "Гистология",
    items: [
      { id: "biopsy", name: "Гистологическое исследование биоптата", price: 1500, category: "Гистология" },
      { id: "express", name: "Экспресс-гистологическое исследование", price: 3000, category: "Гистология" },
      { id: "re-review", name: "Морфологическая верификация диагноза", price: 3500, category: "Гистология" },
      { id: "complex-tumor", name: "Комплексная морфологическая диагностика опухоли", price: 5000, category: "Гистология" },
    ],
  },
  {
    id: "biochemical",
    name: "Биохимические",
    items: [
      { id: "alk-phos", name: "Щелочная фосфатаза (ALP)", price: 600, category: "Биохимические" },
      { id: "acid-phos", name: "Кислая фосфатаза", price: 600, category: "Биохимические" },
      { id: "lipid-stain", name: "Липидная окраска (Sudan III)", price: 800, category: "Биохимические" },
    ],
  },
  {
    id: "molecular",
    name: "Молекулярно-генетическое",
    items: [
      { id: "fish", name: "Флуоресцентная гибридизация in situ (FISH)", price: 12000, category: "Молекулярно-генетическое" },
      { id: "pcr", name: "PCR-диагностика", price: 8000, category: "Молекулярно-генетическое" },
      { id: "ngs-panel", name: "NGS панель (50 генов)", price: 45000, category: "Молекулярно-генетическое" },
    ],
  },
  {
    id: "electron-microscopy",
    name: "Электронно-микроскопическое",
    items: [
      { id: "em-standard", name: "Электронно-микроскопическое исследование (стандартное)", price: 8000, category: "Электронно-микроскопическое" },
      { id: "em-immune", name: "Иммуноэлектронная микроскопия", price: 15000, category: "Электронно-микроскопическое" },
    ],
  },
  {
    id: "other",
    name: "Прочее",
    items: [
      { id: "consultation", name: "Консультация патологоанатома", price: 2000, category: "Прочее" },
      { id: "second-opinion", name: "Second opinion (второе мнение)", price: 5000, category: "Прочее" },
      { id: "expert-report", name: "Составление экспертного заключения", price: 3000, category: "Прочее" },
    ],
  },
];

// Discount rules
export interface DiscountRule {
  threshold: number;
  percent: number;
  label: string;
}

export const discountRules: DiscountRule[] = [
  { threshold: 50000, percent: 20, label: "Скидка 20% (от 50 000 ₽)" },
  { threshold: 30000, percent: 15, label: "Скидка 15% (от 30 000 ₽)" },
  { threshold: 15000, percent: 10, label: "Скидка 10% (от 15 000 ₽)" },
  { threshold: 5000, percent: 5, label: "Скидка 5% (от 5 000 ₽)" },
];

export function calculateDiscount(subtotal: number): DiscountRule | null {
  for (const rule of discountRules) {
    if (subtotal >= rule.threshold) return rule;
  }
  return null;
}
