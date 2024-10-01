/* 
 	Procedimientos
	 
1) logear en la tabla binnacle cuando el usuario inicia sesión

2) verificar que los datos al crear un device sean válidos:
	name != " ",
	time_on > 0,
	expent > 0

3) verificar que los datos al crear un bill sean válidos:
	price_kw > 0
	
4) procedimiento para actualizar el estrato de una casa 

	Vistas

1) view_bill esta vista muestra los datos que serán enviados como factura al usuario
*/

-- 1) logear en la tabla binnacle cuando el usuario inicia sesión

create or replace procedure log_user_login(p_id_client int, operation varchar(50)) language plpgsql
as $$
begin

	INSERT INTO client_binnacle(timestamp, operation, name_table, id_client) VALUES 
	(current_timestamp, operation, 'client', p_id_client);
	
	commit;
	
end;
$$
call log_user_login(3, 'LOGIN');
call log_user_login(3, 'LOGOUT');

select * from client_binnacle;

/*

2) verificar que los datos al crear un device sean válidos:
	name != " ",
	time_on > 0,
	expent > 0

	Lo crea si los datos son válidos.
*/

create or replace procedure insert_device(p_id_home int,p_name varchar(255), p_time_on int, p_expent int) language plpgsql
as $$
begin

	if trim(p_name) ='' then
		raise exception 'El atributo "name" no puede ser una cadena vacía';
	end if;
	if (p_time_on <0) or (p_expent <0) then
		raise exception 'los atributos "time_on" y "expent" no pueden ser negativos';
	end if;

	insert into device (id_home,name,time_on,expent) values (p_id_home ,p_name , p_time_on , p_expent );
	
	commit;
	
end;
$$

select * from device;
call insert_device(1,'  ',1,56);
select * from home;

/* 
3) Registrar un cliente y asignarle un home
*/


create or replace procedure create_client_and_home(
p_name varchar(255),p_email varchar(255),
p_password varchar(255),p_stratum int
) language plpgsql as $$
declare
    client_id int;
begin

        insert into client (name, email, password)
        values (p_name, p_email, p_password)
        returning id_client into client_id;

        insert into home (id_client, stratum)
        values (client_id, p_stratum);

    exception
        when others then
            raise exception 'Error al crear el cliente o el hogar asociado: %', sqlerrm;
end;
$$;

call create_client_and_home('messi',',messi@m.com' ,'m10',10 )

select c as client,h.id_home,h.stratum from home h inner join client c on h.id_client = c.id_client and c.name ='messi' ;

-- 4) procedimiento para actualizar el estrato de una casa 


create or replace procedure update_home_stratum(p_id_home INT, new_stratum INT) language plpgsql
as $$
begin

    -- Bloqueo de la fila para evitar que otros procesos actualicen simultáneamente
    update home set stratum = new_stratum where id_home = p_id_home;
	
    if not found then
        raise exception 'No se encontró el hogar con ID %.', p_id_home;
    end if;
	
	commit;
	
end;
$$

select * from home;
call update_home_stratum(4,2)

/* VISTAS */


-- 1) view_bill

create view view_bill as
select 
h.id_home,
b.emition_date,
b.price_kw,
	h.stratum,
   sum(d.time_on) as total_time_on,
   (sum (d.time_on) * sum(d.expent) * b.price_kw) as total_cost
   
from 
    home h
join 
    device d ON h.id_home = d.id_home 
join 
	bill b on b.id_home = h.id_home
group by
	 h.id_home, b.emition_date, b.price_kw, d.expent
	
select * from view_bill;
