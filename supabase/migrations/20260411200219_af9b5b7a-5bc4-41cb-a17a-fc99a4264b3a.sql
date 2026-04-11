-- briefings table
CREATE TABLE public.briefings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  teaser TEXT,
  content TEXT,
  author TEXT NOT NULL DEFAULT 'AI Threat Brief',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Briefings are publicly readable"
ON public.briefings FOR SELECT
USING (true);

-- tools table
CREATE TABLE public.tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  rating NUMERIC NOT NULL DEFAULT 0,
  pricing TEXT,
  description TEXT,
  affiliate_marked BOOLEAN NOT NULL DEFAULT false,
  url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tools are publicly readable"
ON public.tools FOR SELECT
USING (true);

-- saved_briefings table
CREATE TABLE public.saved_briefings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  briefing_id UUID NOT NULL REFERENCES public.briefings(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, briefing_id)
);

ALTER TABLE public.saved_briefings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved briefings"
ON public.saved_briefings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can save briefings"
ON public.saved_briefings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave briefings"
ON public.saved_briefings FOR DELETE
USING (auth.uid() = user_id);

-- Timestamp triggers
CREATE TRIGGER update_briefings_updated_at
BEFORE UPDATE ON public.briefings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tools_updated_at
BEFORE UPDATE ON public.tools
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();