"use client";

import { useState } from "react";

const employment = [
  {
    id: "nero-pepe",
    role: "Founder | Product Developer",
    organisation: "Altaleco Ltd (Nero Pepe)",
    dates: "May 2026 – Present",
    responsibilities: [
      "Independently developed Nero Pepe, a multi-tenant hospitality SaaS platform using Next.js, React, TypeScript, Supabase and PostgreSQL",
      "Architected relational databases, authentication, role-based access controls and tenant isolation to support secure, scalable operations",
      "Built integrated restaurant management functionality covering website management, reservations, operational dashboards and administrative systems",
      "Managed the end-to-end product lifecycle from market research and UI/UX design to pilot testing and commercial launch preparation, supported by a test suite with over 7,600 passing automated tests",
    ],
  },
  {
    id: "vectario",
    role: "Founder | Product Design & Ecommerce",
    organisation: "Vectario",
    dates: "April 2024 – Present",
    responsibilities: [
      "Founded and managed a multi-channel e-commerce business across WooCommerce, Etsy and eBay, combining website development, digital product design and marketplace operations",
      "Generated 5,000+ customer orders through original product design, SEO, digital marketing and data-driven commercial strategies",
      "Developed and managed end-to-end operational workflows, including production, inventory, order fulfilment and customer service",
    ],
  },
  {
    id: "transport",
    role: "Self-Employed | Human Logistics",
    organisation: "CCABS",
    dates: "March 2016 – March 2026",
    responsibilities: [
      "Managed independent transport operations including scheduling, route planning, vehicle management and time-sensitive logistics",
      "Provided contracted NHS patient transport and time-critical transportation of blood products, medical specimens and medication between healthcare locations throughout the UK",
    ],
  },
  {
    id: "lettings",
    role: "Lettings Manager | Commercial & Residential Property",
    organisation: "Multiple agencies",
    dates: "July 2004 – March 2016",
    responsibilities: [
      "Progressed from administration to Lettings Manager over a 12-year career across commercial and residential property",
      "Managed property valuations, marketing, lettings, energy surveys, inspections and maintenance, coordinating contractors and overseeing operations",
      "Recruited, trained and supported staff while managing landlord and tenant relationships and day-to-day commercial requirements",
    ],
  },
];

export default function WorkHistoryContent() {
  const [selectedId, setSelectedId] = useState(employment[0].id);

  const selected =
    employment.find((job) => job.id === selectedId) ?? employment[0];

  return (
    <div className="cv-history">
      <div className="cv-history-table-wrap">
        <table className="cv-history-table">
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col">Organisation</th>
              <th scope="col">Dates</th>
            </tr>
          </thead>

          <tbody>
            {employment.map((job) => (
              <tr
                key={job.id}
                className={selectedId === job.id ? "is-selected" : ""}
                onClick={() => setSelectedId(job.id)}
              >
                <th scope="row">
                  <button
                    type="button"
                    className="cv-history-select"
                    aria-pressed={selectedId === job.id}
                    aria-controls="employment-details"
                    onClick={() => setSelectedId(job.id)}
                  >
                    {job.role}
                  </button>
                </th>

                <td>{job.organisation}</td>
                <td>{job.dates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <fieldset id="employment-details" className="cv-history-group">
        <legend>Role details</legend>

        <div className="cv-history-panel">
          <h3>{selected.role}</h3>

          <p className="cv-history-organisation">{selected.organisation}</p>

          <p className="cv-history-dates">{selected.dates}</p>

          <ul className="cv-history-responsibilities">
            {selected.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </div>
      </fieldset>

      <div className="cv-history-summary">
        {employment.length} roles | Selected: {selected.organisation}
      </div>
    </div>
  );
}
