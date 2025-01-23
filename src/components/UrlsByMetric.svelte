<script>
    let { data } = $props();
    function imgIcon(url) {
        return 'https://www.google.com/s2/favicons?sz=16&domain_url=' + url.replace('https://', '');
    }

    function getMetric() {
        if (!data.metrics) return [];
        return data.metrics.map((item) => {
            let obj = [];
            obj.push({
                url: item.url,
                minimal: item.minimalGood
            });
            ['FCP', 'LCP', 'CLS', 'TTFB', 'INP'].forEach((metric) => {
                obj.push({
                    p75: item[metric].p75,
                    rank: item[metric].rank
                });
            });

            return obj;
        });
    }
    const table = [['URL', 'FCP', 'LCP', 'CLS', 'TTFB', 'INP', 'Rank']].concat(getMetric());

    const tableHeading = table[0];
    const rank = {
        good: 'badge badge-success',
        average: 'badge badge-warning',
        poor: 'badge badge-error'
    };
</script>

<div class="overflow-x-auto bg-gray-50 p-6 rounded-md mt-4">
    <table class="table">
        <thead>
            <tr>
                {#each tableHeading as cell}
                    <td>{cell}</td>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each table.slice(1, table.length) as row, index}
                <tr class="hover">
                    {#each row as cell}
                        {#if cell.p75}
                            <td>
                                <div class={rank[cell.rank]}>{cell.p75}</div>
                            </td>
                        {:else}
                            <td>
                                <div class="flex items-center space-x-2">
                                    <img src={imgIcon(cell.url)} class="icon" width="16" height="16" alt={cell.url} />
                                    <a href={cell.url} target="_blank" class="overflow-hidden text-ellipsis w-64">{cell.url}</a>
                                    <progress class="progress progress-success w-56" value={cell.minimal} max="100"></progress>
                                    <div class="badge">{cell.minimal}%</div>
                                </div>
                            </td>
                        {/if}
                    {/each}
                    <td><strong class="primary">#{index + 1}</strong></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
