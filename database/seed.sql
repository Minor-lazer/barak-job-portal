-- Seed data for Barak Job Portal
-- Run this after creating the schema to add sample jobs

-- Clear existing jobs (optional - comment out if you want to keep existing data)
-- DELETE FROM jobs;

-- Insert sample jobs
INSERT INTO jobs (title, company, location, type, deadline, description, requirements, salary, experience, application_process, contact_info)
VALUES
(
  'Primary School Teacher',
  'Barak Valley Education Department',
  'Silchar',
  'government',
  NOW() + INTERVAL '30 days',
  'We are looking for a dedicated Primary School Teacher to join our team. The ideal candidate should have a passion for teaching and working with young children. You will be responsible for creating lesson plans, conducting classes, and evaluating student progress.',
  ARRAY[
    'Bachelor''s degree in Education or related field',
    'B.Ed. degree is mandatory',
    'Minimum 2 years of teaching experience',
    'Good communication skills',
    'Patience and understanding with children'
  ],
  '₹25,000 - ₹35,000 per month',
  '2-5 years',
  'Interested candidates should submit their resume, educational certificates, and a cover letter to the Education Department office in Silchar. Applications can also be submitted online through the official government portal.',
  'Email: education@barakvalley.gov.in\nPhone: +91 XXX XXX XXXX\nOffice: Education Department, Silchar'
),
(
  'Software Developer',
  'Tech Solutions Pvt. Ltd.',
  'Karimganj',
  'private',
  NOW() + INTERVAL '15 days',
  'Join our dynamic team as a Software Developer. You will be responsible for developing and maintaining web applications, working with modern technologies, and collaborating with cross-functional teams to deliver high-quality software solutions.',
  ARRAY[
    'Bachelor''s degree in Computer Science or related field',
    'Proficiency in JavaScript, React, and Node.js',
    'Experience with databases (SQL/NoSQL)',
    'Strong problem-solving skills',
    'Good team collaboration abilities'
  ],
  '₹40,000 - ₹60,000 per month',
  '1-3 years',
  'Please send your resume and portfolio to careers@techsolutions.com. Include links to your GitHub profile and any relevant projects.',
  'Email: careers@techsolutions.com\nPhone: +91 XXX XXX XXXX'
),
(
  'Accountant',
  'Barak Valley Commerce Association',
  'Hailakandi',
  'private',
  NULL,
  'We are seeking an experienced Accountant to manage our financial records, prepare reports, and ensure compliance with accounting standards. The ideal candidate should be detail-oriented and have strong analytical skills.',
  ARRAY[
    'Bachelor''s degree in Commerce or Accounting',
    'CA/CMA qualification preferred',
    'Proficiency in Tally or similar accounting software',
    'Minimum 3 years of experience',
    'Knowledge of tax regulations'
  ],
  '₹30,000 - ₹45,000 per month',
  '3-5 years',
  'Submit your resume along with copies of educational and professional certificates to the office address or via email.',
  'Email: hr@bvcommerce.org\nAddress: Commerce Association Building, Hailakandi'
);
