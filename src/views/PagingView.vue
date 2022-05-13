<tamplate>
    <div id="paging">
        <h1>Page: {{ $route.params.page }}</h1>
        <<router-link :to="`paging/${prefPage}`">Prev</router-link> |
        <<router-link :to="`paging/${nextPage}`">Next</router-link>
    </div>
</tamplate>

<script>
export default {
    computed: {
        prevPage(){
            return Number(this.$route.params.page) - 1
        },
        nextPage(){
            return Number(this.$route.params.page) + 1
        }
    }
}
</script>