import eventBus from "@/helpers/eventBus";
export default function goToPage(page, id) {
    eventBus.$emit('goToPage', {
        page,
        params: {
            id: id || null
        },
    })
}