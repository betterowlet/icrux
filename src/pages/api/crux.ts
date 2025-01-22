import type { APIRoute } from 'astro';
import type { Context, Config } from '@netlify/edge-functions';
import prependHttp from 'prepend-http';
import { getReports } from './get-reports';

function groupByMetricAndSort(data, sortBy = 'histogram') {
    if (!data) return {};
    const byMetric = { CLS: [], FCP: [], LCP: [], INP: [], TTFB: [] };

    data.forEach((site) => {
        for (const metric in byMetric) {
            byMetric[metric].push({ url: site.url, ...site[metric] });
        }
    });

    for (const metric in byMetric) {
        byMetric[metric].sort((a, b) => {
            const aValue = sortBy === 'histogram' ? parseFloat(a.histogram[0]) : parseFloat(b.p75);
            const bValue = sortBy === 'histogram' ? parseFloat(b.histogram[0]) : parseFloat(a.p75);

            return bValue - aValue;
        });
    }

    return byMetric;
}

export const POST: APIRoute = async ({ request }) => {
    const parameters = await request.json();
    console.log('parameters', parameters);
    // const params = new URL(context.url)?.searchParams;
    const checkOrigin = !parameters.checkOrigin ? false : true;
    // const formFactor = params.get('formFactor');
    const urls = parameters.url.filter((item) => !!item).map((url) => prependHttp(url));

    const queryParams = {
        effectiveConnectionType: '',
        formFactor: parameters.formFactor,
        origin: checkOrigin
    };

    const cruxData = await getReports(urls, queryParams);
    const cruxDataByMetric = groupByMetricAndSort(cruxData?.metrics);

    return Response.json({
        cruxData,
        byMetric: { params: cruxData?.params, metrics: cruxDataByMetric }
    });
};
