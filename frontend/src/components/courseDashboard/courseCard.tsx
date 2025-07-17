'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Course } from '@/types';
import { calculateProgress } from '@/utils/courseUtils';
import { Award, BookOpen, Calendar } from 'lucide-react';
import { useState } from 'react';
import { CourseDetailModal } from './courseDetails';
import { EmbedModal } from './embed-model';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const actualProgress = calculateProgress(course.modules);
  const completedModules = course.modules.filter((m) => m.completed).length;
  const canEmbed = actualProgress >= 60;

  // Professional color scheme
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-gradient-to-r from-emerald-500 to-teal-500';
    if (progress >= 60) return 'bg-gradient-to-r from-teal-500 to-cyan-500';
    if (progress >= 40) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-rose-500 to-pink-500';
  };

  const getCardBorder = (progress: number) => {
    if (progress >= 80) return 'border-l-4 border-l-emerald-500';
    if (progress >= 60) return 'border-l-4 border-l-teal-500';
    if (progress >= 40) return 'border-l-4 border-l-amber-500';
    return 'border-l-4 border-l-rose-500';
  };

  return (
    <>
      <Card
        className={`h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 ${getCardBorder(
          actualProgress
        )} bg-gradient-to-br from-white to-slate-50`}
      >
        <CardHeader onClick={() => setShowDetailModal(true)} className="pb-3 px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-slate-800 pr-2">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 flex-shrink-0" />
                <span className="truncate">{course.title}</span>
                {course.embedded && (
                  <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-300 shadow-sm flex-shrink-0 hidden sm:inline-flex">
                    ✨ Embedded
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="mt-1 text-slate-600">
                {course.status === 'completed' ? (
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <Award className="h-3 w-3" />
                    Completed
                  </span>
                ) : (
                  <span className="text-teal-600 font-medium">In Progress</span>
                )}
              </CardDescription>
              {course.embedded && (
                <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-300 shadow-sm mt-2 sm:hidden">
                  ✨ Embedded
                </Badge>
              )}
            </div>
            {course.status === 'completed' && <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 flex-shrink-0" />}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6" onClick={() => setShowDetailModal(true)}>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700">Progress</span>
              <span className="font-bold text-slate-800">{actualProgress}%</span>
            </div>
            <div className="relative">
              <Progress value={actualProgress} className="h-3 bg-slate-200" />
              <div
                className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(actualProgress)}`}
                style={{ width: `${actualProgress}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 bg-slate-50 px-2 py-1 rounded-full inline-block">
              📚 {completedModules} of {course.modules.length} modules completed
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2 text-slate-700">🎯 Skills</p>
            <div className="flex flex-wrap gap-1">
              {course.skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className={`text-xs transition-colors hover:scale-105 ${
                    index % 4 === 0
                      ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      : index % 4 === 1
                      ? 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                      : index % 4 === 2
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {course.completionDate && (
            <div className="flex items-center text-sm text-emerald-600 bg-emerald-50 p-2 rounded-lg">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">🎉 Completed on {new Date(course.completionDate).toLocaleDateString()}</span>
            </div>
          )}

          {canEmbed && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setShowEmbedModal(true);
              }}
              className={`w-full transition-all duration-300 text-sm sm:text-base ${
                course.embedded
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-teal-500 to-slate-600 hover:from-teal-600 hover:to-slate-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {course.embedded ? 'Already Embedded' : 'Embed to Resume'}
            </Button>
          )}
        </CardContent>
      </Card>

      <EmbedModal course={course} open={showEmbedModal} onOpenChange={setShowEmbedModal} />
      <CourseDetailModal course={course} open={showDetailModal} onOpenChange={setShowDetailModal} />
    </>
  );
}
