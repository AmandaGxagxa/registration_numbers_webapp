DROP table registrations , townnames;
CREATE table townnames(
    id serial not null primary key,
    town_name text not null,
    init_town text not null
);
CREATE TABLE registrations(
    id serial not null primary key,
    num_plates text not null,
    town_id int not null,
    FOREIGN KEY (town_id) REFERENCES townnames(id)
);

insert into townnames(town_name,init_town) values('Cape Town', 'CA');
insert into townnames(town_name,init_town) values('Bellville', 'CY');
insert into townnames(town_name,init_town) values('Paarl', 'CJ');
insert into townnames(town_name,init_town) values('Stellenbosch', 'CL');
insert into townnames(town_name,init_town) values('Malmesbury', 'CK');
insert into townnames(town_name,init_town) values('George', 'CAW');
insert into townnames(town_name,init_town) values('All',' All');