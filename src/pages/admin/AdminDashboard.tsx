import AdminLayout from "./AdminLayout";
import { trpc } from "@/providers/trpc";
import {
  FolderTree,
  List,
  FileText,
  Settings,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: categories } = trpc.category.list.useQuery();
  const { data: services } = trpc.service.list.useQuery();
  const { data: contents } = trpc.content.list.useQuery();
  const { data: settingsList } = trpc.settings.list.useQuery();

  const stats = [
    {
      label: "Категории",
      value: categories?.length ?? 0,
      icon: FolderTree,
      color: "#00bfa5",
      link: "/admin/categories",
    },
    {
      label: "Услуги",
      value: services?.length ?? 0,
      icon: List,
      color: "#0088ff",
      link: "/admin/services",
    },
    {
      label: "Контент",
      value: contents?.length ?? 0,
      icon: FileText,
      color: "#00bfa5",
      link: "/admin/content",
    },
    {
      label: "Настройки",
      value: settingsList?.length ?? 0,
      icon: Settings,
      color: "#888",
      link: "/admin/settings",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <a
              key={stat.label}
              href={stat.link}
              className="block p-4 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#00bfa5]/50 hover:shadow-sm transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                <TrendingUp className="w-4 h-4 text-[#ccc] group-hover:text-[#00bfa5] transition-colors" />
              </div>
              <div className="text-2xl font-bold text-[#212121]">{stat.value}</div>
              <div className="text-xs text-[#888] mt-1">{stat.label}</div>
            </a>
          ))}
        </div>

        <div className="rounded-lg bg-white border border-[#e5e5e5]">
          <div className="px-4 py-3 border-b border-[#e5e5e5]">
            <h2 className="text-sm font-semibold text-[#212121]">Последние услуги</h2>
          </div>
          <div className="divide-y divide-[#e5e5e5]">
            {services?.slice(0, 5).map((service) => (
              <div key={service.id} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-[#212121]">{service.name}</h3>
                  <p className="text-xs text-[#888] mt-0.5">{service.shortDescription}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    service.isActive
                      ? "bg-[#00bfa5]/10 text-[#00bfa5]"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {service.isActive ? "Активна" : "Неактивна"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white border border-[#e5e5e5] p-4">
          <h2 className="text-sm font-semibold text-[#212121] mb-3">Быстрые действия</h2>
          <div className="flex flex-wrap gap-2">
            <a href="/admin/categories" className="px-4 py-2 rounded-md bg-[#f5f5f5] border border-[#e5e5e5] text-xs text-[#212121] hover:border-[#00bfa5] transition-colors">
              + Добавить категорию
            </a>
            <a href="/admin/services" className="px-4 py-2 rounded-md bg-[#f5f5f5] border border-[#e5e5e5] text-xs text-[#212121] hover:border-[#00bfa5] transition-colors">
              + Добавить услугу
            </a>
            <a href="/admin/content" className="px-4 py-2 rounded-md bg-[#f5f5f5] border border-[#e5e5e5] text-xs text-[#212121] hover:border-[#00bfa5] transition-colors">
              + Добавить контент
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
