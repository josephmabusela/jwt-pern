CREATE DATABASE authtodolist;

--users table

CREATE TABLE users( user_id UUID DEFAULT uuid_generate_v4(),
                                         user_name VARCHAR(255) NOT NULL,
                                                                user_email VARCHAR(255) NOT NULL UNIQUE,
                                                                                                 user_password VARCHAR(255) NOT NULL,
                                                                                                                            PRIMARY KEY (user_id) ) --todos table

CREATE TABLE todos( todo_id SERIAL, user_id UUID,
                                    description VARCHAR(255) NOT NULL,
                                                             PRIMARY KEY (todo_id),
                   FOREIGN KEY (user_id) REFERENCES users(user_id) ) -- fake users data

insert into users (user_name,
                   user_email,
                   user_password)
values ('james',
        'james@gmail.com',
        'james22');

-- fake todos data

insert into todos (user_id, description)
values ('896364ef-b372-44a4-958e-e37770f2dc70',
        'clean room');