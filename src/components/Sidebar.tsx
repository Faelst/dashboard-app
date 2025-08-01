'use client';

import { useEffect, useState } from 'react';
import { Home, Settings, Building, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
  { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
  { label: 'Usuários', href: '/users', icon: <User size={20} /> },
  { label: 'E. Comercial', href: '/comercial-entities', icon: <Building size={20} /> },
  { label: 'Configurações', href: '/configuracoes', icon: <Settings size={20} /> },
];

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSmallLogo, setShowSmallLogo] = useState(true);

  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => setShowSmallLogo(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowSmallLogo(false);
    }
  }, [isHovered]);

  return (
    <div className={`flex`}>
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`h-screen bg-primary text-white flex flex-col transition-all duration-300 z-100 ${
          isHovered ? 'w-64' : 'w-14'
        }`}
      >
        <div className="flex justify-center items-center mb-10 h-20 transition-all duration-300">
          <Link href="/" className="flex items-center space-x-2">
            {isHovered ? (
              <Image
                src="/images/logo-white.png"
                alt="Logo"
                width={160}
                height={40}
                className="transition-all duration-300"
              />
            ) : (
              showSmallLogo && (
                <Image
                  src="/images/logo-icon-white.png"
                  alt="Logo pequeno"
                  width={30}
                  height={30}
                  className="transition-all duration-300"
                />
              )
            )}
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 hover:bg-primary-hover px-3 py-2 rounded transition ${isHovered ? 'justify-start' : 'justify-center'}`}
            >
              {item.icon}
              {isHovered && (
                <span className="text-sm font-medium transition-opacity duration-200">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 bg-[#F5F5F5] transition-all duration-300">{children}</div>
    </div>
  );
}
