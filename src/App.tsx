import { Routes, Route, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import NewHome from "./pages/NewHome";
import EstimatePage from "./pages/EstimatePage";
import LegalPage from "./pages/LegalPage";
import ContractPage from "./pages/ContractPage";
import LogisticsPage from "./pages/LogisticsPage";
import ResearchDetailPage from "./pages/ResearchDetailPage";
import MainLayout from "./components/MainLayout";
import { estimateData } from "./lib/estimateData";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminServices from "./pages/admin/AdminServices";
import AdminContent from "./pages/admin/AdminContent";
import AdminSettings from "./pages/admin/AdminSettings";

// Placeholder pages for links
function TimelinePage() {
  return (
    <div className="min-h-screen bg-white pt-[60px] p-8">
      <h1 className="text-2xl font-bold text-[#333] mb-4">Сроки исследования</h1>
      <div className="max-w-3xl space-y-3">
        {[
          { name: "Экспресс-гистология", time: "15-20 минут" },
          { name: "Гистологическое исследование биоптата", time: "3-5 рабочих дней" },
          { name: "Иммуногистохимическое исследование", time: "3-5 рабочих дней" },
          { name: "Цитологическое исследование", time: "2-3 рабочих дня" },
          { name: "Судебно-медицинская экспертиза", time: "10-15 рабочих дней" },
          { name: "Морфологическая диагностика опухоли", time: "7-10 рабочих дней" },
          { name: "FISH-анализ", time: "7-14 рабочих дней" },
          { name: "NGS панель (50 генов)", time: "14-21 рабочий день" },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#e5e5e5]">
            <span className="text-sm text-[#333]">{item.name}</span>
            <span className="text-sm font-semibold text-[#00c9a7]">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscountsPage() {
  return (
    <div className="min-h-screen bg-white pt-[60px] p-8">
      <h1 className="text-2xl font-bold text-[#333] mb-4">Скидки и акции</h1>
      <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Скидка 5%", desc: "При заказе от 5 000 ₽", color: "#00c9a7" },
          { title: "Скидка 10%", desc: "При заказе от 15 000 ₽", color: "#00a896" },
          { title: "Скидка 15%", desc: "При заказе от 30 000 ₽", color: "#008f80" },
          { title: "Скидка 20%", desc: "При заказе от 50 000 ₽", color: "#007a6c" },
        ].map((d) => (
          <div key={d.title} className="p-5 bg-white rounded-xl border border-[#e5e5e5]">
            <div className="text-2xl font-bold mb-1" style={{ color: d.color }}>{d.title}</div>
            <div className="text-sm text-[#666]">{d.desc}</div>
          </div>
        ))}
        <div className="col-span-full p-5 bg-[#00c9a7]/5 rounded-xl border border-[#00c9a7]/20">
          <h3 className="text-sm font-semibold text-[#333] mb-2">Для юридических лиц</h3>
          <p className="text-sm text-[#666]">
            Специальные условия при заключении договора на регулярное обслуживание.
            Индивидуальные цены, отсрочка платежа до 30 дней, персональный менеджер.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReagentsPage() {
  return (
    <div className="min-h-screen bg-white pt-[60px] p-8">
      <h1 className="text-2xl font-bold text-[#333] mb-4">Реагенты</h1>
      <p className="text-sm text-[#666]">Каталог реагентов в разработке. Свяжитесь с нами по телефону +7 (8672) 55-55-55 для уточнения наличия.</p>
    </div>
  );
}

function EquipmentPage() {
  return (
    <div className="min-h-screen bg-white pt-[60px] p-8">
      <h1 className="text-2xl font-bold text-[#333] mb-4">Оборудование</h1>
      <p className="text-sm text-[#666]">Каталог оборудования в разработке. Свяжитесь с нами по телефону +7 (8672) 55-55-55 для уточнения наличия.</p>
    </div>
  );
}

function ResearchListPage() {
  const navigate = useNavigate();
  const turquoisePanel = (
    <div className="space-y-5">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад на главную
      </button>

      <h2 className="text-2xl font-bold text-white">ИССЛЕДОВАНИЯ</h2>

      <p className="text-white/80 text-sm leading-relaxed">
        Выберите вид исследования для просмотра доступных маркеров и
        расчёта стоимости.
      </p>
    </div>
  );

  const rightContent = (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-[#333] mb-1">Все направления</h3>
      <p className="text-sm text-[#888] mb-4">
        {estimateData.reduce((sum, c) => sum + c.items.length, 0)} исследований в 7 категориях
      </p>

      <div className="space-y-3">
        {estimateData.map((cat) => (
          <a
            key={cat.id}
            href={cat.id === "immunohistochemistry" ? "#/research/igh" : "#/estimate"}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#e5e5e5] hover:border-[#00c9a7] transition-colors group"
          >
            <div>
              <div className="text-sm font-semibold text-[#333] group-hover:text-[#00c9a7] transition-colors">
                {cat.name}
              </div>
              <div className="text-xs text-[#888] mt-0.5">
                {cat.items.length} исследований
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#ccc] group-hover:text-[#00c9a7] group-hover:translate-x-0.5 transition-all" />
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout turquoiseContent={turquoisePanel}>
      {rightContent}
    </MainLayout>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<NewHome />} />
      <Route path="/research" element={<ResearchListPage />} />
      <Route path="/research/igh" element={<ResearchDetailPage />} />
      <Route path="/estimate" element={<EstimatePage />} />
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/contract" element={<ContractPage />} />
      <Route path="/contacts" element={<LogisticsPage />} />
      <Route path="/contacts/staff" element={<LogisticsPage />} />
      <Route path="/contacts/info" element={<LogisticsPage />} />
      <Route path="/logistics" element={<LogisticsPage />} />
      <Route path="/timeline" element={<TimelinePage />} />
      <Route path="/discounts" element={<DiscountsPage />} />
      <Route path="/reagents" element={<ReagentsPage />} />
      <Route path="/equipment" element={<EquipmentPage />} />
      <Route path="/cart" element={<EstimatePage />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route path="/admin/services" element={<AdminServices />} />
      <Route path="/admin/content" element={<AdminContent />} />
      <Route path="/admin/settings" element={<AdminSettings />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
