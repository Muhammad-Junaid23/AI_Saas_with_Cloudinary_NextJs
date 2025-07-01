'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import VideoCard from '@/components/VideoCard';
import { VideoIcon, ImageIcon, Star, Eye, Grid3X3, List, Upload, Play, Search } from 'lucide-react';
import type { Video } from '@/types';

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('videos');
  const router = useRouter();

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get('/api/videos');
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.log(error);
      setError('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}.mp4`);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='loading loading-spinner loading-lg text-primary'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='alert alert-error'>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className='space-y-6 md:space-y-8'>
      <div className='space-y-4 md:space-y-0 md:flex md:items-center md:justify-between'>
        <div className='text-center md:text-left'>
          <h2 className='text-2xl md:text-3xl font-bold text-white mb-2'>Media Library</h2>
          <p className='text-gray-400 text-sm md:text-base'>Manage and showcase your media content</p>
        </div>

        <div className='md:hidden'>
          <div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2'>
            <Search className='w-4 h-4 text-gray-400' />
            <input
              type='text'
              placeholder='Search media...'
              className='bg-transparent text-white placeholder-gray-400 outline-none text-sm flex-1'
            />
          </div>
        </div>

        <div className='flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4'>
          <div className='tabs tabs-boxed bg-white/10 backdrop-blur-sm w-full md:w-auto'>
            <a
              className={`tab flex-1 md:flex-none ${
                activeTab === 'videos' ? 'tab-active bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-gray-300'
              }`}
              onClick={() => setActiveTab('videos')}
            >
              <VideoIcon className='w-4 h-4 mr-1 md:mr-2' />
              <span className='text-xs md:text-sm'>Videos</span>
            </a>
            <a
              className={`tab flex-1 md:flex-none ${
                activeTab === 'images' ? 'tab-active bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-gray-300'
              }`}
              onClick={() => setActiveTab('images')}
            >
              <ImageIcon className='w-4 h-4 mr-1 md:mr-2' />
              <span className='text-xs md:text-sm'>Images</span>
            </a>
          </div>

          <div className='hidden sm:flex join w-full md:w-auto'>
            <button
              className={`btn join-item btn-sm flex-1 md:flex-none ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className='w-4 h-4' />
              <span className='ml-1 md:hidden'>Grid</span>
            </button>
            <button
              className={`btn join-item btn-sm flex-1 md:flex-none ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('list')}
            >
              <List className='w-4 h-4' />
              <span className='ml-1 md:hidden'>List</span>
            </button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6'>
        <div className='stats shadow-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat p-3 md:p-4'>
            <div className='stat-figure text-blue-400'>
              <VideoIcon className='w-6 h-6 md:w-8 md:h-8' />
            </div>
            <div className='stat-title text-gray-300 text-xs md:text-sm'>Total Videos</div>
            <div className='stat-value text-white text-lg md:text-2xl'>{videos.length}</div>
            <div className='stat-desc text-gray-400 text-xs'>{videos.length === 0 ? 'No videos' : 'Available'}</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat p-3 md:p-4'>
            <div className='stat-figure text-green-400'>
              <ImageIcon className='w-6 h-6 md:w-8 md:h-8' />
            </div>
            <div className='stat-title text-gray-300 text-xs md:text-sm'>Total Images</div>
            <div className='stat-value text-white text-lg md:text-2xl'>6</div>
            <div className='stat-desc text-gray-400 text-xs'>Available</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat p-3 md:p-4'>
            <div className='stat-figure text-purple-400'>
              <Eye className='w-6 h-6 md:w-8 md:h-8' />
            </div>
            <div className='stat-title text-gray-300 text-xs md:text-sm'>Total Views</div>
            <div className='stat-value text-white text-lg md:text-2xl'>54</div>
            <div className='stat-desc text-gray-400 text-xs'>Available</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat p-3 md:p-4'>
            <div className='stat-figure text-orange-400'>
              <Star className='w-6 h-6 md:w-8 md:h-8' />
            </div>
            <div className='stat-title text-gray-300 text-xs md:text-sm'>Favorites</div>
            <div className='stat-value text-white text-lg md:text-2xl'>3</div>
            <div className='stat-desc text-gray-400 text-xs'>Available</div>
          </div>
        </div>
      </div>

      {videos.length === 0 ? (
        <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
          <div className='card-body items-center text-center py-8 md:py-16 px-4 md:px-8'>
            <div className='mb-6'>
              <div className='w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-4 mx-auto'>
                <VideoIcon className='w-8 h-8 md:w-12 md:h-12 text-blue-400' />
              </div>
              <h3 className='text-xl md:text-2xl font-bold text-white mb-2'>No videos available</h3>
              <p className='text-gray-400 text-sm md:text-base max-w-md mx-auto'>
                Get started by uploading your first video. Drag and drop files or click the upload button to begin.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto'>
              <button className='btn btn-primary bg-gradient-to-r from-blue-500 to-purple-600 border-none flex-1 sm:flex-none'>
                <Upload className='w-4 h-4 md:w-5 md:h-5' />
                <span className='text-sm md:text-base' onClick={() => router.push('/video-upload')}>
                  Upload Video
                </span>
              </button>
            </div>

            <div className='mt-6 md:mt-8 p-3 md:p-4 bg-blue-500/10 rounded-xl border border-blue-500/20'>
              <p className='text-blue-300 text-xs md:text-sm'>
                💡 <strong>Pro Tip:</strong> You can also upload media by dragging files directly onto this page!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
          <div className='card-body p-4 md:p-6'>
            <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} onDownload={handleDownload} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
