<script>
    let { post } = $props();
    import UrlWithIcon from './UrlWithIcon.svelte';

    const rank = ['good', 'average', 'poor'];

    const rankMap = {
        good: 'badge badge-success',
        average: 'badge badge-warning',
        poor: 'badge badge-error'
    };
</script>

<tr class="hover">
    <td class="w-4/12">
        <div class="flex items-center space-x-2">
            <UrlWithIcon url={post.url} />
            <div class={rankMap[post.rank]}>{post.p75}</div>
        </div>
    </td>
    <td class="w-8/12">
        {#if rankMap[post.rank]}
            <ul class="w-full">
                {#each post.histogram as item, index}
                    {#if item > 0}
                        <li class={rank[index]} style={'flex:' + item} title="{item}%">
                            <span>{item}%</span>
                        </li>
                    {/if}
                {/each}
            </ul>
        {:else}
            no data
        {/if}
    </td>
</tr>

<style>
    ul {
        display: flex;
    }
    ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        padding: 0 5px;
        text-align: right;
        margin: 3px 0;
        text-indent: -999px;
        overflow: hidden;
    }

    li:first-child {
        border-radius: 50px 0 0 50px;
    }

    li:last-child {
        border-radius: 0 50px 50px 0;
    }

    .good {
        background-color: #34a853;
    }

    .average {
        background-color: #fbbc04;
    }

    .poor {
        background-color: #ea4335;
        color: #fff;
    }
</style>
