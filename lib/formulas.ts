export const mapItems = (items: { id: number | string; name: string }[]) => {
  return items.map((item) => ({
    value: String(item.id),
    text: item.name.replace(/_/g, " "),
  }));
};
