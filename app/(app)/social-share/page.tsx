'use client';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { CldImage } from 'next-cloudinary';
import { Upload, Download, ImageIcon, Sparkles, Instagram, Twitter, Facebook, Palette, Zap, RefreshCw } from 'lucide-react';

const socialFormats = {
  'Instagram Square (1:1)': {
    width: 1080,
    height: 1080,
    aspectRatio: '1:1',
    icon: Instagram,
    color: 'from-pink-500 to-purple-600',
  },
  'Instagram Portrait (4:5)': {
    width: 1080,
    height: 1350,
    aspectRatio: '4:5',
    icon: Instagram,
    color: 'from-pink-500 to-purple-600',
  },
  'Twitter Post (16:9)': {
    width: 1200,
    height: 675,
    aspectRatio: '16:9',
    icon: Twitter,
    color: 'from-blue-400 to-blue-600',
  },
  'Twitter Header (3:1)': {
    width: 1500,
    height: 500,
    aspectRatio: '3:1',
    icon: Twitter,
    color: 'from-blue-400 to-blue-600',
  },
  'Facebook Cover (205:78)': {
    width: 820,
    height: 312,
    aspectRatio: '205:78',
    icon: Facebook,
    color: 'from-blue-600 to-indigo-600',
  },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>('Instagram Square (1:1)');
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/image-upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error) {
      console.log(error, 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedFormat.replace(/\s+/g, '_').toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  const currentFormat = socialFormats[selectedFormat];

  return (
    <div className='space-y-6 md:space-y-8'>
      <div className='text-center px-4'>
        <div className='flex items-center justify-center gap-3 mb-4'>
          <div className='p-2 md:p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl'>
            <Sparkles className='w-6 h-6 md:w-8 md:h-8 text-white' />
          </div>
          <h1 className='text-2xl md:text-4xl font-bold text-white'>Social Media Creator</h1>
        </div>
        <p className='text-gray-400 text-sm md:text-lg max-w-2xl mx-auto'>
          Transform your images into perfect social media posts with AI-powered cropping and optimization
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6'>
        <div className='stats shadow-xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat p-3 md:p-4'>
            <div className='stat-figure text-pink-400'>
              <Instagram className='w-6 h-6 md:w-8 md:h-8' />
            </div>
            <div className='stat-title text-gray-300 text-xs md:text-sm'>Instagram Ready</div>
            <div className='stat-value text-white text-lg md:text-2xl'>2</div>
            <div className='stat-desc text-gray-400 text-xs'>Format options</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat p-3 md:p-4'>
            <div className='stat-figure text-blue-400'>
              <Twitter className='w-6 h-6 md:w-8 md:h-8' />
            </div>
            <div className='stat-title text-gray-300 text-xs md:text-sm'>Twitter Ready</div>
            <div className='stat-value text-white text-lg md:text-2xl'>2</div>
            <div className='stat-desc text-gray-400 text-xs'>Format options</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat p-3 md:p-4'>
            <div className='stat-figure text-indigo-400'>
              <Facebook className='w-6 h-6 md:w-8 md:h-8' />
            </div>
            <div className='stat-title text-gray-300 text-xs md:text-sm'>Facebook Ready</div>
            <div className='stat-value text-white text-lg md:text-2xl'>1</div>
            <div className='stat-desc text-gray-400 text-xs'>Format option</div>
          </div>
        </div>
      </div>

      <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
        <div className='card-body p-4 md:p-6'>
          <div className='flex items-center gap-3 mb-4 md:mb-6'>
            <Upload className='w-5 h-5 md:w-6 md:h-6 text-blue-400' />
            <h2 className='card-title text-white text-lg md:text-xl'>Upload Your Image</h2>
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-gray-300 text-sm md:text-base'>Choose an image file</span>
              <span className='label-text-alt text-gray-500 text-xs'>PNG, JPG, WEBP supported</span>
            </label>
            <input
              type='file'
              onChange={handleFileUpload}
              accept='image/*'
              className='file-input file-input-bordered file-input-primary w-full bg-white/10 border-white/20 text-white text-sm md:text-base'
              disabled={isUploading}
            />
          </div>

          {isUploading && (
            <div className='mt-4 md:mt-6'>
              <div className='flex items-center gap-3 mb-2'>
                <RefreshCw className='w-4 h-4 md:w-5 md:h-5 text-blue-400 animate-spin' />
                <span className='text-white text-sm md:text-base'>Uploading your image...</span>
              </div>
              <progress className='progress progress-primary w-full'></progress>
            </div>
          )}
        </div>
      </div>

      {uploadedImage && (
        <div className='space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8'>
          <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
            <div className='card-body p-4 md:p-6'>
              <div className='flex items-center gap-3 mb-4 md:mb-6'>
                <Palette className='w-5 h-5 md:w-6 md:h-6 text-purple-400' />
                <h2 className='card-title text-white text-lg md:text-xl'>Choose Format</h2>
              </div>

              <div className='space-y-2 md:space-y-3'>
                {Object.entries(socialFormats).map(([format, config]) => {
                  const IconComponent = config.icon;
                  return (
                    <label key={format} className='cursor-pointer'>
                      <input
                        type='radio'
                        name='format'
                        value={format}
                        checked={selectedFormat === format}
                        onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
                        className='sr-only'
                      />
                      <div
                        className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                          selectedFormat === format
                            ? `bg-gradient-to-r ${config.color} border-white/30`
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className='flex items-center gap-3'>
                          <IconComponent className='w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0' />
                          <div className='flex-1 min-w-0'>
                            <h3 className='font-semibold text-white text-sm md:text-base'>{format}</h3>
                            <p className='text-xs md:text-sm text-gray-400 mb-1'>
                              {config.width} × {config.height} ({config.aspectRatio})
                            </p>
                            <p className='text-xs text-gray-500'>{config.description}</p>
                          </div>
                          {selectedFormat === format && <div className='w-3 h-3 bg-white rounded-full flex-shrink-0'></div>}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
            <div className='card-body p-4 md:p-6'>
              <div className='flex items-center gap-3 mb-4 md:mb-6'>
                <ImageIcon className='w-5 h-5 md:w-6 md:h-6 text-green-400' />
                <h2 className='card-title text-white text-lg md:text-xl'>Preview</h2>
                <div className={`badge bg-gradient-to-r ${currentFormat.color} text-white border-none text-xs`}>
                  {selectedFormat.split(' ')[0]}
                </div>
              </div>

              <div className='relative'>
                {isTransforming && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 rounded-xl'>
                    <div className='text-center'>
                      <Zap className='w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse mx-auto mb-2' />
                      <span className='text-white text-sm md:text-base'>Transforming...</span>
                    </div>
                  </div>
                )}

                <div className='bg-white/5 rounded-xl p-4 md:p-6'>
                  <div className='flex justify-center items-center min-h-[200px]'>
                    <div
                      className='relative bg-gray-900/50 rounded-lg overflow-hidden shadow-2xl border-2 border-white/20'
                      style={{
                        width: `${Math.min(currentFormat.previewWidth, window.innerWidth < 768 ? 280 : currentFormat.previewWidth)}px`,
                        height: `${Math.min(
                          currentFormat.previewHeight,
                          window.innerWidth < 768
                            ? (280 * currentFormat.previewHeight) / currentFormat.previewWidth
                            : currentFormat.previewHeight
                        )}px`,
                      }}
                    >
                      <CldImage
                        width={currentFormat.width}
                        height={currentFormat.height}
                        src={uploadedImage}
                        sizes='100vw'
                        alt='transformed image'
                        crop='fill'
                        aspectRatio={currentFormat.aspectRatio}
                        gravity='auto'
                        ref={imageRef}
                        onLoad={() => setIsTransforming(false)}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>

                  <div className='mt-4 space-y-2'>
                    <div className='flex justify-between items-center text-sm'>
                      <span className='text-gray-400'>Dimensions:</span>
                      <span className='text-white font-medium'>
                        {currentFormat.width} × {currentFormat.height} pixels
                      </span>
                    </div>
                    <div className='flex justify-between items-center text-sm'>
                      <span className='text-gray-400'>Aspect Ratio:</span>
                      <span className='text-white font-medium'>{currentFormat.aspectRatio}</span>
                    </div>
                    <div className='flex justify-between items-center text-sm'>
                      <span className='text-gray-400'>Best For:</span>
                      <span className='text-white font-medium'>{selectedFormat.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card-actions justify-center mt-4 md:mt-6'>
                <button
                  className={`btn w-full sm:w-auto bg-gradient-to-r ${currentFormat.color} border-none text-white hover:scale-105 transition-transform text-sm md:text-base`}
                  onClick={handleDownload}
                  disabled={isTransforming}
                >
                  <Download className='w-4 h-4 md:w-5 md:h-5' />
                  Download for {selectedFormat.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='card bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20'>
        <div className='card-body p-4 md:p-6'>
          <h3 className='text-base md:text-lg font-semibold text-white mb-3 md:mb-4'>💡 Pro Tips</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm text-blue-300'>
            <div>• Use high-resolution images for best quality</div>
            <div>• AI automatically focuses on important subjects</div>
            <div>• Square formats work great for profile pictures</div>
            <div>• Wide formats are perfect for cover photos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
