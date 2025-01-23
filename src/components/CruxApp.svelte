<script>
    import { onMount } from 'svelte';
    import Header from './Header.svelte';
    import UrlsByMetric from './UrlsByMetric.svelte';
    import MetricsByUrl from './MetricsByUrl.svelte';

    import UiInput from './UiInput.svelte';

    const formFactorValues = ['ALL_FORM_FACTORS', 'PHONE', 'DESKTOP', 'TABLET'];

    let initialData = $state({
        url: [''],
        checkOrigin: true,
        formFactor: 'ALL_FORM_FACTORS'
    });

    let promise = $state(Promise.reject(new Error('')));

    function addItem(e) {
        e.preventDefault();
        const len = initialData.url.length;
        initialData.url[len] = '';
    }

    function removeItem(i, e) {
        e.preventDefault();
        initialData.url.splice(i, 1);
        initialData.url = [...initialData.url];
    }

    onMount(async () => {
        const data = new URL(location.href).searchParams;
        const url = data.getAll('url');
        const checkOrigin = !!data.get('checkOrigin');
        const formFactor = data.get('formFactor');

        if (url.length) {
            initialData.url = url;
            initialData.checkOrigin = checkOrigin;
            initialData.formFactor = formFactor;
            promise = getCrux(JSON.stringify(initialData));
        }
    });

    async function getCrux(data) {
        const res = await fetch('/api/crux', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        });
        const content = await res.json();
        console.log('res content', content);
        if (res.ok) {
            return content;
        } else {
            throw new Error(content);
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = new URLSearchParams(new FormData(e.target));
        window.location.href = '/?' + data.toString();
    }
</script>

<form onsubmit={onSubmit} class="bg-gray-100 p-6 rounded-md">
    <ul>
        <li>
            <label class="label cursor-pointer">
                <input class="checkbox" type="checkbox" name="checkOrigin" checked={initialData.checkOrigin} />
                <span class="label-text ml-1">Origin</span>
            </label>
        </li>
        <li>
            <select name="formFactor" class="select w-full max-w-xs">
                {#each formFactorValues as formFactor}
                    {#if formFactor === initialData.formFactor}
                        <option value={formFactor} selected>{formFactor}</option>
                    {:else}
                        <option value={formFactor}>{formFactor}</option>
                    {/if}
                {/each}
            </select>
        </li>
        {#each initialData.url as item, i (i)}
            <li>
                <UiInput name="url" value={item} placeholder="url" remove={(e) => removeItem(i, e)} />
            </li>
        {/each}
        <li><button onclick={addItem} class="btn">+</button></li>
    </ul>
    <div class="mt-3 flex justify-end"><button type="submit" class="btn btn-primary">Get Chrome CrUX</button></div>
</form>

<div class="mt-8 mb-8">
    {#await promise}
        <p class="m-auto p-20 text-center">
            <span class="loading loading-spinner loading-lg"></span>
        </p>
    {:then content}
        {#if content.cruxData.error}
            <p class="error">{content.cruxData.error}</p>
        {:else}
            <Header data={content.cruxData} />
            <UrlsByMetric data={content.cruxData} />
            <MetricsByUrl data={content.byMetric} />
        {/if}
    {:catch error}
        <p class="error">{error.message}</p>
    {/await}
</div>

<style>
    ul {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
    }
    ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .error {
        color: #ed3800;
    }
</style>
