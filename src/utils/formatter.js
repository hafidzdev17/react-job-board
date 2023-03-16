
import format from 'date-fns/format';
// Bahasa Indonesia locale
import id from 'date-fns/locale/id';

export function formatDate(timestamp) {
    if (!timestamp) {
        return null
    }
    return format(new Date(parseInt(timestamp)), "dd MMMM yyyy", { locale: id })

}

export function formatDateTime(timestamp) {
    if (!timestamp) {
        return null
    }
    return format(new Date(parseInt(timestamp)), "dd MMMM yyyy kk:mm", { locale: id })

}