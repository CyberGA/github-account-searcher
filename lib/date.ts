export class CustomDate {
  static formatDateToDayMonthYear(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // Get full month name
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  }
}
