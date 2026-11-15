"use client";

import { useState } from "react";

const education = [
  {
    id: "creative-computing",
    tab: "Creative Computing",
    qualification: "BSc (Hons) Creative Computing",
    institution: "Blackpool & The Fylde College",
    awardingBody: "Lancaster University",
    dates: "2025 – 2028",
    status: "In Progress",
    achievement: "Year 1: Distinction",
    logo: "/images/education/bfc-logo.png",
    details: [],
  },
  {
    id: "100devs",
    tab: "100Devs",
    qualification: "Full-Stack Software Engineering",
    institution: "100Devs",
    awardingBody: "",
    dates: "2021 – 2023",
    status: "Completed Study",
    achievement: "",
    logo: "/images/education/100devs-logo.png",
    details: [
      "Approximately 18 months of independent study in full-stack web development, including practical projects, coding challenges and remote collaboration with developers.",
    ],
  },
];

export default function EducationContent() {
  const [selectedId, setSelectedId] = useState(education[0].id);

  const selected =
    education.find((item) => item.id === selectedId) ?? education[0];

  return (
    <div className="cv-education">
      <div
        className="cv-education-tabs"
        role="tablist"
        aria-label="Qualifications"
      >
        {education.map((item) => (
          <button
            key={item.id}
            id={`education-tab-${item.id}`}
            type="button"
            role="tab"
            className={`cv-education-tab ${
              selectedId === item.id ? "is-active" : ""
            }`}
            aria-selected={selectedId === item.id}
            aria-controls="education-tab-panel"
            onClick={() => setSelectedId(item.id)}
          >
            {item.tab}
          </button>
        ))}
      </div>

      <section
        id="education-tab-panel"
        className="cv-education-panel"
        role="tabpanel"
        aria-labelledby={`education-tab-${selected.id}`}
      >
        <div className="cv-education-identity">
          <img
            src={selected.logo}
            alt={`${selected.institution} logo`}
            className={`cv-education-logo ${
              selected.id === "creative-computing" ? "is-bfc" : ""
            }`}
          />

          <div>
            <h3>{selected.qualification}</h3>
            <p>{selected.institution}</p>
          </div>
        </div>

        <fieldset className="cv-education-group">
          <legend>Qualification Information</legend>

          <dl className="cv-education-properties">
            <dt>Qualification:</dt>
            <dd>{selected.qualification}</dd>

            <dt>Institution:</dt>
            <dd>{selected.institution}</dd>

            {selected.awardingBody && (
              <>
                <dt>Awarding University:</dt>
                <dd>{selected.awardingBody}</dd>
              </>
            )}

            <dt>Study Period:</dt>
            <dd>{selected.dates}</dd>

            <dt>Status:</dt>
            <dd>{selected.status}</dd>
          </dl>
        </fieldset>

        {selected.achievement && (
          <fieldset className="cv-education-group">
            <legend>Academic Achievement</legend>

            <div className="cv-education-achievement">
              {selected.achievement}
            </div>
          </fieldset>
        )}

        {selected.details.length > 0 && (
          <fieldset className="cv-education-group">
            <legend>Study Overview</legend>

            <ul className="cv-education-details">
              {selected.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </fieldset>
        )}
      </section>
    </div>
  );
}
