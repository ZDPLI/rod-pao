import { Link, useLocation } from "react-router";
import { Search, MapPin, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface NewHeaderProps {
  cartCount?: number;
}

export default function NewHeader({ cartCount = 0 }: NewHeaderProps) {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: "/research", label: "Исследования" },
    { path: "/legal", label: "Юр.лицам" },
    { path: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="h-[60px] bg-white border-b border-[#e5e5e5] flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left: Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
          <input
            type="text"
            placeholder="Поиск по каталогу"
            className="w-full h-9 pl-9 pr-3 rounded-full bg-[#f0f0f0] border-none text-sm text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#00c9a7]/30"
          />
        </div>
      </div>

      {/* Center: Nav */}
      <nav className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? "text-[#00c9a7]"
                : "text-[#333] hover:text-[#00c9a7]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right: Location, Cart, Profile */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="flex items-center gap-1.5 text-sm text-[#333]">
          <MapPin className="w-4 h-4 text-[#00c9a7]" />
          <span>Владикавказ</span>
        </div>

        <Link to="/cart" className="relative flex items-center gap-1 text-sm text-[#333] hover:text-[#00c9a7] transition-colors">
          <ShoppingCart className="w-5 h-5" />
          <span>корзина</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#00c9a7] text-white text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to={user ? "/admin" : "/login"}
          className="w-9 h-9 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#00c9a7]/10 transition-colors"
        >
          <User className="w-5 h-5 text-[#333]" />
        </Link>
      </div>
    </header>
  );
}
