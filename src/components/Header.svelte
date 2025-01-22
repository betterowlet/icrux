<script>
    let { data } = $props();
    const params = data.params;
    const urlType = params.url ? 'URL' : 'Origin';
    const device = params.formFactor === 'PHONE' ? '📱' : '🖥️';
</script>

<p>
    {device}
    {!!params.formFactor ? params.formFactor.toLowerCase() : 'All'} 🌐
    {urlType} 📅 {params.date}
</p>
