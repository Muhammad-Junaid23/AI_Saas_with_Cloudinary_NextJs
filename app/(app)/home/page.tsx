'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import VideoCard from '@/components/VideoCard';
import type { Video } from '@/types';
import { VideoIcon, ImageIcon, Star, Eye, Grid3X3, List, Upload, Play } from 'lucide-react';

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('videos');

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
    <div>
      {/* Content Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-3xl font-bold text-white mb-2'>Media Library</h2>
          <p className='text-gray-400'>Manage and showcase your media content</p>
        </div>

        <div className='flex items-center gap-4'>
          {/* Tab Switcher */}
          <div className='tabs tabs-boxed bg-white/10 backdrop-blur-sm'>
            <a
              className={`tab ${
                activeTab === 'videos' ? 'tab-active bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-gray-300'
              }`}
              onClick={() => setActiveTab('videos')}
            >
              <VideoIcon className='w-4 h-4 mr-2' />
              Videos
            </a>
            <a
              className={`tab ${
                activeTab === 'images' ? 'tab-active bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-gray-300'
              }`}
              onClick={() => setActiveTab('images')}
            >
              <ImageIcon className='w-4 h-4 mr-2' />
              Images
            </a>
          </div>

          {/* View Mode Toggle */}
          <div className='join'>
            <button
              className={`btn join-item btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className='w-4 h-4' />
            </button>
            <button
              className={`btn join-item btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('list')}
            >
              <List className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='stats shadow-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat'>
            <div className='stat-figure text-blue-400'>
              <VideoIcon className='w-8 h-8' />
            </div>
            <div className='stat-title text-gray-300'>Total Videos</div>
            <div className='stat-value text-white'>{videos.length}</div>
            <div className='stat-desc text-gray-400'>{videos.length === 0 ? 'No videos uploaded' : 'Videos available'}</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat'>
            <div className='stat-figure text-green-400'>
              <ImageIcon className='w-8 h-8' />
            </div>
            <div className='stat-title text-gray-300'>Total Images</div>
            <div className='stat-value text-white'>0</div>
            <div className='stat-desc text-gray-400'>No images uploaded</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat'>
            <div className='stat-figure text-purple-400'>
              <Eye className='w-8 h-8' />
            </div>
            <div className='stat-title text-gray-300'>Total Views</div>
            <div className='stat-value text-white'>0</div>
            <div className='stat-desc text-gray-400'>No views yet</div>
          </div>
        </div>

        <div className='stats shadow-xl bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-sm border border-white/10'>
          <div className='stat'>
            <div className='stat-figure text-orange-400'>
              <Star className='w-8 h-8' />
            </div>
            <div className='stat-title text-gray-300'>Favorites</div>
            <div className='stat-value text-white'>0</div>
            <div className='stat-desc text-gray-400'>No favorites yet</div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {videos.length === 0 ? (
        /* Enhanced Empty State */
        <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
          <div className='card-body items-center text-center py-16'>
            <div className='mb-6'>
              <div className='w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-4 mx-auto'>
                <VideoIcon className='w-12 h-12 text-blue-400' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-2'>No videos available</h3>
              <p className='text-gray-400 max-w-md'>
                Get started by uploading your first video. Drag and drop files or click the upload button to begin.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <button className='btn btn-primary bg-gradient-to-r from-blue-500 to-purple-600 border-none'>
                <Upload className='w-5 h-5' />
                Upload Video
              </button>
              <button className='btn btn-outline text-gray-300 border-gray-600 hover:bg-white/10'>
                <Play className='w-5 h-5' />
                View Tutorial
              </button>
            </div>

            <div className='mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20'>
              <p className='text-blue-300 text-sm'>
                💡 <strong>Pro Tip:</strong> You can also upload media by dragging files directly onto this page!
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Video Grid */
        <div className='card bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
          <div className='card-body'>
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
