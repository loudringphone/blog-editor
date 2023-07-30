import React from "react";

interface DateObject {
    getDate (date?: number) : [Date, Date]
    getMonth (date?: number) : number
    getFullYear (date?: number) : [Date, Date]
}
export function formatDate(date: DateObject) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
    return formattedDate
}