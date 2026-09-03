export interface TableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
}
