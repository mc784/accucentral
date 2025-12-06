'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProviderBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/provider/dashboard') {
      return pathname === '/provider/dashboard' || pathname.startsWith('/provider/session/');
    }
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: '/provider/dashboard', label: 'Bookings', icon: '📋' },
    { href: '/provider/earnings', label: 'Earnings', icon: '💰' },
    { href: '/provider/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 px-4 py-3 z-50">
      <div className="flex justify-around items-center max-w-2xl mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              isActive(item.href)
                ? 'text-warm-coral'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-semibold">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
