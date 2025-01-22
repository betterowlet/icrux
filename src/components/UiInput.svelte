<script>
    let { name, value, placeholder = '', remove } = $props();
</script>

<label>
    <span class="input">
        <input {name} {value} {placeholder} />
        <button class="remove" onclick={remove}>×</button>
    </span>
</label>

<style>
    label {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .input {
        display: flex;
        flex-wrap: nowrap;
        gap: 4px;
    }
    input {
        font-size: medium;
        padding: 2px 4px;
    }
</style>
