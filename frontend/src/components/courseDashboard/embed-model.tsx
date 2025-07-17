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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-purple-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-gray-800">
            <FileText className="h-5 w-5 text-purple-600" />
            Embed Course to Resume
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            ✨ This will add your course progress and achievements to the "Courses" section of your resume.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">{course.title}</h4>
              {course.embedded && <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">✓ Already Embedded</Badge>}
            </div>
            <p className="text-sm text-gray-700 mb-3 bg-white px-3 py-2 rounded-lg">
              📊 Progress: <span className="font-bold text-blue-600">{actualProgress}%</span>
              <span className="text-gray-500">
                {' '}
                ({completedModules}/{course.modules.length} modules)
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, index) => (
                <span
                  key={skill}
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    index % 3 === 0 ? 'bg-purple-100 text-purple-800' : index % 3 === 1 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
            <h5 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              What will be added to your resume:
            </h5>
            <ul className="text-sm text-orange-800 space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                Course title and completion percentage
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                Skills learned from this course
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                Module completion status
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                Completion date (if finished)
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-300">
            Cancel
          </Button>
          <Button
            onClick={handleEmbed}
            disabled={isEmbedding}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
          >
            {isEmbedding ? '✨ Embedding...' : course.embedded ? '🔄 Update Resume' : '📄 Embed to Resume'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
