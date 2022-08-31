create database prosupuesto;
use prosupuesto;

create table miprosupuesto(
id int unsigned not null auto_increment primary key,
email varchar (80) not null,
celular float not null,
descripciondefalla varchar (200)
);

