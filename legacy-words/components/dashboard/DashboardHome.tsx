import React from 'react';
import { X, Share2, Plus, FileText, Clock, MessageSquare, BookOpen, ChevronRight } from 'lucide-react';
import { DashboardView } from '../../types';

interface DashboardHomeProps {
  onChangeView: (view: DashboardView) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onChangeView }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 relative">
        <button className="absolute top-4 right-4 text-blue-400 hover:text-blue-600">
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-brand-dark mb-2">Welcome. Their story is safe.</h2>
        <p className="text-gray-600 mb-6 max-w-2xl">
          You've taken the first step. Now, let's capture what makes them who they are.
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => onChangeView('family')}
            className="bg-white text-brand-blue border border-blue-200 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Share with Family
          </button>
          <button 
            onClick={() => onChangeView('memories')}
            className="bg-brand-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-sm"
          >
            Add More Stories
          </button>
          <button 
            onClick={() => onChangeView('sharing')}
            className="text-brand-blue font-medium px-4 py-2 hover:underline"
          >
            Invite Others to Remember
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Status */}
        <div className="lg:col-span-2 space-y-8">
          {/* Status Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-brand-dark">Their Story Lives Here</h3>
                <p className="text-sm text-gray-500">Securely stored in the UK</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active & Saving
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <span className="block text-2xl font-bold text-brand-blue">3</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Questions</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <span className="block text-2xl font-bold text-brand-blue">450</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Words</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <span className="block text-2xl font-bold text-brand-blue">2d</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Ago</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => onChangeView('memories')}
                className="flex-1 bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} /> Add More Memories
              </button>
              <button 
                onClick={() => onChangeView('sharing')}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={18} /> Share with Someone
              </button>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-brand-blue/30 transition-colors cursor-pointer group" onClick={() => onChangeView('family')}>
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100">
                <Share2 className="text-brand-blue" size={20} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Share It</h4>
              <p className="text-xs text-gray-500">Invite family to read & contribute</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-brand-blue/30 transition-colors cursor-pointer group" onClick={() => onChangeView('memories')}>
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100">
                <FileText className="text-brand-blue" size={20} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Add Memories</h4>
              <p className="text-xs text-gray-500">Answer a new question</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 opacity-75 cursor-not-allowed">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="text-gray-400" size={20} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Print a Copy</h4>
              <p className="text-xs text-gray-500">Hardcover books coming soon</p>
            </div>
          </div>
        </div>

        {/* Right Column - Quick View & Activity */}
        <div className="space-y-8">
          
          {/* Quick View */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
             <h3 className="text-lg font-bold text-brand-dark mb-4">Their Beautiful Story</h3>
             <div className="bg-[#FDFBF7] p-4 rounded-lg border border-orange-100 mb-4 italic text-gray-600 text-sm relative">
               <span className="text-4xl text-orange-200 absolute -top-2 -left-2">"</span>
               My happiest childhood memory was the smell of rain on the hot tarmac...
             </div>
             <button 
              onClick={() => onChangeView('view-story')}
              className="w-full text-brand-blue font-medium text-sm hover:underline flex items-center justify-center"
            >
               View Full Story <ChevronRight size={16} />
             </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-brand-dark">Recent Activity</h3>
              <button onClick={() => onChangeView('history')} className="text-brand-blue text-xs font-bold uppercase hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {[
                { icon: FileText, text: "Answered 'Childhood'", time: "2h ago" },
                { icon: Share2, text: "Shared with Sarah", time: "1d ago" },
                { icon: MessageSquare, text: "Sarah commented", time: "1d ago" },
                { icon: Clock, text: "Created account", time: "2d ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <item.icon size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">{item.text}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
