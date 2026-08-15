import React from 'react';
import { ResumeData } from '../../../types';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, skills, experience, projects, education, certifications } = data;

  return (
    <div className="w-full bg-white text-zinc-900 font-sans p-8 sm:p-10 shadow-sm print:p-0 print:shadow-none min-h-[1050px] text-xs leading-relaxed">
      {/* Top Banner Accent Header */}
      <div className="border-l-4 border-indigo-600 pl-4 py-1 mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-sm font-semibold text-indigo-600 font-mono tracking-tight mt-0.5">
          {personalInfo.headline || 'Senior Software Engineer'}
        </p>

        {/* Contact info badges */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-[11px] text-zinc-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-indigo-500" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-indigo-500" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-indigo-500" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3 text-indigo-500" /> {personalInfo.github.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-indigo-500" /> {personalInfo.linkedin.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-indigo-500" /> {personalInfo.website.replace(/^https?:\/\//, '')}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-5 bg-zinc-50 border border-zinc-200/80 rounded-lg p-3 text-zinc-700 text-[11.5px] leading-relaxed">
          {personalInfo.summary}
        </div>
      )}

      {/* Main Grid: Experience & Projects (Left) vs Skills & Education (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Experience & Projects */}
        <div className="md:col-span-2 space-y-5">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 pb-1 mb-3 border-b border-indigo-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2 border-zinc-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-zinc-900 text-xs">{exp.role}</div>
                        <div className="text-[11px] font-semibold text-zinc-600">{exp.company} • <span className="font-normal text-zinc-500">{exp.location}</span></div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>

                    {exp.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 my-1.5">
                        {exp.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="text-[9.5px] px-1.5 py-0.2 rounded-sm bg-indigo-50 text-indigo-700 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <ul className="list-disc list-outside ml-3.5 space-y-1 mt-1 text-[11.5px] text-zinc-700">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="leading-snug">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 pb-1 mb-3 border-b border-indigo-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
                Featured Projects
              </h2>
              <div className="space-y-3.5">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-2.5 rounded-lg border border-zinc-200 bg-zinc-50/40">
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-zinc-900 text-xs flex items-center gap-1.5">
                        {proj.title}
                        {proj.liveUrl && <ExternalLink className="w-3 h-3 text-indigo-500 print:hidden" />}
                      </div>
                    </div>
                    {proj.subtitle && <div className="text-[10.5px] text-zinc-500 mb-1">{proj.subtitle}</div>}

                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {proj.techStack.map((t, idx) => (
                        <span key={idx} className="text-[9.5px] px-1.5 py-0.2 rounded bg-zinc-200/70 text-zinc-800 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>

                    <ul className="list-disc list-outside ml-3.5 space-y-1 text-[11.5px] text-zinc-700">
                      {proj.bullets.map((b, idx) => (
                        <li key={idx} className="leading-snug">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right 1 Col: Skills, Education & Certifications */}
        <div className="space-y-5">
          {/* Technical Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 pb-1 mb-2.5 border-b border-zinc-200">
                Skills Taxonomy
              </h2>
              <div className="space-y-3">
                {skills.map((group, idx) => (
                  <div key={idx}>
                    <div className="text-[11px] font-bold text-indigo-900 mb-1">{group.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {group.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 font-medium"
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

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 pb-1 mb-2.5 border-b border-zinc-200">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11px]">
                    <div className="font-bold text-zinc-900">{edu.institution}</div>
                    <div className="text-zinc-700">{edu.degree} in {edu.fieldOfStudy}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{edu.startDate} – {edu.endDate} {edu.gpa && `• GPA ${edu.gpa}`}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 pb-1 mb-2.5 border-b border-zinc-200">
                Certifications
              </h2>
              <div className="space-y-1.5 text-[11px]">
                {certifications.map((cert) => (
                  <div key={cert.id} className="p-1.5 rounded bg-zinc-50 border border-zinc-200/60">
                    <div className="font-semibold text-zinc-900">{cert.name}</div>
                    <div className="text-[10px] text-zinc-500">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
