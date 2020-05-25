import { request } from 'graphql-request';
import { format } from 'date-fns'

import knex from '../../lib/database.js';
const endpoint = 'http://prod.api.graph.plasma.2key.net/subgraphs/name/plasma';

async function metaStats() {
  const query = `{
    meta(id:"Meta") {
      _visitCounter
      _n_conversions
      _n_conversions_rejected
      _conversionsExecuted
      _visitCounter
      _n_forwarded
      _n_campaigns
    }
    visits(orderBy:_timeStamp,orderDirection:desc,first:2) {
      id
      _campaign {
        id
      }
      _referrer {
        id
      }
    }
    user(id:"0x5224aa663e2ba21ccb4194bcd4f1aed5f4be4d31") {
      id
      _handle
      _web3Address
    }
  }`;

  request('http://prod.api.graph.plasma.2key.net/subgraphs/name/plasma', query).then(data =>
    console.log(data)
  );
};



async function requestVisits({ after, dateMap = {} } = {}) {
  console.log('fetching after', after);
  const afterSegment = after ?
    `where:{
      _timeStamp_lt:${after}
    }` : '';

  const query = `{
    visits(
      orderBy:_timeStamp,
      orderDirection:desc,
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
  const token = await knex('tokens').where({ gecko_id: '2key' }).first();
  await knex('project_key_metrics').where({ token_id: token.id, metric_name: 'link_visits' }).del();
  const dateMap = await requestVisits();
  console.log('sdfdsf');
  console.log(dateMap);

  for (let [key, value] of Object.entries(dateMap)) {
    await knex('project_key_metrics').insert({
      date: key,
      token_id: token.id,
      metric_name: 'link_visits',
      metric_count: value,
    });  
  }
}

run();



