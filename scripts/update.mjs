import graphql from 'graphql-request';
const { request } = graphql;

import fns from 'date-fns';
const { format } = fns;

import knex from '../lib/database.mjs';
const endpoint = 'http://prod.api.graph.plasma.2key.net/subgraphs/name/plasma';

async function requestGraphData({ after, dateMap = {}, graphType } = {}) {
  console.log('fetching after', after, 'for', graphType);
  const afterSegment = after ?
    `where:{
      _timeStamp_gt:${after}
    }` : '';

  const query = `{
    ${graphType}(
      orderBy:_timeStamp,
      orderDirection:asc,
      first:100
      ${afterSegment}
    ) {
      id
      _timeStamp
    }
  }`;

  const response = await request(endpoint, query);
  const data = response[graphType];
  if (!data.length) return dateMap;

  for (const item of data) {
    const date = new Date(item['_timeStamp'] * 1000);
    const formattedDate = format(date, 'yyyy-MM-dd');
    if (!dateMap[formattedDate]) dateMap[formattedDate] = 0;
    dateMap[formattedDate] += 1;
  }
  console.log(data);
  return await requestGraphData({ after: data[data.length - 1]['_timeStamp'], dateMap, graphType });
};

async function buildMetrics({ metricName, graphType }) {
  await knex('key_metrics').where({ metric_name: metricName }).del();
  const dateMap = await requestGraphData({ graphType });
  console.log(dateMap);

  let cumulativeCount = 0;
  for (let [key, value] of Object.entries(dateMap)) {
    if (key === format(new Date(), 'yyyy-MM-dd')) continue;
    cumulativeCount += value;
    await knex('key_metrics').insert({
      date: key,
      metric_name: metricName,
      daily_count: value,
      cumulative_count: cumulativeCount,
    });  
  }
}

async function run() {
  await buildMetrics({ metricName: 'user_registrations', graphType: 'users' });
  await buildMetrics({ metricName: 'campaigns_created', graphType: 'campaigns' });
  await buildMetrics({ metricName: 'link_clickthroughs', graphType: 'visits' });

  knex.destroy();
}

run();

