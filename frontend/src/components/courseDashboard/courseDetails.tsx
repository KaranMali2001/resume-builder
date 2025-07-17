'use client';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useDashboard } from '@/hooks/useDashboard';
import type { Course } from '@/types';
import { calculateProgress, canCompleteModule } from '@/utils/courseUtils';
import { BookOpen, CheckCircle, Circle, Lock, Star } from 'lucide-react';
import { useState } from 'react';

interface CourseDetailModalProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseDetailModal({ course, open, onOpenChange }: CourseDetailModalProps) {
  const { updateModule, isUpdatingModule } = useDashboard();
  const [updatingModuleId, setUpdatingModuleId] = useState<string | null>(null);

  const handleModuleToggle = async (moduleId: string, completed: boolean) => {
    if (!canCompleteModule(course.modules, moduleId) && completed) return;
    setUpdatingModuleId(moduleId);
    try {
      await updateModule({ courseId: course.id, moduleId, completed });
    } finally {
      setUpdatingModuleId(null);
    }
  };

  const actualProgress = calculateProgress(course.modules);
  const completedModules = course.modules.filter((m) => m.completed).length;
  const sortedModules = course.modules.sort((a, b) => a.order - b.order);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-emerald-500 to-teal-500';
    if (progress >= 60) return 'from-teal-500 to-cyan-500';
    if (progress >= 40) return 'from-amber-500 to-orange-500';
    return 'from-rose-500 to-pink-500';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-white to-slate-50 mx-4 sm:mx-0">
        <DialogHeader className="px-2 sm:px-6">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl text-slate-800">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 flex-shrink-0" />
            <span className="truncate">{course.title}</span>
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-sm">📚 Complete modules in sequence to track your progress</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 px-2 sm:px-6">
          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-teal-50 to-slate-50 p-3 sm:p-4 rounded-xl border border-teal-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
              <span className="font-semibold text-slate-800 text-sm sm:text-base">🎯 Overall Progress</span>
              <span className="text-xs sm:text-sm text-slate-600 bg-white px-2 sm:px-3 py-1 rounded-full self-start">
                {completedModules} of {course.modules.length} modules completed
              </span>
            </div>
            <div className="relative">
              <Progress value={actualProgress} className="h-3 sm:h-4 bg-slate-200" />
              <div
                className={`absolute top-0 left-0 h-3 sm:h-4 rounded-full bg-gradient-to-r ${getProgressColor(
                  actualProgress
                )} transition-all duration-500`}
                style={{ width: `${actualProgress}%` }}
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium">{actualProgress}% Complete</p>
          </div>

          {/* Skills */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 sm:p-4 rounded-xl border border-emerald-200">
            <h4 className="font-semibold mb-3 text-slate-800 flex items-center gap-2 text-sm sm:text-base">
              <Star className="h-4 w-4 text-amber-500 flex-shrink-0" />
              Skills You'll Master
            </h4>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {course.skills.map((skill, index) => (
                <Badge
                  key={skill}
                  className={`transition-all hover:scale-105 text-xs ${
                    index % 3 === 0
                      ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
                      : index % 3 === 1
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                  }`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Modules */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-slate-800 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
              📋 Course Modules
              <span className="text-xs sm:text-sm text-slate-500">(Complete in Order)</span>
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {sortedModules.map((module, index) => {
                const canComplete = canCompleteModule(course.modules, module.id);
                const isLocked = !canComplete && !module.completed;
                const isUpdating = updatingModuleId === module.id;

                return (
                  <div
                    key={module.id}
                    className={`relative flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl border transition-all duration-300 group
                      ${
                        module.completed
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-sm'
                          : isLocked
                          ? 'bg-gradient-to-r from-slate-50 to-gray-100 border-slate-200 opacity-60'
                          : 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 hover:shadow-md'
                      }
                      ${isUpdating ? 'opacity-50 pointer-events-none' : ''}
                    `}
                  >
                    {isUpdating && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl z-10">
                        <div className="h-5 w-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}

                    <div className="flex items-center space-x-2 sm:space-x-3 mt-1 flex-shrink-0 z-0">
                      <span
                        className={`text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                          module.completed ? 'bg-emerald-500 text-white' : isLocked ? 'bg-slate-400 text-white' : 'bg-teal-500 text-white'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <Checkbox
                        id={module.id}
                        checked={module.completed}
                        disabled={isLocked || isUpdating || isUpdatingModule}
                        onCheckedChange={(checked) => handleModuleToggle(module.id, checked as boolean)}
                        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                      />
                      {module.completed ? (
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                      ) : isLocked ? (
                        <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                      ) : (
                        <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 z-0">
                      <Label
                        htmlFor={module.id}
                        className={`cursor-pointer font-semibold text-sm sm:text-base ${
                          module.completed ? 'text-emerald-800' : isLocked ? 'text-slate-500' : 'text-slate-800'
                        }`}
                      >
                        <span className="block sm:inline">{module.title}</span>
                        {isLocked && <span className="text-xs ml-0 sm:ml-2 text-rose-500 block sm:inline">🔒 Complete previous modules first</span>}
                      </Label>
                      {module.description && (
                        <p
                          className={`text-xs sm:text-sm mt-1 ${
                            module.completed ? 'text-emerald-700' : isLocked ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {module.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Embed Status */}
          {course.embedded && (
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 p-3 sm:p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-teal-800">✨ This course is embedded in your resume</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
