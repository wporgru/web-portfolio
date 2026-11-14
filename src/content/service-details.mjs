export const serviceDetails = {
  'website-redesign': {
    ru: ['Оформление устарело, но каталог и заказы уже работают', 'Договоримся, что сохраняем: адреса страниц, категории, привычный способ заказа и интеграции. Отдельно выделим, где можно менять структуру, а где достаточно переделать шаблон.', 'План обновления, согласованные экраны и список сценариев для приёмки. Сравним старую и новую витрины на одних и тех же страницах, а не только на главной.'],
    en: ['The design looks dated, but the store already takes orders', 'Agree on what stays: page URLs, categories, ordering flows and integrations. Decide where a structural change is worthwhile and where a template update is enough.', 'A redesign plan, agreed screens and an acceptance checklist. Compare the old and new storefront on the same pages, not just the homepage.'],
  },
  'catalog-automation': {
    ru: ['После обновления дублируются товары или сбиваются цены', 'Новый прайс не должен перезаписывать вручную отредактированные карточки. Сначала определим, по какому идентификатору обновлять товары и что делать с позициями, исчезнувшими из файла.', 'Таблица сопоставления полей, тестовая выборка и правила повторной загрузки. При приёмке проверим примеры новых, изменённых и отсутствующих позиций.'],
    en: ['Updates create duplicate products or incorrect prices', 'A new price list should not overwrite manually edited listings. Agree on the update key and what happens when a product disappears from the source.', 'Field mapping, a sample run and rules for repeat imports. Review new, changed and missing items during acceptance.'],
  },
  'technical-seo': {
    ru: ['В отчёте много ошибок, но неясно, с чего начать', 'Одна ошибка шаблона может повторяться на сотнях адресов. Разделю такие причины и единичные случаи, чтобы не тратить бюджет на ручную правку каждой похожей страницы.', 'Приоритеты по типам страниц, примеры проблемных URL и способ повторной проверки. Если есть доступ к поисковым панелям, отдельно покажу, что они сообщают об индексации.'],
    en: ['The crawl report is full of errors, but priorities are unclear', 'A single template defect can affect hundreds of URLs. Separate systemic causes from one-off issues so you do not pay to repair each similar page by hand.', 'Priorities by page type, examples and a verification method. With access to webmaster tools, report what they show about indexing separately.'],
  },
  'data-and-ai': {
    ru: ['Один процесс приходится повторять вручную каждую неделю', 'Для начала достаточно одного образца и примеров исключений. Не нужно сразу автоматизировать весь отдел: проверим, где правила однозначны, а где важнее оставить решение за человеком.', 'Рабочий пилот, пример входных и выходных данных и инструкция запуска. По результату можно оценить, какие шаги масштабировать и что проверить перед автоматическим запуском.'],
    en: ['The same process still takes manual work every week', 'Start with one input and representative exceptions. Rather than automating a whole department at once, establish which decisions are predictable and which need human review.', 'A working pilot, input and output examples and run instructions. Use it to decide what to scale and what to check before unattended runs.'],
  },
  'hosting-migration': {
    ru: ['Нужно сменить хостинг, не потеряв работающие функции', 'Переезд — не только копирование файлов. Отдельно проверю базу, сертификат, настройки домена и почты. Для магазина согласуем окно переключения, чтобы понимать, что делать с заказами, пришедшими в этот период.', 'Порядок переключения, контрольные страницы и сценарии, план отката. После переезда будет ясно, что проверено на новом хостинге и какие настройки остаются у регистратора или почтового провайдера.'],
    en: ['The site needs a new host without losing working features', 'A move is more than copying files. Check the database, certificate, domain and email settings separately. Agree on a cutover window for stores and how to handle orders placed during it.', 'A cutover sequence, verification checklist and rollback plan. Know what was tested on the new host and which settings remain with the registrar or email provider.'],
  },
  'checkout-payments': {
    ru: ['Покупатель оплатил, а магазин не видит заказ', 'Проверю, где расходится сценарий: в форме, на стороне платёжного сервиса, при обновлении статуса или при отправке письма. Ошибка на одном шаге не означает, что нужно менять весь чекаут.', 'Воспроизводимый контрольный сценарий и результат по каждому шагу. Отдельно отмечу, что проверено в тестовой среде, а что — в согласованном рабочем сценарии.'],
    en: ['The customer paid but the store did not register it', 'Isolate whether the problem is in the form, payment provider, order status update or email. A failure at one step does not mean the whole checkout needs replacing.', 'A repeatable test flow and a result for each step, with sandbox checks clearly distinguished from agreed live verification.'],
  },
  'wordpress-performance': {
    ru: ['На телефоне долго виден пустой экран, а в админке всё быстро', 'Сравню загрузку типовых страниц для обычного посетителя. В магазине особенно важны не только первый экран и изображения, но и отсутствие регрессий в корзине, формах и аналитике.', 'Повторяемые замеры по согласованным страницам, список изменений и проверка ключевых функций. Отдельно покажу ограничения замеров и где ещё остаётся потенциал.'],
    en: ['The mobile page stays blank while the admin session feels fast', 'Compare representative pages as a logged-out visitor. For stores, check not only when the first screen appears, but also whether cart, forms and analytics still behave correctly.', 'Repeatable measurements on agreed pages, a change list and checks for essential workflows. Document measurement limits and remaining opportunities.'],
  },
  'web-analytics': {
    ru: ['Цели настроены, но цифры не сходятся с заказами', 'Начну с одного контрольного заказа или заявки. Отделю повторную отправку цели от повторной покупки, а загрузку страницы благодарности — от подтверждения оплаты.', 'Карта событий, шаги для проверки и примеры данных, которые удалось увидеть в аналитике. Отдельно отмечу, какие сценарии не тестировались и где источником факта остаётся магазин или платёжный сервис.'],
    en: ['Goals are set up, but the numbers do not match the orders', 'Start with one controlled order or enquiry. Distinguish duplicate event firing from a second purchase, and a thank-you page view from confirmed payment.', 'An event map, verification steps and examples of what reached analytics. Document untested flows and where the store or payment provider remains the source of truth.'],
  },
};
