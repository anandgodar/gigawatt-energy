-- D1 database: gigawatt-leads (id 4c43fb58-a2de-4e44-900b-572fb677927e, region OC/Sydney)
-- Already applied. Kept here for reference / recreating.
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT, email TEXT NOT NULL, phone TEXT, suburb TEXT,
  service TEXT, bill TEXT,
  source TEXT NOT NULL,                -- 'quote-wizard' | 'calculator'
  status TEXT NOT NULL DEFAULT 'active', -- 'active' | 'stopped' | 'booked'
  last_step INTEGER NOT NULL DEFAULT 0,  -- 0..3 follow-ups sent
  stop_token TEXT NOT NULL,
  updated_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status, created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
