'use client';
import { Suspense } from 'react';
import { useState } from 'react';
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
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

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
            {/* Enhanced Header */}
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
                  {/* Search Bar */}
                  <div className='hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2'>
                    <Search className='w-4 h-4 text-gray-400' />
                    <input
                      type='text'
                      placeholder='Search media...'
                      className='bg-transparent text-white placeholder-gray-400 outline-none text-sm w-64'
                    />
                  </div>

                  {user && (
                    <div className='dropdown dropdown-end'>
                      <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
                        <div className='w-10 rounded-full'>
                          <img
                            src={user.imageUrl || '/placeholder.svg'}
                            alt={user.username || user.emailAddresses[0].emailAddress}
                            className='rounded-full'
                          />
                        </div>
                      </div>
                      <ul tabIndex={0} className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-52 p-2 shadow-xl'>
                        <li>
                          <div className='flex items-center gap-2 p-2'>
                            <img src={user.imageUrl || '/placeholder.svg'} alt='Profile' className='w-8 h-8 rounded-full' />
                            <div>
                              <p className='font-medium text-sm'>{user.username || user.firstName || 'User'}</p>
                              <p className='text-xs text-gray-500 truncate'>{user.emailAddresses[0].emailAddress}</p>
                            </div>
                          </div>
                        </li>
                        <div className='divider my-1'></div>
                        <li>
                          <a>Profile Settings</a>
                        </li>
                        <li>
                          <button onClick={handleSignOut} className='text-red-500'>
                            <LogOutIcon className='w-4 h-4' />
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className='flex-grow'>
              <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8'>{children}</div>
            </main>
          </div>

          {/* Enhanced Sidebar */}
          <div className='drawer-side'>
            <label htmlFor='sidebar-drawer' className='drawer-overlay'></label>
            <aside className='w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 min-h-screen flex flex-col'>
              {/* Sidebar Header */}
              <div className='invisible lg:visible lg:flex items-center justify-center py-6'>
                <div className='p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl'>
                  <Cloud className='w-8 h-8 text-white' />
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className='flex-grow px-6'>
                <ul className='menu bg-transparent space-y-2'>
                  {sidebarItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
                          pathname === item.href
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 text-white'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className='w-5 h-5' />
                        <span className='font-medium'>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Quick Actions */}
                <div className='mt-8'>
                  <h3 className='text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider'>Quick Actions</h3>
                  <div className='space-y-2'>
                    <button
                      className='w-full btn btn-primary btn-sm bg-gradient-to-r from-blue-500 to-purple-600 border-none'
                      onClick={() => router.push('/video-upload')}
                    >
                      <Plus className='w-4 h-4' />
                      Upload Media
                    </button>
                    <button className='w-full btn btn-outline btn-sm text-gray-300 border-gray-600 hover:bg-white/10'>
                      <Filter className='w-4 h-4' />
                      Filters
                    </button>
                  </div>
                </div>
              </nav>

              {/* Sidebar Footer */}
              {user && (
                <div className='p-6'>
                  <button
                    onClick={handleSignOut}
                    className='flex items-center gap-3 text-red-400 hover:bg-red-500/10 rounded-xl p-3 w-full transition-all'
                  >
                    <LogOutIcon className='w-5 h-5' />
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
