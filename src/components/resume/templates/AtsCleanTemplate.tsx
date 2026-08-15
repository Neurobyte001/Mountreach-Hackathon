import React from 'react';
import { ResumeData } from '../../../types';
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const AtsCleanTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, skills, experience, projects, education, certifications } = data;

  return (
    <div className="w-full bg-white text-zinc-900 font-sans p-8 sm:p-12 shadow-sm print:p-0 print:shadow-none min-h-[1050px] text-[13px] leading-relaxed selection:bg-zinc-200">
      {/* Header */}
      <div className="text-center border-b border-zinc-300 pb-4 mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 uppercase mb-1">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-sm font-semibold text-zinc-700 tracking-wide mb-2.5">
          {personalInfo.headline || 'Software Engineer'}
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-zinc-400 print:hidden" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-zinc-400 print:hidden" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-400 print:hidden" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-zinc-400 print:hidden" /> {personalInfo.website.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3 text-zinc-400 print:hidden" /> {personalInfo.github.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-zinc-400 print:hidden" /> {personalInfo.linkedin.replace(/^https?:\/\//, '')}
            </span>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-zinc-700 text-xs leading-normal text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2">
            Technical Skills
          </h2>
          <div className="space-y-1.5 text-xs">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="flex items-start">
                <span className="font-bold text-zinc-900 w-44 shrink-0">{skillGroup.category}:</span>
                <span className="text-zinc-700">{skillGroup.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between font-bold text-xs text-zinc-900">
                  <span>
                    {exp.role} <span className="font-normal text-zinc-600">| {exp.company}</span>
                  </span>
                  <span className="text-zinc-600 font-medium">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500 italic mb-1.5">{exp.location}</div>

                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-700">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-snug">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3">
            Featured Projects & Open-Source
          </h2>
          <div className="space-y-3.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between font-bold text-xs text-zinc-900">
                  <span>
                    {proj.title}
                    {proj.subtitle && <span className="font-normal text-zinc-600"> — {proj.subtitle}</span>}
                  </span>
                  {proj.techStack.length > 0 && (
                    <span className="text-[11px] font-mono font-normal text-zinc-600">
                      [{proj.techStack.slice(0, 4).join(', ')}]
                    </span>
                  )}
                </div>

                <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs text-zinc-700">
                  {proj.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-snug">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-zinc-900">
                    {edu.institution} <span className="font-normal text-zinc-600">— {edu.location}</span>
                  </div>
                  <div className="text-zinc-700">
                    {edu.degree} in {edu.fieldOfStudy} {edu.gpa && <span className="font-medium">({edu.gpa})</span>}
                  </div>
                </div>
                <div className="text-zinc-600 font-medium">
                  {edu.startDate} – {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2">
            Certifications & Specializations
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-700">
            {certifications.map((cert) => (
              <span key={cert.id}>
                • <strong className="font-semibold text-zinc-900">{cert.name}</strong> ({cert.issuer}, {cert.date})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
