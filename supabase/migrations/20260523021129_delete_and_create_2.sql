-- =========================
-- USERS
-- =========================
create type user_role as ENUM ('owner', 'admin', 'editor', 'viewer');

-- =========================
-- USERS
-- Relacionado con auth.users de Supabase
-- =========================
create table
    users (
        id uuid primary key default gen_random_uuid (),
        auth_id uuid not null references auth.users (id) on delete cascade,
        email varchar(255) unique not null,
        username varchar(50),
        name varchar(120),
        lastname varchar(120),
        refarral_code varchar(50) unique,
        avatar_url text,
        phone_number varchar(30),
        role user_role default 'owner', -- Esto servirá para grupos de trabajo y permisos(No entrara en el mvp)
        created_at timestamptz default now (),
        updated_at timestamptz default now ()
    );

-- =========================
-- WHATSAPP ACCOUNTS
-- =========================
create type status_type as ENUM ('connected', 'disconnected', 'pending');

create table
    whatsapp_accounts (
        id uuid primary key default gen_random_uuid (),
        user_id uuid not null references users (id) on delete cascade,
        auth_id uuid references auth.users (id) on delete set null,
        name varchar(120) not null,
        provider varchar(50) not null,
        -- meta | twilio | evolution | baileys
        phone_number varchar(30),
        access_token text,
        refresh_token text,
        api_key text,
        api_secret text,
        webhook_secret text,
        status status_type default 'disconnected',
        created_at timestamptz default now (),
        updated_at timestamptz default now ()
    );

-- =========================
-- BOTS
-- =========================
create type bot_type as ENUM ('menu', 'ai', 'hybrid');

create table
    bots (
        id uuid primary key default gen_random_uuid (),
        auth_id uuid references auth.users (id) on delete set null,
        user_id uuid not null references users (id) on delete cascade,
        whatsapp_account_id uuid references whatsapp_accounts (id) on delete set null,
        name varchar(120) not null,
        type bot_type not null default 'menu',
        welcome_message text,
        is_active boolean default true,
        created_at timestamptz default now (),
        updated_at timestamptz default now ()
    );

-- =========================
-- DOCUMENTOS IA
-- =========================
create table
    bot_documents (
        id uuid primary key default gen_random_uuid (),
        bot_id uuid not null references bots (id) on delete cascade,
        title varchar(255),
        content text,
        source varchar(50),
        -- text | pdf | faq | website
        created_at timestamptz default now ()
    );

-- =========================
-- FLOWS
-- =========================
create table
    bot_flows (
        id uuid primary key default gen_random_uuid (),
        bot_id uuid not null references bots (id) on delete cascade,
        name varchar(120) not null,
        is_default boolean default false,
        created_at timestamptz default now ()
    );

-- =========================
-- FLOW NODES
-- =========================
create type node_type as ENUM ('message', 'menu', 'input', 'api');

create table
    flow_nodes (
        id uuid primary key default gen_random_uuid (),
        flow_id uuid not null references bot_flows (id) on delete cascade,
        node_key varchar(100) not null,
        node_type node_type default 'message',
        message text not null,
        created_at timestamptz default now ()
    );

-- =========================
-- FLOW node connections
-- =========================
create table
    flow_connections (
        id uuid primary key default gen_random_uuid (),
        node_id uuid not null references flow_nodes (id) on delete cascade,
        option_label varchar(120) not null,
        option_value varchar(120),
        next_node_id uuid references flow_nodes (id) on delete set null
    );

-- =========================
-- CONTACTS
-- =========================
create table
    contacts (
        id uuid primary key default gen_random_uuid (),
        user_id uuid not null references users (id) on delete cascade,
        phone_number varchar(30) not null,
        name varchar(120),
        metadata jsonb default '{}',
        created_at timestamptz default now (),
        unique (user_id, phone_number)
    );

-- =========================
-- CONVERSATIONS
-- =========================
create table
    conversations (
        id uuid primary key default gen_random_uuid (),
        bot_id uuid references bots (id) on delete set null,
        contact_id uuid references contacts (id) on delete cascade,
        status varchar(30) default 'open',
        started_at timestamptz default now (),
        closed_at timestamptz
    );

-- =========================
-- MESSAGES
-- =========================
create table
    messages (
        id uuid primary key default gen_random_uuid (),
        conversation_id uuid not null references conversations (id) on delete cascade,
        direction varchar(20) not null,
        -- incoming | outgoing
        sender varchar(30),
        content text,
        message_type varchar(30) default 'text',
        -- text | image | audio | document
        provider_message_id varchar(255),
        created_at timestamptz default now ()
    );

-- =========================
-- AI SETTINGS
-- =========================
create type ai_provider as ENUM ('openai', 'gemini', 'anthropic', 'deepseek');

create table
    ai_settings (
        id uuid primary key default gen_random_uuid (),
        bot_id uuid unique not null references bots (id) on delete cascade,
        provider ai_provider not null default 'openai',
        -- openai | gemini | anthropic
        model varchar(100),
        system_prompt text,
        temperature numeric(3, 2) default 0.7,
        max_tokens integer default 1000
    );

-- =========================
-- VARIABLES
-- =========================
create table
    bot_variables (
        id uuid primary key default gen_random_uuid (),
        bot_id uuid not null references bots (id) on delete cascade,
        key varchar(100) not null,
        value text,
        unique (bot_id, key)
    );

-- =========================
-- INDEXES
-- =========================
create index idx_messages_conversation on messages (conversation_id);

create index idx_contacts_phone on contacts (phone_number);

create index idx_conversations_contact on conversations (contact_id);

create index idx_bots_user on bots (user_id);

create index idx_whatsapp_accounts_user on whatsapp_accounts (user_id);