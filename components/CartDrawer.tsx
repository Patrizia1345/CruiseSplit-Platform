"use client";

import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

export default function CartDrawer() {
  const t = useTranslations("cart");
  const { items, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleCheckout() {
    if (items.length === 0) return;
    // Bei einem Segment direkt zur Buchung
    if (items.length === 1) {
      router.push(`/booking?segment=${items[0].id}&cabin=${items[0].cabin}&persons=${items[0].persons}`);
    } else {
      // Mehrere Segmente → zur Warenkorb-Checkout Seite
      router.push(`/checkout`);
    }
    setOpen(false);
  }

  return (
    <>
      {/* Warenkorb Button für Navbar */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-1.5 p-2 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A2342" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
            style={{ backgroundColor: "#0EA5E9" }}>
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

          {/* Drawer */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-lg" style={{ color: "#0A2342" }}>{t("heading")}</h2>
                <p className="text-xs text-gray-400">{t("items", { count: totalItems })}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <span className="text-5xl">🛒</span>
                  <p className="text-gray-500 font-medium">{t("empty.title")}</p>
                  <p className="text-gray-400 text-sm">{t("empty.description")}</p>
                </div>
              )}

              {items.map((item) => (
                <div key={`${item.id}-${item.cabin}`} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                  {/* Image */}
                  <div className="relative h-28 overflow-hidden">
                    <img src={item.image} alt={`${item.from} → ${item.to}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-3">
                      <span className="text-xs font-bold text-white">{item.leg}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 text-gray-600 hover:bg-white flex items-center justify-center text-sm font-bold">
                      ×
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-3">
                    <p className="font-semibold text-sm text-gray-900">{item.from} → {item.to}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.date} · {t("days", { count: item.days })} · {item.cabin}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">{t("persons", { count: item.persons })}</span>
                      <span className="font-bold text-sm" style={{ color: "#0A2342" }}>€{item.price * item.persons}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-3">
                {/* Zusammenfassung */}
                <div className="flex flex-col gap-2 text-sm">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-500">
                      <span>{item.from} → {item.to}</span>
                      <span>€{item.price * item.persons}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100" style={{ color: "#0A2342" }}>
                    <span>{t("total")}</span>
                    <span>€{totalPrice}</span>
                  </div>
                </div>

                {/* Buttons */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#0EA5E9" }}>
                  {t("checkout")}
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 rounded-xl text-gray-400 text-xs hover:text-gray-600 transition-colors">
                  {t("clear")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
