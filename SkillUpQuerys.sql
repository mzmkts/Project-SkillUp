select * from users;
select * from courses;
select * from course_reviews;

-- Это обновит счетчик id до максимального значения + 1
SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 1) FROM users));
SELECT setval('courses_id_seq', (SELECT COALESCE(MAX(id), 1) FROM courses));
SELECT setval('course_reviews_id_seq', (SELECT COALESCE(MAX(id), 1) FROM course_reviews));

-- чтобы сбросить счетчик id
SELECT setval('users_id_seq', 1, false); 
SELECT setval('courses_id_seq', 1, false);
SELECT setval('course_reviews_id_seq', 1, false);

delete from users;
delete from course_reviews;