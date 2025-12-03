import { ResumeData } from '../types';

export const resumeData: ResumeData = {
  name: "VO NGUYEN HUY",
  title: "Senior IT Infrastructure & Security Specialist",
  contact: {
    location: "Tam Ky, Quang Nam, Vietnam",
    phone: "(+84) 796 688 660",
    email: "huy.nguyen3009@gmail.com"
  },
  summary: "Result-oriented Senior IT Specialist with over 7 years of experience in Banking IT Infrastructure. Proven track record of delivering consistent high-availability for critical payment systems and infrastructure. Extensive experience in Audit & Compliance leadership, successfully managing inspections from the State Bank of Vietnam (SBV) and Big 4 firms (PwC, Deloitte, E&Y) with outstanding results. Expert in aligning local IT operations with global security standards and regulatory requirements.",
  experience: [
    {
      company: "CATHAY UNITED BANK (Vietnam)",
      role: "Senior IT Infrastructure Staff",
      period: "Aug 2018 – Present",
      achievements: [
        {
          category: "Security, Compliance & Audit Leadership",
          items: [
            "Audit Coordinator: Acting as the primary liaison for all IT audits. Successfully managed inspections including External Audits (PwC, Deloitte, E&Y), SBV On-site Inspections, and HO Internal Audits with consistently excellent results (minor to zero findings).",
            "Regulatory Compliance: Ensure absolute compliance with SBV Circular 09, Decision 35, and Decision 1309. Conduct regular IT Risk Assessments (RCSA), BCM Risk Assessments, and Security Checklists to align local operations with Group Policy.",
            "Incident Management: Establish and execute Incident Response plans. Maintain 24/7 readiness to resolve critical security alerts promptly according to HO policies."
          ]
        },
        {
          category: "Infrastructure Operations & System Administration",
          items: [
            "High Availability: Maintain stability for critical infrastructure (Servers, Network, Power) and payment systems (CITAD, VCB Money, OIC, LPG). Achievement: Consistently delivered high system uptime and ensured RTO < 4 hours for Disaster Recovery (DR) sites.",
            "SWIFT Administrator: Act as administrator to manage user roles, reporting, and KYC compliance for SWIFT systems.",
            "Core Systems: Administer local E-invoice and payment gateway systems, managing vendor SLAs to ensure timely updates and error-free operations.",
            "IT Support Services: Deliver high-quality helpdesk support with a First Contact Resolution rate of >80% and consistent User Satisfaction ratings >90%."
          ]
        },
        {
          category: "Key Projects & Strategic Initiatives",
          items: [
            "Infrastructure Relocation: Coordinated the migration of HCMC servers to the IDC (Internet Data Center) ensuring zero business impact. Led the technical setup for Hanoi Office Relocation (Oct 2025) and Wi-Fi Upgrade Project (2024), completing tasks within tight deadlines without service interruption.",
            "Digital Transformation: Successfully deployed the CITAD Auto Approval Project (Phase 1 & 2 Go-live in 2024).",
            "BCP Enhancement: Implemented NAPAS DR Site build-up in Quang Nam office to enhance business continuity.",
            "System Upgrades: Upgraded branch-wide endpoints to Windows 11 and integrated Retail Banking systems into the monitoring scope."
          ]
        }
      ]
    },
    {
      company: "MONSTARLAB VIETNAM",
      role: "System Administrator",
      period: "Apr 2017 – July 2018",
      achievements: [
        {
          items: [
            "Managed corporate network infrastructure and IT assets, ensuring 100% internet availability.",
            "Deployed virtualization solutions using VMware ESXi/vCenter and maintained Linux-based servers (Ubuntu/Nginx).",
            "Supported DevOps workflows by administering Gitlab, Redmine, and automating backup processes via Shell scripting."
          ]
        }
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Information Systems",
      school: "Duy Tan University",
      period: "2012 – 2016"
    }
  ],
  certifications: [
    {
      name: "Google IT Support Professional Certificate",
      status: "Completed"
    },
    {
      name: "Cisco Ethical Hacker",
      status: "In Progress (Focus on Offensive Security & Pentest)"
    }
  ],
  competencies: [
    {
      category: "Governance & Regulation",
      skills: "SBV Compliance (Cir 09/QĐ 35), IT Audit Management, Risk Assessment."
    },
    {
      category: "Technical Operations",
      skills: "DR/BCP Planning (RTO/RPO Management), Data Center Operations, SWIFT Admin."
    },
    {
      category: "Systems",
      skills: "Windows Server, Linux, VMware, Core Banking Payment Gateways (CITAD/NAPAS)."
    },
    {
      category: "Soft Skills",
      skills: "Crisis Management, Vendor Management, Cross-border Communication (with Head Office)."
    }
  ]
};