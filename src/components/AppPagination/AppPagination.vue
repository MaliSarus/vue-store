<template>
    <ul class="catalog__pagination pagination">
        <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled': page === 1}"
               aria-label="Предыдущая страница"
               @click.prevent="paginatePrev($event)"
            >
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-left"></use>
                </svg>
            </a>
        </li>
        <li class="pagination__item" v-for="pageNumber in pages" :key="'page_' + pageNumber">
            <a href="#" class="pagination__link" :class="{'pagination__link--current': pageNumber === page}" @click.prevent="paginate(pageNumber)">
                {{pageNumber}}
            </a>
        </li>

        <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow"
               :class="{'pagination__link--disabled': page === this.pages}"
               href="#" aria-label="Следующая страница"
               @click.prevent="paginateNext($event)"
               :disabled="page === this.pages"
            >
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-right"></use>
                </svg>
            </a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "AppPagination",
        model:{
            prop: 'page',
            event: 'paginate'
        },
        props: [
            'page',
            'count',
            'perPage'
        ],
        computed: {
            pages() {
                return Math.ceil(this.count / this.perPage);
            }
        },
        methods:{
            paginate(page){
                this.$emit('paginate', page)
            },
            paginateNext(event){
                if(!event.target.classList.contains('pagination__link--disabled')) {
                    this.page = this.page + 1;
                    this.paginate(this.page)
                }
            },
            paginatePrev(event){
                if(!event.target.classList.contains('pagination__link--disabled')) {
                    this.page = this.page - 1;
                    this.paginate(this.page)
                }
            }
        }
    }
</script>

<style scoped>
</style>