drop table users;
drop table docs;
drop table chapters;
drop table tags;
drop table novel_tags;

drop function update_updated_at_column();
drop trigger update_users_updated_at on users;
drop trigger update_docs_updated_at on docs;