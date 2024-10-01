/* 
1) logear cuando se ejecuta un dml en la tabla user o 
2) validar que no se ingresen datos vacios a la tabla cliente
3) validar que no se ingresen numeros negativos a stratum
*/

-- 1) logear cuando se ejecuta un dml en la tabla client o device

CREATE OR REPLACE FUNCTION log_user_operation()
RETURNS TRIGGER LANGUAGE "plpgsql" AS $$
DECLARE
BEGIN
	INSERT INTO binnacle(timestamp, operation, name_table) VALUES 
	(current_timestamp, TG_OP, TG_TABLE_NAME);
	
	RETURN new;
END;
$$ 
CREATE trigger tr_log_user_operation before UPDATE or DELETE or INSERT ON client FOR EACH STATEMENT EXECUTE FUNCTION log_user_operation();

CREATE trigger tr_log_user_operation before UPDATE or DELETE or INSERT ON device FOR EACH STATEMENT EXECUTE FUNCTION log_user_operation();


insert into client (name,email,password) values ('pepito','pe@.com','1234');

select * from binnacle;
select * from client;


-- 2) validar que no se ingresen datos vacios a la tabla cliente

create or replace function handle_user_empty_data()
returns trigger language "plpgsql" as $$
declare
begin

	if trim(new.name) = '' then
		raise exception 'el campo "name" no puede ser una cadena vacía';
	end if;

	if trim(new.email) = '' then
		raise exception 'el campo "email" no puede ser una cadena vacía';
	end if;

	if trim(new.password) = '' then
		raise exception 'el campo "password" no puede ser una cadena vacía';
	end if;

	return new;
end;
$$

create trigger tr_handle_user_empty_data before insert or update on client for each row execute function handle_user_empty_data();

insert into client (name,email,password) values ('d','p@m.com','');


-- 3) validar que no se ingresen numeros negativos a stratum

create or replace function handle_negative_stratum()
returns trigger language "plpgsql" as $$
declare
begin

	if new.stratum < 0  then
		raise exception 'El campo stratum no puede ser negativo %', new.stratum;
	end if;
	 
	return new;
end;
$$

create trigger tr_handle_negative_stratum before insert or update on home for each row execute function handle_negative_stratum();
