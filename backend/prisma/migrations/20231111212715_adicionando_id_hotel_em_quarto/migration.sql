/*
  Warnings:

  - Added the required column `hotelId` to the `quarto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quarto" ADD COLUMN     "hotelId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "quarto" ADD CONSTRAINT "quarto_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


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