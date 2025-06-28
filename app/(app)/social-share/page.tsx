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
      console.log(error);
      alert('Failed to upload image');
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
    <div className='space-y-8'>
      {/* Header */}
      <div className='text-center'>
        <div className='flex items-center justify-center gap-3 mb-4'>
          <div className='p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl'>
            <Sparkles className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-4xl font-bold text-white'>Social Media Creator</h1>
        </div>
        <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
          Transform your images into perfect social media posts with AI-powered cropping and optimization
        </p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='stats shadow-xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat'>
            <div className='stat-figure text-pink-400'>
              <Instagram className='w-8 h-8' />
            </div>
            <div className='stat-title text-gray-300'>Instagram Ready</div>
            <div className='stat-value text-white'>2</div>
            <div className='stat-desc text-gray-400'>Format options</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat'>
            <div className='stat-figure text-blue-400'>
              <Twitter className='w-8 h-8' />
            </div>
            <div className='stat-title text-gray-300'>Twitter Ready</div>
            <div className='stat-value text-white'>2</div>
            <div className='stat-desc text-gray-400'>Format options</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat'>
            <div className='stat-figure text-indigo-400'>
              <Facebook className='w-8 h-8' />
            </div>
            <div className='stat-title text-gray-300'>Facebook Ready</div>
            <div className='stat-value text-white'>1</div>
            <div className='stat-desc text-gray-400'>Format option</div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
        <div className='card-body'>
          <div className='flex items-center gap-3 mb-6'>
            <Upload className='w-6 h-6 text-blue-400' />
            <h2 className='card-title text-white'>Upload Your Image</h2>
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-gray-300'>Choose an image file</span>
              <span className='label-text-alt text-gray-500'>PNG, JPG, WEBP supported</span>
            </label>
            <input
              type='file'
              onChange={handleFileUpload}
              accept='image/*'
              className='file-input file-input-bordered file-input-primary w-full bg-white/10 border-white/20 text-white'
              disabled={isUploading}
            />
          </div>

          {isUploading && (
            <div className='mt-6'>
              <div className='flex items-center gap-3 mb-2'>
                <RefreshCw className='w-5 h-5 text-blue-400 animate-spin' />
                <span className='text-white'>Uploading your image...</span>
              </div>
              <progress className='progress progress-primary w-full'></progress>
            </div>
          )}
        </div>
      </div>

      {/* Format Selection & Preview */}
      {uploadedImage && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Format Selection */}
          <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
            <div className='card-body'>
              <div className='flex items-center gap-3 mb-6'>
                <Palette className='w-6 h-6 text-purple-400' />
                <h2 className='card-title text-white'>Choose Format</h2>
              </div>

              <div className='space-y-3'>
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
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedFormat === format
                            ? `bg-gradient-to-r ${config.color} border-white/30`
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className='flex items-center gap-3'>
                          <IconComponent className='w-6 h-6 text-white' />
                          <div className='flex-1'>
                            <h3 className='font-semibold text-white'>{format}</h3>
                            <p className='text-sm text-gray-400'>
                              {config.width} × {config.height} ({config.aspectRatio})
                            </p>
                          </div>
                          {selectedFormat === format && <div className='w-3 h-3 bg-white rounded-full'></div>}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
            <div className='card-body'>
              <div className='flex items-center gap-3 mb-6'>
                <ImageIcon className='w-6 h-6 text-green-400' />
                <h2 className='card-title text-white'>Preview</h2>
                <div className={`badge bg-gradient-to-r ${currentFormat.color} text-white border-none`}>{selectedFormat.split(' ')[0]}</div>
              </div>

              <div className='relative'>
                {isTransforming && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 rounded-xl'>
                    <div className='text-center'>
                      <Zap className='w-8 h-8 text-yellow-400 animate-pulse mx-auto mb-2' />
                      <span className='text-white'>Transforming...</span>
                    </div>
                  </div>
                )}

                <div className='flex justify-center p-4 bg-white/5 rounded-xl'>
                  <CldImage
                    width={Math.min(currentFormat.width, 400)}
                    height={Math.min(currentFormat.height, 400)}
                    src={uploadedImage}
                    sizes='100vw'
                    alt='transformed image'
                    crop='fill'
                    aspectRatio={currentFormat.aspectRatio}
                    gravity='auto'
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    className='rounded-lg shadow-lg max-w-full h-auto'
                  />
                </div>

                <div className='mt-4 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20'>
                  <p className='text-blue-300 text-sm text-center'>
                    <strong>Dimensions:</strong> {currentFormat.width} × {currentFormat.height} pixels
                  </p>
                </div>
              </div>

              <div className='card-actions justify-center mt-6'>
                <button
                  className={`btn bg-gradient-to-r ${currentFormat.color} border-none text-white hover:scale-105 transition-transform`}
                  onClick={handleDownload}
                  disabled={isTransforming}
                >
                  <Download className='w-5 h-5' />
                  Download for {selectedFormat.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className='card bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20'>
        <div className='card-body'>
          <h3 className='text-lg font-semibold text-white mb-4'>💡 Pro Tips</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-300'>
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
