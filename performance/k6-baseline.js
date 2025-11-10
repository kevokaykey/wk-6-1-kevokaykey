import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 50,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95)<500'],
    },
};

export default function () {
    const res = http.get('http://host.docker.internal:3000/');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}
