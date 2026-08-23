export class DateUtil {
  private constructor() {}

  public static now(): Date {
    return new Date();
  }

  public static minusDay(date: Date, day: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - day);
    return newDate;
  }

  public static minusMonth(date: Date, month: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - month);
    return newDate;
  }

  public static addDay(date: Date, day: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + day);
    return newDate;
  }

  public static addMonth(date: Date, month: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + month);
    return newDate;
  }
}
