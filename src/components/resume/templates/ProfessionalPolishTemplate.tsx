import React from 'react';
import { ResumeData } from '../../../types';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Award, Sparkles, Briefcase, GraduationCap, Code2 } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  accentColor?: string; // 'slate' | 'indigo' | 'emerald' | 'blue' | 'purple'
}

export const ProfessionalPolishTemplate: React.FC<TemplateProps> = ({ data, accentColor = 'slate' }) => {
  const { personalInfo, skills, experience, projects, education, certifications } = data;

  return (
    <div className="w-full bg-white text-zinc-900 font-sans p-8 sm:p-10 shadow-sm print:p-0 print:shadow-none min-h-[1050px] text-xs leading-relaxed selection:bg-slate-200">
      {/* Executive Header Banner */}
      <header className="border-b-2 border-slate-900 pb-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">
                Executive Curriculum Vitae
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                <Sparkles className="w-2.5 h-2.5" /> ATS Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mt-1">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-sm font-semibold text-slate-700 mt-0.5">
              {personalInfo.headline || 'Staff Software Engineer • Distributed Systems & AI'}
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="text-[11px] text-slate-600 space-y-1 sm:text-right shrink-0">
            <div className="flex flex-wrap sm:justify-end items-center gap-x-3 gap-y-1">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-700" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-700" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-700" /> {personalInfo.location}
                </span>
              )}
            </div>

            <div className="flex flex-wrap sm:justify-end items-center gap-x-3 gap-y-1 pt-0.5 text-[10.5px]">
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1 font-medium text-slate-800">
                  <Linkedin className="w-3 h-3 text-blue-700" /> {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1 font-medium text-slate-800">
                  <Github className="w-3 h-3 text-slate-900" /> {personalInfo.github.replace(/^https?:\/\//, '')}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1 font-medium text-slate-800">
                  <Globe className="w-3 h-3 text-emerald-700" /> {personalInfo.website.replace(/^https?:\/\//, '')}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-[11.5px] leading-relaxed">
            <p className="font-normal">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {/* Technical Competencies Matrix */}
      {skills.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-2 border-b border-slate-300 pb-1 mb-2.5">
            <Code2 className="w-3.5 h-3.5 text-slate-800" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Core Technical Competencies
            </h2>
          </div>
          <div className="space-y-1.5 text-[11.5px]">
            {skills.map((cat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 sm:w-36 shrink-0 text-[11px] uppercase tracking-wide">
                  {cat.category}:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-mono text-[10.5px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-2 border-b border-slate-300 pb-1 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-slate-800" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Professional Experience
            </h2>
          </div>

          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="font-extrabold text-slate-950 text-xs">{exp.role}</span>
                    <span className="text-slate-700 font-semibold text-xs ml-1.5">
                      • {exp.company}
                    </span>
                    <span className="text-slate-500 text-[11px] ml-1.5">({exp.location})</span>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded self-start sm:self-auto">
                    {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>

                {exp.techStack.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    <span className="text-[9.5px] font-bold uppercase text-slate-500 tracking-wider">Tech:</span>
                    {exp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <ul className="list-disc list-outside ml-4 space-y-1 text-[11.5px] text-slate-800 leading-normal">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="pl-0.5">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Technical Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-2 border-b border-slate-300 pb-1 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-slate-800" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Key Engineering Projects
            </h2>
          </div>

          <div className="space-y-3.5">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-950 text-xs">{proj.title}</span>
                    {proj.role && (
                      <span className="text-slate-600 text-[11px] italic">({proj.role})</span>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-0.5 text-[10px] text-slate-600 hover:text-slate-900 font-mono underline"
                      >
                        <ExternalLink className="w-2.5 h-2.5" /> Live Demo
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-0.5 text-[10px] text-slate-600 hover:text-slate-900 font-mono underline"
                      >
                        <Github className="w-2.5 h-2.5" /> Source
                      </a>
                    )}
                  </div>
                </div>

                {proj.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11.5px] text-slate-800 leading-normal">
                  {proj.bullets.map((b, idx) => (
                    <li key={idx} className="pl-0.5">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications Grid */}
      {(education.length > 0 || certifications.length > 0) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1 border-t border-slate-200">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 border-b border-slate-300 pb-1 mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-slate-800" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Education
                </h2>
              </div>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11.5px]">
                    <div className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</div>
                    <div className="text-slate-700 text-[11px]">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</div>
                    <div className="text-[10.5px] text-slate-500 font-mono">
                      {edu.startDate} – {edu.endDate} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <div className="flex items-center gap-2 border-b border-slate-300 pb-1 mb-2">
                <Award className="w-3.5 h-3.5 text-slate-800" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Certifications & Honors
                </h2>
              </div>
              <div className="space-y-1.5 text-[11.5px]">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-slate-900">{cert.name}</span>
                      <span className="text-slate-600 block text-[10.5px]">{cert.issuer}</span>
                    </div>
                    <span className="text-[10.5px] font-mono text-slate-500 shrink-0">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
