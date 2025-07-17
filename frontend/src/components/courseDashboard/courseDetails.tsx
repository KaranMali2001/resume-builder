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

interface CourseDetailModalProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseDetailModal({ course, open, onOpenChange }: CourseDetailModalProps) {
  const { updateModule, isUpdatingModule } = useDashboard();

  const handleModuleToggle = (moduleId: string, completed: boolean) => {
    if (!canCompleteModule(course.modules, moduleId) && completed) {
      return; 
    }
    updateModule({ courseId: course.id, moduleId, completed });
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
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-white to-slate-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-slate-800">
            <BookOpen className="h-6 w-6 text-teal-600" />
            {course.title}
          </DialogTitle>
          <DialogDescription className="text-slate-600">📚 Complete modules in sequence to track your progress</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-teal-50 to-slate-50 p-4 rounded-xl border border-teal-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-slate-800">🎯 Overall Progress</span>
              <span className="text-sm text-slate-600 bg-white px-3 py-1 rounded-full">
                {completedModules} of {course.modules.length} modules completed
              </span>
            </div>
            <div className="relative">
              <Progress value={actualProgress} className="h-4 bg-slate-200" />
              <div
                className={`absolute top-0 left-0 h-4 rounded-full bg-gradient-to-r ${getProgressColor(actualProgress)} transition-all duration-500`}
                style={{ width: `${actualProgress}%` }}
              />
            </div>
            <p className="text-sm text-slate-700 mt-2 font-medium">{actualProgress}% Complete</p>
          </div>

          {/* Skills */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
            <h4 className="font-semibold mb-3 text-slate-800 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              Skills You'll Master
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, index) => (
                <Badge
                  key={skill}
                  className={`transition-all hover:scale-105 ${
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
            <h4 className="font-semibold mb-4 text-slate-800 flex items-center gap-2">
              📋 Course Modules
              <span className="text-sm text-slate-500">(Complete in Order)</span>
            </h4>
            <div className="space-y-3">
              {sortedModules.map((module, index) => {
                const canComplete = canCompleteModule(course.modules, module.id);
                const isLocked = !canComplete && !module.completed;

                return (
                  <div
                    key={module.id}
                    className={`flex items-start space-x-3 p-4 rounded-xl border transition-all duration-300 ${
                      module.completed
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-sm'
                        : isLocked
                        ? 'bg-gradient-to-r from-slate-50 to-gray-100 border-slate-200 opacity-60'
                        : 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mt-1">
                      <span
                        className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                          module.completed ? 'bg-emerald-500 text-white' : isLocked ? 'bg-slate-400 text-white' : 'bg-teal-500 text-white'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <Checkbox
                        id={module.id}
                        checked={module.completed}
                        disabled={isLocked || isUpdatingModule}
                        onCheckedChange={(checked) => handleModuleToggle(module.id, checked as boolean)}
                        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                      />
                      {module.completed ? (
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      ) : isLocked ? (
                        <Lock className="h-5 w-5 text-slate-400" />
                      ) : (
                        <Circle className="h-5 w-5 text-teal-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Label
                        htmlFor={module.id}
                        className={`cursor-pointer font-semibold text-base ${
                          module.completed ? 'text-emerald-800' : isLocked ? 'text-slate-500' : 'text-slate-800'
                        }`}
                      >
                        {module.title}
                        {isLocked && <span className="text-xs ml-2 text-rose-500">🔒 Complete previous modules first</span>}
                      </Label>
                      {module.description && (
                        <p className={`text-sm mt-1 ${module.completed ? 'text-emerald-700' : isLocked ? 'text-slate-400' : 'text-slate-600'}`}>
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
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-teal-600" />
                <span className="text-sm font-semibold text-teal-800">✨ This course is embedded in your resume</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
