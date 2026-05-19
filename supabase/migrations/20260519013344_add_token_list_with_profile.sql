
create type token_type as enum ('deepl', 'openia');

create table tokens
(
    auth_id uuid not null,
    name text not null,
    token_type token_type not null,
    token_hash text not null,
    created_at timestamp with time zone default now(),
    CONSTRAINT tokens_pkey PRIMARY KEY (token_hash),
    CONSTRAINT tokens_auth_id_fkey FOREIGN KEY (auth_id) REFERENCES auth.users (id)
);