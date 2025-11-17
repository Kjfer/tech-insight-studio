-- Create storage bucket for images
insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true);

-- Create RLS policies for storage
create policy "Public can view images"
on storage.objects for select
using (bucket_id = 'content-images');

create policy "Authenticated users can upload images"
on storage.objects for insert
with check (bucket_id = 'content-images' and auth.role() = 'authenticated');

create policy "Authenticated users can update images"
on storage.objects for update
using (bucket_id = 'content-images' and auth.role() = 'authenticated');

create policy "Authenticated users can delete images"
on storage.objects for delete
using (bucket_id = 'content-images' and auth.role() = 'authenticated');

-- Create enum for user roles
create type public.app_role as enum ('admin', 'user');

-- Create user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamp with time zone default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS policies for user_roles
create policy "Users can view their own roles"
on public.user_roles for select
using (auth.uid() = user_id);

create policy "Admins can view all roles"
on public.user_roles for select
using (public.has_role(auth.uid(), 'admin'));

-- Create hero_slides table
create table public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  highlight text not null,
  description text not null,
  image_url text not null,
  order_index int not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.hero_slides enable row level security;

create policy "Anyone can view hero slides"
on public.hero_slides for select
using (true);

create policy "Admins can manage hero slides"
on public.hero_slides for all
using (public.has_role(auth.uid(), 'admin'));

-- Create services table
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text not null,
  icon text not null,
  show_in_home boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.services enable row level security;

create policy "Anyone can view services"
on public.services for select
using (true);

create policy "Admins can manage services"
on public.services for all
using (public.has_role(auth.uid(), 'admin'));

-- Create template_categories table
create table public.template_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  icon text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.template_categories enable row level security;

create policy "Anyone can view categories"
on public.template_categories for select
using (true);

create policy "Admins can manage categories"
on public.template_categories for all
using (public.has_role(auth.uid(), 'admin'));

-- Create templates table
create table public.templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text,
  category_id uuid references public.template_categories(id) on delete set null,
  price decimal(10,2),
  is_featured boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.templates enable row level security;

create policy "Anyone can view templates"
on public.templates for select
using (true);

create policy "Admins can manage templates"
on public.templates for all
using (public.has_role(auth.uid(), 'admin'));

-- Create keywords table
create table public.keywords (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamp with time zone default now()
);

alter table public.keywords enable row level security;

create policy "Anyone can view keywords"
on public.keywords for select
using (true);

create policy "Admins can manage keywords"
on public.keywords for all
using (public.has_role(auth.uid(), 'admin'));

-- Create template_keywords junction table
create table public.template_keywords (
  id uuid primary key default gen_random_uuid(),
  template_id uuid references public.templates(id) on delete cascade not null,
  keyword_id uuid references public.keywords(id) on delete cascade not null,
  unique (template_id, keyword_id)
);

alter table public.template_keywords enable row level security;

create policy "Anyone can view template keywords"
on public.template_keywords for select
using (true);

create policy "Admins can manage template keywords"
on public.template_keywords for all
using (public.has_role(auth.uid(), 'admin'));

-- Create service_keywords junction table
create table public.service_keywords (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete cascade not null,
  keyword_id uuid references public.keywords(id) on delete cascade not null,
  unique (service_id, keyword_id)
);

alter table public.service_keywords enable row level security;

create policy "Anyone can view service keywords"
on public.service_keywords for select
using (true);

create policy "Admins can manage service keywords"
on public.service_keywords for all
using (public.has_role(auth.uid(), 'admin'));

-- Create about_us table
create table public.about_us (
  id uuid primary key default gen_random_uuid(),
  mission text not null,
  vision text not null,
  history text not null,
  updated_at timestamp with time zone default now()
);

alter table public.about_us enable row level security;

create policy "Anyone can view about us"
on public.about_us for select
using (true);

create policy "Admins can manage about us"
on public.about_us for all
using (public.has_role(auth.uid(), 'admin'));

-- Create values table
create table public.values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.values enable row level security;

create policy "Anyone can view values"
on public.values for select
using (true);

create policy "Admins can manage values"
on public.values for all
using (public.has_role(auth.uid(), 'admin'));

-- Create team_members table
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  description text not null,
  image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.team_members enable row level security;

create policy "Anyone can view team members"
on public.team_members for select
using (true);

create policy "Admins can manage team members"
on public.team_members for all
using (public.has_role(auth.uid(), 'admin'));

-- Create clients table
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  created_at timestamp with time zone default now()
);

alter table public.clients enable row level security;

create policy "Anyone can view clients"
on public.clients for select
using (true);

create policy "Admins can manage clients"
on public.clients for all
using (public.has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_hero_slides_updated_at
  before update on public.hero_slides
  for each row execute function public.handle_updated_at();

create trigger handle_services_updated_at
  before update on public.services
  for each row execute function public.handle_updated_at();

create trigger handle_template_categories_updated_at
  before update on public.template_categories
  for each row execute function public.handle_updated_at();

create trigger handle_templates_updated_at
  before update on public.templates
  for each row execute function public.handle_updated_at();

create trigger handle_about_us_updated_at
  before update on public.about_us
  for each row execute function public.handle_updated_at();

create trigger handle_values_updated_at
  before update on public.values
  for each row execute function public.handle_updated_at();

create trigger handle_team_members_updated_at
  before update on public.team_members
  for each row execute function public.handle_updated_at();