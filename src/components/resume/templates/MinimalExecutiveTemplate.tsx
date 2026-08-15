import React from 'react';
import { ResumeData } from '../../../types';

interface TemplateProps {
  data: ResumeData;
}

export const MinimalExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, skills, experience, projects, education, certifications } = data;

  return (
    <div className="w-full bg-white text-zinc-900 font-serif p-8 sm:p-12 shadow-sm print:p-0 print:shadow-none min-h-[1050px] text-xs leading-relaxed">
      {/* Header */}
      <div className="text-center pb-5 mb-5 border-b-2 border-zinc-800">
        <h1 className="text-3xl font-normal tracking-wider uppercase text-zinc-900 mb-1 font-serif">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-xs font-sans tracking-widest uppercase text-zinc-600 font-semibold mb-3">
          {personalInfo.headline || 'Executive Technology Leader & Engineer'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-sans text-zinc-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.github && <span>• {personalInfo.github.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.website && <span>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-zinc-800 text-[12px] leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            Areas of Technical Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[11.5px] font-sans">
            {skills.map((group, idx) => (
              <div key={idx} className="flex">
                <span className="font-bold text-zinc-900 w-36 shrink-0">{group.category}:</span>
                <span className="text-zinc-700">{group.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-3">
            Professional Experience & Leadership
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline text-xs font-bold text-zinc-900">
                  <span className="text-sm font-serif">
                    {exp.company} <span className="font-normal font-sans text-xs text-zinc-600">— {exp.role}</span>
                  </span>
                  <span className="font-sans text-[11px] text-zinc-600 font-normal">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate} | {exp.location}
                  </span>
                </div>

                <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-[11.5px] font-sans text-zinc-800">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="leading-normal">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-3">
            Key Architecture & Engineering Projects
          </h2>
          <div className="space-y-3.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline text-xs font-bold text-zinc-900 font-serif">
                  <span>
                    {proj.title}
                    {proj.subtitle && <span className="font-normal font-sans text-xs text-zinc-600"> ({proj.subtitle})</span>}
                  </span>
                  <span className="font-sans text-[10.5px] font-mono text-zinc-600">
                    {proj.techStack.slice(0, 4).join(' • ')}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-[11.5px] font-sans text-zinc-800">
                  {proj.bullets.map((b, idx) => (
                    <li key={idx} className="leading-normal">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certs in columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2 font-sans text-[11.5px]">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-zinc-900">{edu.institution}</div>
                  <div className="text-zinc-700">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-[10px] text-zinc-500">{edu.startDate} – {edu.endDate} {edu.gpa && `• GPA ${edu.gpa}`}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
              Credentials
            </h2>
            <div className="space-y-1.5 font-sans text-[11.5px]">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-semibold text-zinc-900">{cert.name}</div>
                  <div className="text-[10px] text-zinc-500">{cert.issuer} • {cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
