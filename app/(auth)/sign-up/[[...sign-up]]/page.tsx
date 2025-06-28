import { SignUp } from '@clerk/nextjs';
import { Cloud, Sparkles, Shield, Zap, Users, Star } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl'></div>
      </div>

      <div className='relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
        {/* Left Side - Branding */}
        <div className='hidden lg:block space-y-8'>
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl'>
                <Cloud className='w-8 h-8 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-white'>MediaCraft</h1>
                <p className='text-gray-400'>Media Management Platform</p>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-4xl font-bold text-white leading-tight'>
                Join Thousands of
                <br />
                <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>Content Creators</span>
              </h2>
              <p className='text-gray-300 text-lg leading-relaxed'>
                Start your journey with our powerful media management tools. Upload, optimize, and share like never before.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className='space-y-4'>
            <div className='flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10'>
              <div className='p-2 bg-blue-500/20 rounded-lg'>
                <Zap className='w-5 h-5 text-blue-400' />
              </div>
              <div>
                <h3 className='text-white font-semibold'>Lightning Fast</h3>
                <p className='text-gray-400 text-sm'>Upload and process in seconds</p>
              </div>
            </div>

            <div className='flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10'>
              <div className='p-2 bg-purple-500/20 rounded-lg'>
                <Sparkles className='w-5 h-5 text-purple-400' />
              </div>
              <div>
                <h3 className='text-white font-semibold'>AI Enhancement</h3>
                <p className='text-gray-400 text-sm'>Smart optimization and effects</p>
              </div>
            </div>

            <div className='flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10'>
              <div className='p-2 bg-green-500/20 rounded-lg'>
                <Shield className='w-5 h-5 text-green-400' />
              </div>
              <div>
                <h3 className='text-white font-semibold'>100% Secure</h3>
                <p className='text-gray-400 text-sm'>Your data is always protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className='flex items-center justify-center'>
          <div className='w-full max-w-md'>
            {/* Mobile Header */}
            <div className='lg:hidden text-center mb-8'>
              <div className='flex items-center justify-center gap-3 mb-4'>
                <div className='p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl'>
                  <Cloud className='w-8 h-8 text-white' />
                </div>
                <div>
                  <h1 className='text-2xl font-bold text-white'>MediaCraft</h1>
                  <p className='text-gray-400 text-sm'>Media Management Platform</p>
                </div>
              </div>
            </div>

            {/* Clerk Sign Up Component with Custom Styling */}
            <div className='relative'>
              {/* Background Card */}
              <div className='absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl'></div>

              {/* Sign Up Form */}
              <div className='relative p-8'>
                <div className='text-center mb-6'>
                  <h2 className='text-2xl font-bold text-white mb-2'>Create Account</h2>
                  <p className='text-gray-400'>Join us and start managing your media</p>
                </div>

                <SignUp
                  appearance={{
                    elements: {
                      rootBox: 'w-full',
                      card: 'bg-transparent shadow-none border-none',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      socialButtonsBlockButton: 'bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all',
                      socialButtonsBlockButtonText: 'text-white font-medium',
                      dividerLine: 'bg-white/20',
                      dividerText: 'text-gray-400',
                      formFieldLabel: 'text-gray-300 font-medium',
                      formFieldInput:
                        'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                      footerActionLink: 'text-blue-400 hover:text-blue-300',
                      formButtonPrimary:
                        'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-none text-white font-medium py-3 transition-all hover:scale-105',
                      footerActionText: 'text-gray-400',
                      identityPreviewText: 'text-white',
                      identityPreviewEditButton: 'text-blue-400 hover:text-blue-300',
                      formResendCodeLink: 'text-blue-400 hover:text-blue-300',
                      otpCodeFieldInput: 'bg-white/10 border-white/20 text-white',
                      formFieldErrorText: 'text-red-400',
                      alertClerkError: 'text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg',
                    },
                    layout: {
                      socialButtonsPlacement: 'top',
                      showOptionalFields: false,
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
