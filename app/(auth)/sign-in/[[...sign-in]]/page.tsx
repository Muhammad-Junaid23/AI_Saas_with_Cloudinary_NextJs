import { SignIn } from '@clerk/nextjs';
import { Cloud, Sparkles, Shield, Zap } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl'></div>
      </div>

      <div className='relative w-full max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center'>
          <div className='hidden lg:block space-y-6 xl:space-y-8'>
            <div className='space-y-4 xl:space-y-6'>
              <div className='flex items-center gap-3'>
                <div className='p-2 xl:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl'>
                  <Cloud className='w-6 h-6 xl:w-8 xl:h-8 text-white' />
                </div>
                <div>
                  <h1 className='text-2xl xl:text-3xl font-bold text-white'>MediaCraft</h1>
                  <p className='text-gray-400 text-sm xl:text-base'>Media Management Platform</p>
                </div>
              </div>

              <div className='space-y-3 xl:space-y-4'>
                <h2 className='text-3xl xl:text-4xl font-bold text-white leading-tight'>
                  Transform Your Media
                  <br />
                  <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>Experience</span>
                </h2>
                <p className='text-gray-300 text-base xl:text-lg leading-relaxed'>
                  Upload, optimize, and share your videos and images with AI-powered tools and social media integration.
                </p>
              </div>
            </div>

            <div className='space-y-3 xl:space-y-4'>
              <div className='flex items-center gap-3 xl:gap-4 p-3 xl:p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10'>
                <div className='p-2 bg-blue-500/20 rounded-lg flex-shrink-0'>
                  <Zap className='w-4 h-4 xl:w-5 xl:h-5 text-blue-400' />
                </div>
                <div className='min-w-0'>
                  <h3 className='text-white font-semibold text-sm xl:text-base'>AI-Powered Processing</h3>
                  <p className='text-gray-400 text-xs xl:text-sm'>Automatic optimization and smart cropping</p>
                </div>
              </div>

              <div className='flex items-center gap-3 xl:gap-4 p-3 xl:p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10'>
                <div className='p-2 bg-purple-500/20 rounded-lg flex-shrink-0'>
                  <Sparkles className='w-4 h-4 xl:w-5 xl:h-5 text-purple-400' />
                </div>
                <div className='min-w-0'>
                  <h3 className='text-white font-semibold text-sm xl:text-base'>Social Media Ready</h3>
                  <p className='text-gray-400 text-xs xl:text-sm'>Perfect formats for all platforms</p>
                </div>
              </div>

              <div className='flex items-center gap-3 xl:gap-4 p-3 xl:p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10'>
                <div className='p-2 bg-green-500/20 rounded-lg flex-shrink-0'>
                  <Shield className='w-4 h-4 xl:w-5 xl:h-5 text-green-400' />
                </div>
                <div className='min-w-0'>
                  <h3 className='text-white font-semibold text-sm xl:text-base'>Secure & Fast</h3>
                  <p className='text-gray-400 text-xs xl:text-sm'>Enterprise-grade security and performance</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center w-full'>
            <div className='w-full max-w-md'>
              <div className='lg:hidden text-center mb-6 sm:mb-8'>
                <div className='flex items-center justify-center gap-3 mb-4'>
                  <div className='p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl'>
                    <Cloud className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
                  </div>
                  <div>
                    <h1 className='text-xl sm:text-2xl font-bold text-white'>MediaCraft</h1>
                    <p className='text-gray-400 text-xs sm:text-sm'>Media Management Platform</p>
                  </div>
                </div>
                <div className='space-y-2'>
                  <h2 className='text-2xl sm:text-3xl font-bold text-white'>Welcome Back</h2>
                  <p className='text-gray-400 text-sm sm:text-base'>Sign in to continue to your dashboard</p>
                </div>
              </div>

              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl'></div>

                <div className='relative p-4 sm:p-6 lg:p-8'>
                  <div className='hidden lg:block text-center mb-6'>
                    <h2 className='text-xl xl:text-2xl font-bold text-white mb-2'>Welcome Back</h2>
                    <p className='text-gray-400 text-sm xl:text-base'>Sign in to continue to your dashboard</p>
                  </div>

                  <SignIn
                    appearance={{
                      elements: {
                        rootBox: 'w-full',
                        card: 'bg-transparent shadow-none border-none',
                        headerTitle: 'hidden',
                        headerSubtitle: 'hidden',
                        socialButtonsBlockButton:
                          'bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all text-sm sm:text-base py-2 sm:py-3',
                        socialButtonsBlockButtonText: 'text-white font-medium',
                        socialButtonsBlockButtonArrowIcon: 'text-white',
                        dividerLine: 'bg-white/20',
                        dividerText: 'text-gray-400 text-sm',
                        formFieldLabel: 'text-gray-300 font-medium text-sm sm:text-base',
                        formFieldInput:
                          'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base py-2 sm:py-3',
                        footerActionLink: 'text-blue-400 hover:text-blue-300 text-sm sm:text-base',
                        formButtonPrimary:
                          'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-none text-white font-medium py-2 sm:py-3 transition-all hover:scale-105 text-sm sm:text-base',
                        footerActionText: 'text-gray-400 text-sm sm:text-base',
                        identityPreviewText: 'text-white text-sm sm:text-base',
                        identityPreviewEditButton: 'text-blue-400 hover:text-blue-300 text-sm',
                        formResendCodeLink: 'text-blue-400 hover:text-blue-300 text-sm',
                        otpCodeFieldInput: 'bg-white/10 border-white/20 text-white text-sm sm:text-base',
                        formFieldErrorText: 'text-red-400 text-xs sm:text-sm',
                        alertClerkError: 'text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg text-sm',
                        formFieldInputShowPasswordButton: 'text-gray-400 hover:text-white',
                        formFieldAction: 'text-blue-400 hover:text-blue-300 text-sm',
                        formFieldSuccessText: 'text-green-400 text-xs sm:text-sm',
                        formFieldWarningText: 'text-yellow-400 text-xs sm:text-sm',
                        formFieldHintText: 'text-gray-500 text-xs sm:text-sm',
                        formHeaderTitle: 'text-white text-lg sm:text-xl font-bold',
                        formHeaderSubtitle: 'text-gray-400 text-sm sm:text-base',
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
    </div>
  );
}
