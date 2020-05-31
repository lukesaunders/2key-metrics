import knex from '../lib/database.mjs';

export default async function () {
  const entries = await knex('key_metrics')
    .where({ metric_name: 'link_clickthroughs' })
    .orderBy('date', 'ASC');

  const dataRes = entries.map((t) => {
    return {
      date: t['date'],
      value: t['daily_count'],
    };
  });
  const res = {
    entries: dataRes,
  };
  return res;
}
