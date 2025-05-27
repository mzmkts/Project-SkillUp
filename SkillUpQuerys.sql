select * from users;
select * from courses;
select * from course_reviews;
select * from enroll_course;

-- Это обновит счетчик id до максимального значения + 1
SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 1) FROM users));
SELECT setval('courses_id_seq', (SELECT COALESCE(MAX(id), 1) FROM courses));
SELECT setval('course_reviews_id_seq', (SELECT COALESCE(MAX(id), 1) FROM course_reviews));
SELECT setval('enroll_course_id_seq', (SELECT COALESCE(MAX(id), 1) FROM enroll_course));
-- чтобы сбросить счетчик id
SELECT setval('users_id_seq', 1, false); 
SELECT setval('courses_id_seq', 1, false);
SELECT setval('course_reviews_id_seq', 1, false);
SELECT setval('enroll_course_id_seq', 1, false);
-- удаление
delete from users;
delete from courses;
delete from course_reviews;
delete from enroll_course;
-- добавление курсов
INSERT INTO public.courses (title, description, image, category, price, "createdAt", "updatedAt") VALUES
('JavaScript for Beginners', 'Basics of JavaScript, syntax, DOM manipulation, and events.', 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg', 'programming', 19.99, NOW(), NOW()),
('React: Complete Guide', 'Building SPAs with React, hooks, routing, and state management.', 'https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg', 'programming', 39.99, NOW(), NOW()),
('Python for Data Analysis', 'Learn Python focusing on Pandas, NumPy, and Matplotlib libraries.', 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Python.svg', 'programming', 29.99, NOW(), NOW()),
('Web Design for Beginners', 'Basics of UI design, working with color theory and typography.', 'https://www.muratkesik.com/upload/urfawebtasarim.png', 'design', 25.00, NOW(), NOW()),
('UX/UI Design Fundamentals', 'Methods and tools for improving user experience and interface design.', 'https://248006.selcdn.ru/main/iblock/b5d/b5d5c4d04c6931360cdc5e97c1e722c1/816e5c265a78b61d7018b3b07cbeddb9.jpg', 'design', 35.00, NOW(), NOW()),
('Business Analysis Basics', 'How to gather and analyze requirements for IT projects.', 'https://thumbs.dreamstime.com/b/business-analyst-shows-charts-graphs-presentation-vector-illustration-87484237.jpg', 'business', 22.50, NOW(), NOW()),
('IT Project Management', 'Introduction to Agile, Scrum, Kanban, and team management.', 'https://website-assets-fs.freshworks.com/attachments/ckbsryqms00q2heg19ekuza1r-it-product-management0.one-half.png', 'business', 40.00, NOW(), NOW()),
('Node.js Backend Development', 'Building server-side applications using Node.js and Express.', 'https://miro.medium.com/v2/resize:fit:1400/0*GAeU_1Z3ouJ3Mkrf.png', 'programming', 30.00, NOW(), NOW()),
('Introduction to Cybersecurity', 'Basics of information security and data protection.', 'https://avatars.mds.yandex.net/i?id=bf8551f403ee55956d3feaec1309308f67ca6c84-9148914-images-thumbs&n=13', 'other', 28.00, NOW(), NOW()),
('Docker and Containerization', 'Managing containers for development and deployment.', 'https://avatars.mds.yandex.net/i?id=7945104e35555172f87fbf2d1e7a5cf3_l-12925719-images-thumbs&n=13', 'programming', 27.50, NOW(), NOW()),
('Advanced CSS Techniques', 'Responsive design, animations, and Flexbox/Grid layouts.', 'https://gas-kvas.com/uploads/posts/2023-02/1675463198_gas-kvas-com-p-fonovii-risunok-v-css3-3.png', 'design', 23.00, NOW(), NOW()),
('Machine Learning Basics', 'Introduction to ML concepts, algorithms, and practical applications.', 'https://avatars.mds.yandex.net/i?id=83171b7649f242b3ae36acb4d13256a5_l-5231675-images-thumbs&n=13', 'programming', 45.00, NOW(), NOW()),
('SQL for Data Management', 'Learn how to manage and query databases using SQL.', 'https://avatars.mds.yandex.net/i?id=e8727f5c5f66a94a6b1a19c15b2aa817_l-5234939-images-thumbs&n=13', 'programming', 20.00, NOW(), NOW()),
('Cloud Computing Essentials', 'Overview of cloud services, AWS, Azure, and Google Cloud.', 'https://teklink.com/wp-content/uploads/2021/02/Service-Offerings-5.jpg', 'other', 38.00, NOW(), NOW()),
('Mobile App Development with Flutter', 'Building cross-platform mobile apps using Flutter and Dart.', 'https://cdn-images-1.medium.com/v2/resize:fit:1200/1*O3_Sy-ySeFv8jU8RugEQFw.jpeg', 'programming', 33.00, NOW(), NOW());
