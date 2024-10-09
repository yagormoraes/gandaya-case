export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const dayName = date
        .toLocaleDateString("pt-BR", { weekday: "short" })
        .replace('.', '')
        .replace(/^\w/, c => c.toUpperCase());
    const day = date.getDate();

    const monthName = date
        .toLocaleDateString("pt-BR", { month: "short" })
        .replace('.', '')
        .replace(/^\w/, c => c.toUpperCase());
    const formattedDate = `${dayName}, ${day.toString().padStart(2, '0')} de ${monthName}`;
    const formattedTime = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    return { formattedDate, formattedTime };
};