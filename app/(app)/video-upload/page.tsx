'use client';
import type React from 'react';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Upload, Video, FileText, AlertCircle, CheckCircle, Film, Clock, HardDrive, Zap, Play, Settings } from 'lucide-react';

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  // Max file size of 70 MB
  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('video/')) {
        setFile(droppedFile);
      } else {
        alert('Please upload a video file');
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('File size too large. Maximum size is 70MB.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('originalSize', file.size.toString());

    try {
      const response = await axios.post('/api/video-upload', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
          setUploadProgress(progress);
        },
      });

      if (response.status === 200) {
        router.push('/home');
      }
    } catch (error) {
      console.log(error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className='space-y-6 md:space-y-8'>
      <div className='text-center px-4'>
        <div className='flex items-center justify-center gap-3 mb-4'>
          <div className='p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl'>
            <Video className='w-6 h-6 md:w-8 md:h-8 text-white' />
          </div>
          <h1 className='text-2xl md:text-4xl font-bold text-white'>Video Upload</h1>
        </div>
        <p className='text-gray-400 text-sm md:text-lg max-w-2xl mx-auto'>
          Upload and optimize your videos with advanced compression and cloud processing
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6'>
        <div className='stats shadow-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat p-3 md:p-4'>
            <div className='stat-figure text-blue-400'>
              <HardDrive className='w-6 h-6 md:w-8 md:h-8' />
            </div>
            <div className='stat-title text-gray-300 text-xs md:text-sm'>Max File Size</div>
            <div className='stat-value text-white text-lg md:text-2xl'>70MB</div>
            <div className='stat-desc text-gray-400 text-xs'>Per upload</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat p-3 md:p-4'>
            <div className='stat-figure text-green-400'>
              <Zap className='w-6 h-6 md:w-8 md:h-8' />
            </div>
            <div className='stat-title text-gray-300 text-xs md:text-sm'>Processing</div>
            <div className='stat-value text-white text-lg md:text-2xl'>AI</div>
            <div className='stat-desc text-gray-400 text-xs'>Powered optimization</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat p-3 md:p-4'>
            <div className='stat-figure text-purple-400'>
              <Film className='w-6 h-6 md:w-8 md:h-8' />
            </div>
            <div className='stat-title text-gray-300 text-xs md:text-sm'>Formats</div>
            <div className='stat-value text-white text-lg md:text-2xl'>All</div>
            <div className='stat-desc text-gray-400 text-xs'>Video types supported</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6 md:space-y-8'>
        <div className='space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8'>
          <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
            <div className='card-body p-4 md:p-6'>
              <div className='flex items-center gap-3 mb-4 md:mb-6'>
                <FileText className='w-5 h-5 md:w-6 md:h-6 text-green-400' />
                <h2 className='card-title text-white text-lg md:text-xl'>Video Details</h2>
              </div>

              <div className='space-y-4 md:space-y-6'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-gray-300 font-medium text-sm md:text-base'>Title</span>
                    <span className='label-text-alt text-gray-500 text-xs'>{title.length}/100</span>
                  </label>
                  <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='input w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-500 text-sm md:text-base'
                    placeholder='Enter a catchy title for your video'
                    maxLength={100}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-gray-300 font-medium text-sm md:text-base'>Description</span>
                    <span className='label-text-alt text-gray-500 text-xs'>{description.length}/500</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='textarea w-full h-24 md:h-32 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-500 resize-none text-sm md:text-base'
                    placeholder='Describe your video content...'
                    maxLength={500}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
            <div className='card-body p-4 md:p-6'>
              <div className='flex items-center gap-3 mb-4 md:mb-6'>
                <Upload className='w-5 h-5 md:w-6 md:h-6 text-blue-400' />
                <h2 className='card-title text-white text-lg md:text-xl'>Upload Video</h2>
              </div>

              <div
                className={`border-2 border-dashed rounded-xl p-4 md:p-8 text-center transition-all ${
                  dragActive
                    ? 'border-blue-500 bg-blue-500/10'
                    : file
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className='space-y-3 md:space-y-4'>
                    <CheckCircle className='w-8 h-8 md:w-12 md:h-12 text-green-400 mx-auto' />
                    <div>
                      <p className='text-white font-medium text-sm md:text-base break-all'>{file.name}</p>
                      <p className='text-gray-400 text-xs md:text-sm'>{formatFileSize(file.size)}</p>
                      <div className='mt-2'>
                        <div className={`badge text-xs ${file.size > MAX_FILE_SIZE ? 'badge-error' : 'badge-success'}`}>
                          {file.size > MAX_FILE_SIZE ? 'File too large' : 'Ready to upload'}
                        </div>
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => setFile(null)}
                      className='btn btn-outline btn-sm text-gray-300 border-gray-600 hover:bg-white/10'
                    >
                      Choose Different File
                    </button>
                  </div>
                ) : (
                  <div className='space-y-3 md:space-y-4'>
                    <Video className='w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto' />
                    <div>
                      <p className='text-white font-medium mb-2 text-sm md:text-base'>Drop your video here</p>
                      <p className='text-gray-400 text-xs md:text-sm mb-3 md:mb-4'>or click to browse files</p>
                      <input
                        type='file'
                        accept='video/*'
                        onChange={handleFileChange}
                        className='file-input file-input-bordered file-input-primary w-full max-w-xs bg-white/10 border-white/20 text-xs md:text-sm'
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {file && file.size > MAX_FILE_SIZE && (
                <div className='alert alert-error mt-3 md:mt-4 text-xs md:text-sm'>
                  <AlertCircle className='w-4 h-4 md:w-5 md:h-5' />
                  <span>File size exceeds 70MB limit. Please choose a smaller file.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {isUploading && (
          <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
            <div className='card-body p-4 md:p-6'>
              <div className='flex items-center gap-3 mb-3 md:mb-4'>
                <Settings className='w-5 h-5 md:w-6 md:h-6 text-yellow-400 animate-spin' />
                <h3 className='text-base md:text-lg font-semibold text-white'>Processing Upload</h3>
              </div>
              <div className='space-y-3 md:space-y-4'>
                <div className='flex justify-between text-xs md:text-sm'>
                  <span className='text-gray-300'>Upload Progress</span>
                  <span className='text-white'>{uploadProgress}%</span>
                </div>
                <progress className='progress progress-primary w-full' value={uploadProgress} max='100'></progress>
                <div className='flex items-center gap-2 text-xs md:text-sm text-gray-400'>
                  <Clock className='w-3 h-3 md:w-4 md:h-4' />
                  <span>Processing your video with AI optimization...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='flex justify-center px-4'>
          <button
            type='submit'
            className='btn btn-primary btn-lg w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 border-none text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base'
            disabled={isUploading || !file || file.size > MAX_FILE_SIZE}
          >
            {isUploading ? (
              <>
                <Settings className='w-4 h-4 md:w-5 md:h-5 animate-spin' />
                Uploading... {uploadProgress}%
              </>
            ) : (
              <>
                <Play className='w-4 h-4 md:w-5 md:h-5' />
                Upload Video
              </>
            )}
          </button>
        </div>
      </form>

      <div className='card bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20'>
        <div className='card-body p-4 md:p-6'>
          <h3 className='text-base md:text-lg font-semibold text-white mb-3 md:mb-4'>📹 Upload Tips</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm text-blue-300'>
            <div>• Supported formats: MP4, MOV, AVI, MKV, WebM</div>
            <div>• Maximum file size: 70MB per upload</div>
            <div>• Higher resolution videos get better optimization</div>
            <div>• Add descriptive titles for better organization</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
