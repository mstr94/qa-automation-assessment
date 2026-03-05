import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.3/index.js';

export const options = {
  scenarios: {
    load_test: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 300,
    },
  },
  thresholds: {
    http_req_duration: ['p(50)<150', 'p(95)<300', 'p(99)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const params = {
    headers: {
      'x-api-key': __ENV.REQRES_API_KEY || 'MISSING_KEY_DEBUG',
    },
  };

  const res = http.get('https://reqres.in/api/users?page=1', params);

  check(res, {
    'Status is 200 (OK)': (r) => r.status === 200,
    'Error 401 (Unauthorized)': (r) => r.status === 401,
    'Error 403 (Forbidden)': (r) => r.status === 403,
    'Error 429 (Too Many Requests)': (r) => r.status === 429,
    'Error 5xx (Server Error)': (r) => r.status >= 500,
  });
}

export function handleSummary(data) {
  const txt = textSummary(data, { indent: '→', enableColors: true });
  const html = htmlReport(data);

  return {
    'performance/report.html': html,
    'performance/summary.json': JSON.stringify(data, null, 2),
    'performance/summary.txt': txt, 
    stdout: txt,
  };
}