const COMMON_MESSAGES = {
  AN_ERROR_OCCURED: "Wystąpił nieoczekiwany błąd.",
  NOT_FOUND: "Nie znaleziono zasobu",
  NOT_FOUND_FN: (notFoundItem: string) => `Nie znaleziono ${notFoundItem}`,
  ITEM_WITH_NAME_ALREADY_EXIST_FN: (name: string) =>
    `${name} o takiej nazwie już istnieje`,
  ITEM_WITH_NAME_CREATED_FN: (name: string) => `Pomyślnie utworzono ${name}`,
  SUCCESSFULLY_UPDATED: "Pomyślnie zaktualizowano",
  SUCCESSFULLY_REMOVED: "Pomyślnie usunięto",
  ALREADY_IN_WISHLIST: "Ten przedmiot znajduje się już w Twojej liście życzeń",
  ADDED_TO_WISHLIST: "Pomyślnie dodano do listy życzeń",
  REMOVED_FROM_WISHLIST: "Pomyślnie usunięto z listy życzeń",
};

export default COMMON_MESSAGES;
