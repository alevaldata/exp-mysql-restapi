CREATE DATABASE IF NOT EXISTS companydb;

show databases;

use companydb;

create table employee (
	id int(11) not null auto_increment,
    name varchar(50) default null,
    salary int(5) default null,
	primary key (id)
);

show tables;

describe employee;