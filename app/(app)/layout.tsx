'use client';
import { useState, Suspense, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import { LogOutIcon, MenuIcon, LayoutDashboardIcon, Share2Icon, UploadIcon, Cloud, Search, Filter, Plus } from 'lucide-react';

const sidebarItems = [
  { href: '/home', icon: LayoutDashboardIcon, label: 'Home Page' },
  { href: '/social-share', icon: Share2Icon, label: 'Social Share' },
  { href: '/video-upload', icon: UploadIcon, label: 'Video Upload' },
];

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='drawer lg:drawer-open'>
          <input
            id='sidebar-drawer'
            type='checkbox'
            className='drawer-toggle'
            checked={sidebarOpen}
            onChange={() => setSidebarOpen(!sidebarOpen)}
          />

          <div className='drawer-content flex flex-col'>
            <header className='bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50'>
              <div className='navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex-none lg:hidden'>
                  <label htmlFor='sidebar-drawer' className='btn btn-square btn-ghost drawer-button text-white'>
                    <MenuIcon />
                  </label>
                </div>

                <div className='flex-1'>
                  <Link href='/' onClick={handleLogoClick}>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <div className='p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl'>
                        <Cloud className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <h1 className='text-xl font-bold text-white'>MediaCraft</h1>
                        <p className='text-xs text-gray-400'>Media Management Platform</p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className='flex-none flex items-center gap-4'>
                  <div className='hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2'>
                    <Search className='w-4 h-4 text-gray-400' />
                    <input
                      type='text'
                      placeholder='Search media...'
                      className='bg-transparent text-white placeholder-gray-400 outline-none text-sm w-64'
                    />
                  </div>

                  {user && (
                    <div className='relative' ref={dropdownRef}>
                      <button onClick={toggleDropdown} className='btn btn-ghost btn-circle avatar hover:bg-white/10 transition-colors'>
                        <div className='w-8 h-8 md:w-10 md:h-10 rounded-full'>
                          <img
                            src={user.imageUrl || '/placeholder.svg'}
                            alt={user.username || user.emailAddresses[0].emailAddress}
                            className='rounded-full w-full h-full object-cover'
                          />
                        </div>
                      </button>

                      {dropdownOpen && (
                        <div className='absolute right-0 top-full mt-2 w-64 bg-base-100 rounded-box shadow-2xl border border-white/10 z-50 animate-in slide-in-from-top-2 duration-200'>
                          <div className='p-4 border-b border-white/10'>
                            <div className='flex items-center gap-3'>
                              <img
                                src={user.imageUrl || '/placeholder.svg'}
                                alt='Profile'
                                className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover'
                              />
                              <div className='min-w-0 flex-1'>
                                <p className='font-semibold text-base text-white truncate'>{user.username || user.firstName || 'User'}</p>
                                <p className='text-sm text-gray-400 truncate'>{user.emailAddresses[0].emailAddress}</p>
                              </div>
                            </div>
                          </div>

                          <div className='py-1 md:py-2'>
                            <button
                              onClick={handleDropdownItemClick}
                              className='w-full px-3 md:px-4 py-2 md:py-3 text-left hover:bg-white/10 transition-colors text-white flex items-center gap-2 md:gap-3 text-sm md:text-base'
                            >
                              <div className='w-4 h-4 md:w-5 md:h-5 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0'>
                                <div className='w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full'></div>
                              </div>
                              <span className='font-medium'>Profile Settings</span>
                            </button>

                            <button
                              onClick={handleDropdownItemClick}
                              className='w-full px-3 md:px-4 py-2 md:py-3 text-left hover:bg-white/10 transition-colors text-white flex items-center gap-2 md:gap-3 text-sm md:text-base'
                            >
                              <div className='w-4 h-4 md:w-5 md:h-5 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0'>
                                <div className='w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full'></div>
                              </div>
                              <span className='font-medium'>Preferences</span>
                            </button>

                            <div className='divider my-1 md:my-2 mx-3 md:mx-4'></div>

                            <button
                              onClick={() => {
                                handleDropdownItemClick();
                                handleSignOut();
                              }}
                              className='w-full px-3 md:px-4 py-2 text-left hover:bg-red-500/10 transition-colors text-red-400 flex items-center gap-2 md:gap-3 text-sm md:text-base'
                            >
                              <LogOutIcon className='w-4 h-4 md:w-5 md:h-5 flex-shrink-0' />
                              <span className='font-medium'>Sign Out</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </header>

            <main className='flex-grow'>
              <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8'>{children}</div>
            </main>
          </div>

          <div className='drawer-side'>
            <label htmlFor='sidebar-drawer' className='drawer-overlay'></label>
            <aside className='w-52 md:w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 min-h-screen flex flex-col'>
              <div className='invisible lg:visible lg:flex items-center justify-center py-6'>
                <div className='p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl'>
                  <Cloud className='w-6 h-6 md:w-8 md:h-8 text-white' />
                </div>
              </div>

              <nav className='flex-grow px-4 md:px-6'>
                <ul className='menu bg-transparent space-y-2'>
                  {sidebarItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 rounded-xl p-3 transition-all text-sm md:text-base ${
                          pathname === item.href
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 text-white'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className='w-5 h-5 md:w-5 md:h-5' />
                        <span className='font-medium'>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className='mt-6 md:mt-8'>
                  <h3 className='text-gray-400 text-xs md:text-sm font-semibold mb-3 md:mb-4 uppercase tracking-wider'>Quick Actions</h3>
                  <div className='space-y-2'>
                    <button
                      className='w-full btn btn-primary btn-sm bg-gradient-to-r from-blue-500 to-purple-600 border-none text-xs md:text-sm'
                      onClick={() => router.push('/video-upload')}
                    >
                      <Plus className='w-3 h-3 md:w-4 md:h-4' />
                      Upload Media
                    </button>
                    <button className='w-full btn btn-outline btn-sm text-gray-300 border-gray-600 hover:bg-white/10 text-xs md:text-sm'>
                      <Filter className='w-3 h-3 md:w-4 md:h-4' />
                      Filters
                    </button>
                  </div>
                </div>
              </nav>

              {user && (
                <div className='p-4 md:p-6'>
                  <button
                    onClick={handleSignOut}
                    className='flex items-center gap-3 text-red-400 hover:bg-red-500/10 rounded-xl p-3 w-full transition-all text-sm md:text-base'
                  >
                    <LogOutIcon className='w-4 h-4 md:w-5 md:h-5' />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </aside>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
