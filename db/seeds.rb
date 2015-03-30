# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.delete_all
Question.delete_all
Answer.delete_all
Vote.delete_all
Comment.delete_all
Watch.delete_all

u1 = User.create(first_name: 'Colin', last_name: 'Durbin', email: 'colin@gmail.com', location: 'London, UK', ga_course: 'wdi', role: 'Student', graduated_date: 'current student', password: 'password')

u2 = User.create(first_name: 'Becky', last_name: 'Smith', email: 'becky@gmail.com', location: 'New York City, USA', ga_course: 'uxdi', role: 'Instuctor', password: 'password')

q1 = Question.create(title: 'How do I create seed data in rails?', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque tempore, nam beatae provident illo nobis optio ad, nulla neque incidunt eos obcaecati deleniti placeat voluptates laboriosam alias dolor temporibus natus.', viewed: 5, user_id: u1.id)

q2 = Question.create(title: 'Why does seed data take so long?', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque tempore, nam beatae provident illo nobis optio ad, nulla neque incidunt eos obcaecati deleniti placeat voluptates laboriosam alias dolor temporibus natus.', viewed: 18, user_id: u2.id)

q3 = Question.create(title: 'Who is buried in Grant tomb?', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque tempore, nam beatae provident illo nobis optio ad, nulla neque incidunt eos obcaecati deleniti placeat voluptates laboriosam alias dolor temporibus natus.', viewed: 12, user_id: u1.id)

a1 = Answer.create(user_id: u1.id, question_id: q1.id, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus voluptate suscipit, porro enim error odit quis ut odio commodi tempora ab laudantium ducimus perferendis beatae ad a, pariatur explicabo aperiam.')

a2 = Answer.create(user_id: u2.id, question_id: q1.id, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus voluptate suscipit, porro enim error odit quis ut odio commodi tempora ab laudantium ducimus perferendis beatae ad a, pariatur explicabo aperiam.')

a3 = Answer.create(user_id: u1.id, question_id: q1.id, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus voluptate suscipit, porro enim error odit quis ut odio commodi tempora ab laudantium ducimus perferendis beatae ad a, pariatur explicabo aperiam.')

a4 = Answer.create(user_id: u2.id, question_id: q2.id, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus voluptate suscipit, porro enim error odit quis ut odio commodi tempora ab laudantium ducimus perferendis beatae ad a, pariatur explicabo aperiam.')

a5 = Answer.create(user_id: u1.id, question_id: q3.id, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus voluptate suscipit, porro enim error odit quis ut odio commodi tempora ab laudantium ducimus perferendis beatae ad a, pariatur explicabo aperiam.')

c1 = Comment.create(user_id: u1.id, commentable_id: q1.id, commentable_type: 'Question', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing el.')

c2 = Comment.create(user_id: u2.id, commentable_id: a1.id, commentable_type: 'Answer', content: 'Lorem ipsum.')

v1 = Vote.create(user_id: u1.id, votable_id: q1.id, votable_type: 'Question', score: 1)

v2 = Vote.create(user_id: u1.id, votable_id: q2.id, votable_type: 'Question', score: -1)

v3 = Vote.create(user_id: u1.id, votable_id: q3.id, votable_type: 'Question', score: 1)

v4 = Vote.create(user_id: u2.id, votable_id: q1.id, votable_type: 'Question', score: 1)

v5 = Vote.create(user_id: u2.id, votable_id: q2.id, votable_type: 'Question', score: 1)

v6 = Vote.create(user_id: u2.id, votable_id: q3.id, votable_type: 'Question', score: -1)

v7 = Vote.create(user_id: u1.id, votable_id: a1.id, votable_type: 'Answer', score: 1)

v8 = Vote.create(user_id: u1.id, votable_id: a2.id, votable_type: 'Answer', score: -1)

v9 = Vote.create(user_id: u1.id, votable_id: a3.id, votable_type: 'Answer', score: 1)

v10 = Vote.create(user_id: u2.id, votable_id: a1.id, votable_type: 'Answer', score: 1)

v11 = Vote.create(user_id: u2.id, votable_id: a2.id, votable_type: 'Answer', score: 1)

v12 = Vote.create(user_id: u2.id, votable_id: a3.id, votable_type: 'Answer', score: -1)

w1 = Watch.create(user_id: u1.id, question_id: q1.id)

w2 = Watch.create(user_id: u1.id, question_id: q3.id)

w3 = Watch.create(user_id: u2.id, question_id: q2.id)









