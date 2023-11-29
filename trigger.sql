create table cliente_log(
	data date,
	id TEXT,
	tipo char);

create or replace function clientelog()
returns trigger as $$
declare
agora timestamp := current_date;
begin
	if TG_OP = 'UPDATE' then
		insert into cliente_log values(agora, old.id, 'U');
		return new;
	elsif TG_OP='DELETE' then
		insert into cliente_log values(agora, old.id, 'D');
		return new;
	elsif TG_OP='INSERT' then
		insert into cliente_log values(agora, old.id, 'I');
		return new;
	end if;
	return new;
end;
$$ language plpgsql;

create or replace trigger clientelog
before update or delete on cliente for each row
execute function clientelog();
