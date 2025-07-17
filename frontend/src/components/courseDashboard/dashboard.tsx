import { CourseCard } from '@/components/courseDashboard/courseCard';
import { ResumeSection } from '@/components/resumeSection/resume';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useDashboard } from '@/hooks/useDashboard';
import { useUser } from '@/hooks/useUser';
import { BookOpen, FileText, LogOut, TrendingUp, User } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error } = useDashboard();
  const { updateUser, isUpdating: isUpdatingUser } = useUser();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <header className="bg-white shadow-lg border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-teal-600 bg-clip-text text-transparent">
                Course Progress Tracker
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                  <User className="h-5 w-5 text-slate-600" />
                  <span className="text-sm text-slate-700 font-medium">{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-white">
                  <CardHeader>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-2 bg-slate-200 rounded w-full mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-slate-200 rounded w-16"></div>
                      <div className="h-6 bg-slate-200 rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600">{error.message || 'Failed to load dashboard data'}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { courses, stats } = data;

  // Ensure courses is an array and filter properly
  const coursesArray = Array.isArray(courses) ? courses : [];
  const completedCourses = coursesArray.filter((course) => course.status === 'completed');
  const activeCourses = coursesArray.filter((course) => course.status === 'active');

  const handleAutoEmbedToggle = () => {
    updateUser(!user.autoEmbed);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-teal-600 bg-clip-text text-transparent">
                Course Progress Tracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <User className="h-5 w-5 text-slate-600" />
                <span className="text-sm text-slate-700 font-medium">{data.user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">
            Welcome back, <span className="bg-gradient-to-r from-slate-700 to-teal-600 bg-clip-text text-transparent">{data.user.name}</span>!
          </h2>
          <p className="text-slate-600 text-lg">Track your learning progress and build your professional resume</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal-600">Total Courses</p>
                  <p className="text-2xl font-bold text-teal-800">{stats.totalCourses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-teal-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">Completed</p>
                  <p className="text-2xl font-bold text-emerald-800">{stats.completedCourses}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-600">Avg Progress</p>
                  <p className="text-2xl font-bold text-amber-800">{stats.averageProgress}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Skills Learned</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.totalSkills}</p>
                </div>
                <FileText className="h-8 w-8 text-slate-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Card className="bg-white border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Auto Embed</h3>
                  <p className="text-sm text-slate-600">Automatically embed courses in your resume</p>
                </div>
                <Switch
                  checked={user.autoEmbed}
                  onCheckedChange={handleAutoEmbedToggle}
                  disabled={isUpdatingUser}
                  className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-md border border-slate-200">
            <TabsTrigger
              value="courses"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-teal-600 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4" />
              My Courses
            </TabsTrigger>
            <TabsTrigger
              value="resume"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              Resume Builder
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                Active Courses
                <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded-full">{activeCourses.length}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>

            {completedCourses.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  Completed Courses
                  <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">{completedCourses.length}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="resume">
            <ResumeSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
