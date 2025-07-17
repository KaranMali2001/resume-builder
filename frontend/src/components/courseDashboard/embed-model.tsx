'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCourses } from '@/hooks/useCourses';
import type { Course } from '@/types';
import { calculateProgress } from '@/utils/courseUtils';
import { FileText, Sparkles } from 'lucide-react';

interface EmbedModalProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmbedModal({ course, open, onOpenChange }: EmbedModalProps) {
  const { embedCourse, isEmbedding } = useCourses();

  const handleEmbed = () => {
    embedCourse(course.id);
    onOpenChange(false);
  };

  const actualProgress = calculateProgress(course.modules);
  const completedModules = course.modules.filter((m) => m.completed).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-w-[95vw] w-full mx-auto bg-gradient-to-br from-white to-purple-50 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl text-gray-800">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
            <span className="truncate">Embed Course to Resume</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            ✨ This will add your course progress and achievements to the "Courses" section of your resume.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-xl border border-blue-200">
            <div className="flex items-start justify-between mb-3 gap-2">
              <h4 className="font-semibold text-gray-800 text-sm sm:text-base flex-1 min-w-0">
                <span className="line-clamp-2">{course.title}</span>
              </h4>
              {course.embedded && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs flex-shrink-0">✓ Embedded</Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-700 mb-3 bg-white px-2 sm:px-3 py-2 rounded-lg">
              📊 Progress: <span className="font-bold text-blue-600">{actualProgress}%</span>
              <span className="text-gray-500">
                {' '}
                ({completedModules}/{course.modules.length} modules)
              </span>
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {course.skills.map((skill, index) => (
                <span
                  key={skill}
                  className={`text-xs px-2 sm:px-3 py-1 rounded-full font-medium ${
                    index % 3 === 0 ? 'bg-purple-100 text-purple-800' : index % 3 === 1 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 sm:p-4 rounded-xl border border-yellow-200">
            <h5 className="font-semibold text-orange-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              What will be added to your resume:
            </h5>
            <ul className="text-xs sm:text-sm text-orange-800 space-y-1">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-1 flex-shrink-0"></span>
                <span>Course title and completion percentage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-1 flex-shrink-0"></span>
                <span>Skills learned from this course</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-1 flex-shrink-0"></span>
                <span>Module completion status</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-1 flex-shrink-0"></span>
                <span>Completion date (if finished)</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-300 w-full sm:w-auto order-2 sm:order-1">
            Cancel
          </Button>
          <Button
            onClick={handleEmbed}
            disabled={isEmbedding}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg w-full sm:w-auto order-1 sm:order-2 text-sm sm:text-base"
          >
            {isEmbedding ? '✨ Embedding...' : course.embedded ? '🔄 Update Resume' : '📄 Embed to Resume'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
