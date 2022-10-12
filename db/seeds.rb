puts "Seeding Teachers"
#Created Ms. Sissler in postman
t1 = Teacher.create!(username: "QSissler", password: "quinn1", name: "Ms. Sissler", room_number: 22)
t2 = Teacher.create!(username: "ALarison", password: "andrea1", name: "Mrs. Larison", room_number: 24)
t3 = Teacher.create!(username: "KSmith", password: "kristina1", name: "Mrs. Smith", room_number: 26)
puts "Seeding Teachers done"

puts "Seeding Classes"
c1 = Cohort.create!(grade: "1", subject: "Elementary Ed", year: "2021-2022", teacher_id: t1.id)
c2 = Cohort.create!(grade: "1", subject: "Elementary Ed", year: "2020-2021", teacher_id: t1.id)
c3 = Cohort.create!(grade: "2", subject: "Elementary Ed", year: "2021-2022", teacher_id: t2.id)
c4 = Cohort.create!(grade: "1", subject: "Elementary Ed", year: "2021-2022", teacher_id: t3.id)

puts "Seeding Classes done"



puts "Seeding Students"
s1 = Student.create!(name: "Jabari Chandler ", avatar: "", parent_name: "Jen Chandler", parent_number: "123-456-7890", teacher_id: t1.id, cohort_id: c1.id)
s2 = Student.create!(name: "Samantha Garcia", avatar: "", parent_name: "Rose Garcia", parent_number: "457-283-8729", teacher_id: t1.id, cohort_id: c1.id)
s3 = Student.create!(name: "Yohan Ha", avatar: "", parent_name: "Dave Ha", parent_number: "729-378-3847", teacher_id: t1.id, cohort_id: c1.id)
s4 = Student.create!(name: "Vielka Hernandez", avatar: "", parent_name: "Grace Hernandez", parent_number: "394-372-2837", teacher_id: t1.id, cohort_id: c1.id)
s5 = Student.create!(name: "Saniyah Howell", avatar: "", parent_name: "Beth Howell", parent_number: "837-392-9272", teacher_id: t1.id, cohort_id: c1.id)

s6 = Student.create!(name: "Dulce Jimenez-Sarceno", avatar: "", parent_name: "Dan Jimenez-Sarceno", parent_number: "839-384-2849", teacher_id: t1.id, cohort_id: c2.id)
s7 = Student.create!(name: "Alexi Mejia Melara", avatar: "", parent_name: "Joseph Melara", parent_number: "393-827-3983", teacher_id: t1.id, cohort_id: c2.id)
s8 = Student.create!(name: "Joseph Melgar", avatar: "", parent_name: "Joanna Melgar", parent_number: "384-378-3847", teacher_id: t1.id, cohort_id: c2.id)
s9 = Student.create!(name: "Daniel Murillo", avatar: "", parent_name: "Nancy Murillo", parent_number: "384-394-2937", teacher_id: t1.id, cohort_id: c2.id)
s10 = Student.create!(name: "Ashley Ordonez", avatar: "", parent_name: "Sandy Ordonez", parent_number: "294-284-3947", teacher_id: t1.id, cohort_id: c2.id)

s12 = Student.create!(name: "Juan Ribon Bazan", avatar: "", parent_name: "Michael Bazan", parent_number: "383-284-2983", teacher_id: t2.id, cohort_id: c3.id)
s13 = Student.create!(name: "Gabriela Rodriguez", avatar: "", parent_name: "Jenn Rodriguez", parent_number: "293-394-3847", teacher_id: t2.id, cohort_id: c3.id)
puts "Seeding Students done"

puts "Seeding Notes"

n1 = Note.create!(student_id: s1.id, parent_contact: false, note: "He did a nice job today", behavior_level: 1)
n2 = Note.create!(student_id: s1.id, parent_contact: true, note: "Stole from his cohortmate", behavior_level: 3)
n3 = Note.create!(student_id: s2.id, parent_contact: false, note: "Pushed her cohortmate at recess", behavior_level: 2)

puts "Seeding Notes done"
puts "All seeding complete"
