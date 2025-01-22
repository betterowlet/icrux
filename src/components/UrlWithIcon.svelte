<script>
    let { url } = $props();
    const icon = 'https://www.google.com/s2/favicons?sz=16&domain_url=' + url.replace('https://', '');
    const isSpecial = ['allegro.pl', 'allegrolokalnie.pl'].includes(url.split('/')[0]);
</script>

<div class="flex items-center space-x-2">
    <img src={icon} class="icon" width="16" height="16" alt={url} />
    <a href={url} target="_blank" class="overflow-hidden text-ellipsis w-64">
        {#if isSpecial}
            <strong title={url}>{url}</strong>
        {:else}
            <span title={url}>{url}</span>
        {/if}
    </a>
</div>

<style>
    .icon {
        max-width: 12px;
        margin: 0 3px 0 0;
    }

    span,
    strong {
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-align: left;
        margin-right: 10px;
    }
</style>
