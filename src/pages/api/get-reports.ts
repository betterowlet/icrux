import prependHttp from 'prepend-http';
import { CRUX_API_KEY, CRUX_API_ORIGIN } from 'astro:env/server';
import { convertData } from './crux-convert';
import axios from 'axios';

async function runQuery(cruxQueryParams, history = false) {
    console.log('runQuery', cruxQueryParams);
    const url = `https://chromeuxreport.googleapis.com/v1/records:${history ? 'queryHistoryRecord' : 'queryRecord'}?key=${CRUX_API_KEY}`;

    const headers = {
        origin: CRUX_API_ORIGIN
    };

    try {
        const response = await axios.post(url, cruxQueryParams, { headers });
        return response.data.record;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function handleErrors(error) {
    delete error.config.params.key;
    console.log({ params: error.config.params, errors: error.errors });
}

export async function getReports(urls, params, groupByMetric = false) {
    const urlsPrepared = urls.map((url) => prependHttp(url));
    const { effectiveConnectionType, formFactor, history, origin } = params;
    const cruxQueryParams = {
        effectiveConnectionType,
        formFactor
    };
    const tasks = urlsPrepared.map((url) => {
        const urlOrOrigin = origin ? { origin: url } : { url: url };

        return runQuery({ ...cruxQueryParams, ...urlOrOrigin }, history).catch(handleErrors);
    });
    const data = (await Promise.all([...tasks])).filter((item) => !!item);

    return !history ? convertData(data, groupByMetric) : data;
}
