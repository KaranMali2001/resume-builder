'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useResume } from '@/hooks/useResume';
import type { Module } from '@/types';
//@ts-ignore
import html2pdf from 'html2pdf.js';
import { Download, FileText, Mail, MapPin, Phone, Star, Trophy } from 'lucide-react';
export function ResumeSection() {
  const resume = useResume().getResume;
  const downloadPDF = () => {
    const element = document.getElementById('resume-content');
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-teal-600 bg-clip-text text-transparent">Resume Builder</h2>
        <div className="flex gap-3">
          <Button
            onClick={downloadPDF}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-white to-slate-50 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-teal-50 border-b border-slate-200">
          <CardTitle className="text-slate-800">Resume Preview</CardTitle>
          <CardDescription className="text-slate-600">Your professional resume with embedded course progress and achievements</CardDescription>
        </CardHeader>
        <CardContent id="resume-content" className="space-y-6 p-8">
          {/* Personal Info */}
          <div className="text-center bg-gradient-to-r from-slate-50 to-teal-50 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-2 text-slate-800">{resume?.personalInfo.name}</h3>
            <div className="flex flex-wrap justify-center gap-4 text-slate-600">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-teal-500" />
                {resume?.personalInfo.email}
              </div>
              {resume?.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-emerald-500" />
                  {resume?.personalInfo.phone}
                </div>
              )}
              {resume?.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  {resume?.personalInfo.location}
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-gradient-to-r from-slate-200 to-teal-200 h-0.5" />

          {/* Skills */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl">
            <h4 className="font-bold mb-4 text-slate-800 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Skills & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {resume?.skills.map((skill, index) => (
                <Badge
                  key={skill}
                  className={`transition-all hover:scale-105 ${
                    index % 5 === 0
                      ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
                      : index % 5 === 1
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                      : index % 5 === 2
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                      : index % 5 === 3
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                      : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  }`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="bg-gradient-to-r from-emerald-200 to-teal-200 h-0.5" />

          {/* Courses & Achievements Section */}
          {resume?.courses && resume.courses.length > 0 && (
            <div className="bg-gradient-to-r from-teal-50 to-slate-50 p-6 rounded-xl">
              <h4 className="font-bold mb-4 text-slate-800 flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-500" />
                Professional Development & Courses
              </h4>
              <div className="space-y-6">
                {resume.courses.map((course: any, index) => {
                  const courseData = course.courseId;
                  const completedModules = courseData.modules.filter((module: Module) => module.completed).length;
                  const totalModules = courseData.modules.length;
                  const hasAchievements = course.achivements && course.achivements.length > 0;

                  return (
                    <div key={index} className="bg-white p-6 rounded-lg border-l-4 border-l-teal-500 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h5 className="font-semibold text-slate-800 text-lg mb-3">{courseData.title}</h5>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-sm text-slate-600 bg-teal-100 px-3 py-1 rounded-full">
                              Progress: <span className="font-bold text-teal-600">{courseData.progress}%</span>
                            </span>
                            <span className="text-sm text-slate-600 bg-emerald-100 px-3 py-1 rounded-full">
                              Modules:{' '}
                              <span className="font-bold text-emerald-600">
                                {completedModules}/{totalModules}
                              </span>
                            </span>
                            <span
                              className={`text-sm px-3 py-1 rounded-full ${
                                courseData.status === 'active' ? 'text-blue-600 bg-blue-100' : 'text-green-600 bg-green-100'
                              }`}
                            >
                              Status: {courseData.status}
                            </span>
                            {courseData.completionDate && (
                              <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                                Completed: {new Date(courseData.completionDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {courseData.skills.map((skill: string, skillIndex: number) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className={`text-xs ${
                                  skillIndex % 3 === 0
                                    ? 'border-slate-300 text-slate-700 bg-slate-50'
                                    : skillIndex % 3 === 1
                                    ? 'border-teal-300 text-teal-700 bg-teal-50'
                                    : 'border-emerald-300 text-emerald-700 bg-emerald-50'
                                }`}
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {courseData.embedded && (
                          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm">From Course Progress</Badge>
                        )}
                      </div>

                      {/* Achievements for this course */}
                      {hasAchievements && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <h6 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            Key Achievements
                          </h6>
                          <ul className="space-y-2">
                            {course.achivements.map((achievement: string, achievementIndex: number) => (
                              <li
                                key={achievementIndex}
                                className="flex items-start gap-2 text-sm text-slate-700 bg-amber-50 p-3 rounded-lg border-l-4 border-l-amber-400"
                              >
                                <span className="text-amber-500 mt-0.5">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
