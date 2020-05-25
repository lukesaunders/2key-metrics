import graphql from 'graphql-request';
const { request } = graphql;

import fns from 'date-fns';
const { format } = fns;

import knex from '../lib/database.mjs';
const endpoint = 'http://prod.api.graph.plasma.2key.net/subgraphs/name/plasma';

async function requestVisits({ after, dateMap = {} } = {}) {
  console.log('fetching after', after);
  const afterSegment = after ?
    `where:{
      _timeStamp_gt:${after}
    }` : '';

  const query = `{
    visits(
      orderBy:_timeStamp,
      orderDirection:asc,
      first:100
      ${afterSegment}
    ) {
      id
      _timeStamp
    }
  }`;

  const { visits } = await request(endpoint, query);  
  if (!visits.length) return dateMap;

  for (const visit of visits) {
    const date = new Date(visit['_timeStamp'] * 1000);
    const formattedDate = format(date, 'yyyy-MM-dd');
    if (!dateMap[formattedDate]) dateMap[formattedDate] = 0;
    dateMap[formattedDate] += 1;
  }
  console.log(visits);
  return await requestVisits({ after: visits[visits.length - 1]['_timeStamp'], dateMap });
};

async function run() {
  await knex('key_metrics').where({ metric_name: 'link_clickthroughs' }).del();
  const dateMap = await requestVisits();
  console.log(dateMap);

  let cumulativeCount = 0;
  for (let [key, value] of Object.entries(dateMap)) {
    if (key === format(new Date(), 'yyyy-MM-dd')) continue;
    cumulativeCount += value;
    await knex('key_metrics').insert({
      date: key,
      metric_name: 'link_clickthroughs',
      daily_count: value,
      cumulative_count: cumulativeCount,
    });  
  }

  knex.destroy();
}

run();
