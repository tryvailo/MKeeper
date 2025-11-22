import React from 'react';
import { 
  BookHeart, 
  Home, 
  Users, 
  Share2, 
  Bell, 
  Clock, 
  FileText, 
  Settings, 
  MessageSquare, 
  Folder, 
  BookOpen, 
  LogOut, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { DashboardView } from '../../types';
import DashboardHome from './DashboardHome';
import Memories from './Memories';

interface DashboardLayoutProps {
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = React.useState<DashboardView>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const sidebarItems = [
    { id: 'home', label: 'Their Story', icon: Home },
    { id: 'family', label: 'Family Members', icon: Users },
    { id: 'sharing', label: 'Sharing & Permissions', icon: Share2 },
    { id: 'reminders', label: 'Reminders', icon: Clock },
    { id: 'history', label: 'History & Activity', icon: FileText },
    { id: 'view-story', label: 'View Story', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'files', label: 'Files', icon: Folder },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome onChangeView={setCurrentView} />;
      case 'memories':
        return <Memories onChangeView={setCurrentView} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-gray-500">
            <p className="text-xl font-semibold mb-2">Coming Soon</p>
            <p>The {sidebarItems.find(i => i.id === currentView)?.label} section is under development.</p>
            <button 
              onClick={() => setCurrentView('home')}
              className="mt-4 text-brand-blue hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-brand-blue">
              <BookHeart size={24} />
              <span className="text-xl font-bold tracking-tight text-gray-900">Legacy Words</span>
            </div>
            <button className="ml-auto lg:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id as DashboardView);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-50 text-brand-blue'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} className={`mr-3 ${currentView === item.id ? 'text-brand-blue' : 'text-gray-400'}`} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100 space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              <HelpCircle size={20} className="mr-3 text-gray-400" />
              Help & Support
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} className="mr-3 text-red-400" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0 z-30">
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center ml-auto space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-200 mx-2"></div>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900">Sarah Jenkins</p>
                <p className="text-xs text-gray-500">Family Admin</p>
              </div>
              <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold border-2 border-blue-100 shadow-sm">
                SJ
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
