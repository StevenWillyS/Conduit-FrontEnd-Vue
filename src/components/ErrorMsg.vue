<template>
    <ul class="error-messages">
        <li v-for="(errorMsg, errorHeader) in error" :key="errorHeader">{{errorHeader}} {{errorMsg[0]}}</li>
    </ul>
</template>

<script>
    export default {
        name: "ErrorMsg",
        props: {
            error: {
                required: true
            }
        }
    }
</script>