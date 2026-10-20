Wypożyczalnia Broni – System Zarządzania

Projekt realizowany w ramach zajęć z <Technik Internetowych (TIN)>.  
Autor: Jakub Cywiński (s33189)

---

Krótka instrukcja uruchomienia

Projekt jest wstępną aplikacją frontendową na razie opartą na czystym HTML5, CSS3 oraz JavaScript.

1. Wypakuj plik z zip na swoj komputer.
2. Upewnij się, że wszystkie pliki strony (`index.html`, `klient.html`, `wypozyczenia.html`, `bron.html`), arkusz stylów (`style.css`) oraz pliki skryptów JavaScript (`*-form.js`) znajdują się w swoich katalogach.
3. Uruchomienie:
   Kliknij dwukrotnie plik `index.html`, aby otworzyć go w dowolnej przeglądarce internetowej.

---

Lista przygotowanych widoków

Aplikacja składa się z następujących podstron:

1. Strona Główna (`index.html`)
   Strona powitalna systemu wypożyczalni.
   Zawiera nawigację prowadzącą do poszczególnych modułów systemu.

2. Dane Klienta (`klient.html`)
   Moduł zarządzania bazą klientów wypożyczalni.
   Umożliwia przeglądanie, dodawanie, edycję oraz usuwanie danych klientów (wraz z walidacją formularzy).

3. Wypożyczenia (`wypozyczenia.html`)
   Moduł obsługi bieżących wypożyczeń broni.
   Umożliwia:
     Dodawanie nowego wypożyczenia z list rozwijanych (wybór klienta oraz broni).
     Walidację dat (blokada wyboru dat z przeszłości oraz pilnowanie, aby Data-od nie była późniejsza niż Data-do).
     Edycję wypożyczenia (w tym uzupełnianie faktycznej daty oddania i ceny).
     Usuwanie wpisów z potwierdzeniem w oknie dialogowym.

4. Broń (`bron.html`)
   Katalog dostępnej broni w wypożyczalni.
   Umożliwia zarządzanie asortymentem (typ, model, kolor, cena za dobę w PLN).
   Posiada pełną walidację formularza dodawania i edycji oraz interaktywne okna dialogowe.