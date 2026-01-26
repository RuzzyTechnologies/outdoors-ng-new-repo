import { schema, TableName } from "@/lib/schema";

export function pickAllowedColumns(table: TableName, data: Record<string, any>, opts?: { includePk?: boolean }) {
  const cols = schema[table].columns;
  const pk = new Set(schema[table].primary_key);
  const auto = new Set(schema[table].auto_increment);

  const allowed = new Set(cols);
  const out: Record<string, any> = {};

  for (const [k, v] of Object.entries(data || {})) {
    if (!allowed.has(k)) continue;
    if (!opts?.includePk) {
      if (pk.has(k) || auto.has(k)) continue;
    }
    out[k] = v;
  }
  return out;
}

export function getPrimaryKey(table: TableName) {
  const pk = schema[table].primary_key;
  if (!pk || pk.length !== 1) return null;
  return pk[0];
}
