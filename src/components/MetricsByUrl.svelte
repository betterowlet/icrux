<script>
    let { data } = $props();
    import Metric from '../components/Metric.svelte';
    import Legend from '../components/Legend.svelte';
    function getMetric(data, metric) {
        return data.metrics[metric];
    }
</script>

{#each ['FCP', 'LCP', 'CLS', 'TTFB', 'INP'] as metric}
    <article class="mt-8">
        <Legend {metric} />
        <table class="table">
            <tbody>
                {#each getMetric(data, metric) as p}
                    <Metric post={p} />
                {/each}
            </tbody>
        </table>
    </article>
{/each}
