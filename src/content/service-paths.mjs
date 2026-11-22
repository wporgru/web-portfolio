// Alternatives explain how to scope a job, not just which pages to visit next.
export const servicePaths = {
  'wordpress-php-plugin-updates': [
    ['wordpress-repair','Если после прошлого обновления сайт уже сломался и сначала его нужно восстановить.','If a previous update already broke the site and recovery comes first.'],
    ['website-redesign','Если старую тему выгоднее заменить и одновременно переработать витрину.','If replacing the theme and redesigning the storefront makes more sense.'],
  ],
  'woocommerce-digital-downloads': [
    ['checkout-payments','Если выдача уже работает, а проблема только на шаге платёжной системы.','If downloads already work and the issue is limited to the payment gateway.'],
    ['woocommerce-store-development','Если нужен полноценный магазин с физическими товарами и доставкой.','If you also need a full storefront for physical products and shipping.'],
  ],
  'woocommerce-store-improvements': [
    ['catalog-automation','Если цены, остатки и характеристики нужно регулярно получать от поставщика.','If prices, stock and specifications need regular supplier updates.'],
    ['checkout-payments','Если нужен новый способ доставки или проблема возникает при оплате заказа.','If you need a new shipping method or the issue occurs during payment.'],
  ],
  'website-contact-widgets': [["website-ux-audit","Если посетители не могут найти контакты и другие важные действия на сайте.","If visitors cannot find contact options or other key actions."],["wordpress-repair","Если существующая форма или чат перестали работать после обновления.","If a form or chat stopped working after an update."]],
  'corporate-email-signatures': [["data-and-ai","Если данные команды сначала надо привести к единой структуре.","If staff data needs to be normalized first."],["wordpress-business-website","Если вместо подписи нужен сайт компании.","If you need a company website instead."]],
  'affiliate-link-audit': [
    ['affiliate-catalog-development','Если вместо ремонта отдельных ссылок нужно заново выстроить витрину и обновление предложений.','If individual link repairs cannot solve the problem and the storefront and refresh pipeline need to be rebuilt.'],
    ['web-analytics','Если переходы работают, но их нельзя связать с карточками или заказами в отчёте.','If links work but clicks cannot be tied to listings or orders in the report.'],
  ],
  'woocommerce-store-development': [
    ['woocommerce-store-improvements','Если магазин уже запущен и нужна точечная доработка каталога, карточек или корзины.','If the store already runs and needs a targeted catalog, product page or cart improvement.'],
    ['b2b-catalog-and-enquiries','Если клиент выбирает позиции, но цену и условия согласует менеджер, а не чекаут.','If customers choose products but a sales manager agrees on pricing and terms.'],
  ],
  'wordpress-business-website': [
    ['website-redesign','Если сайт уже работает и нужно сохранить адреса, каталог или заявки.','If the site is already live and you need to retain URLs, the catalog or enquiries.'],
    ['b2b-catalog-and-enquiries','Если клиенты выбирают оборудование и запрашивают условия вместо онлайн-покупки.','If customers select equipment and request terms instead of buying online.'],
  ],
  'wordpress-plugin-development': [
    ['wordpress-repair','Если функция уже была и сломалась после обновления, начните с диагностики.','If an existing feature broke after an update, start with diagnosis.'],
    ['checkout-payments','Если менять нужно конкретный шаг корзины, доставки или оплаты.','If the change is limited to cart, shipping or payment.'],
  ],
  'website-ux-audit': [
    ['website-redesign','Если проблемы повторяются на нескольких страницах и нужен новый шаблон или структура.','If the issues repeat across several pages and call for a new template or structure.'],
    ['web-analytics','Если нужно измерить, на каком шаге пользователи перестают двигаться к заказу.','If you need to measure where visitors stop progressing towards an order.'],
  ],
  'affiliate-catalog-development': [
    ['affiliate-link-audit','Если витрина уже есть, а ссылки, наличие или отчёт сети требуют проверки.','If the storefront already exists but its links, availability or network reporting need an audit.'],
    ['laravel-catalog-development','Если нужен отдельный сервис сравнения с собственными правилами сопоставления.','If you need a standalone comparison service with custom matching rules.'],
  ],
  'b2b-catalog-and-enquiries': [
    ['catalog-automation','Если главная проблема — загрузка предложений, характеристик или остатков от поставщиков.','If the main issue is importing supplier offers, specifications or stock.'],
    ['checkout-payments','Если часть товаров продаётся онлайн и нужно отделить обычную покупку от запроса счёта.','If some products sell online and purchase flow must be separate from quote requests.'],
  ],
  'ai-agent-workflows': [
    ['data-and-ai','Если задачу лучше решить повторяемым импортом, скриптом или обработкой данных без агента.','If a repeatable import, script or data pipeline can solve the problem without an agent.'],
    ['web-analytics','Если агенту нужен надёжный источник измерений, а события и отчёты ещё не сходятся.','If the proposed agent needs reliable inputs but tracking events and reports disagree.'],
  ],
  'website-vps-maintenance': [
    ['hosting-migration','Если ресурсы сервера исчерпаны и нужно спланировать перенос, а не только очистку.','If the server has reached its limits and needs a move rather than just cleanup.'],
    ['wordpress-repair','Если сервер работает, но редактор, витрина или отдельный плагин перестали работать.','If the server is up but the editor, storefront or a plugin has stopped working.'],
  ],
  'laravel-catalog-development': [
    ['catalog-automation','Если каталог уже есть и нужен только надёжный обмен с поставщиком или 1С.','If you already have a catalog and only need a reliable supplier or 1C integration.'],
    ['affiliate-catalog-development','Если сравнение цен строится на партнёрских фидах и оформление происходит у продавцов.','If comparison uses affiliate feeds and checkout happens with merchants.'],
  ],
  'wordpress-repair': [
    ['wordpress-php-plugin-updates','Если сайт ещё работает, но пора обновить PHP, ядро или расширения.','If the site still works but PHP, core or extensions need updating.'],
    ['wordpress-performance','Если страница работает без ошибок, но медленно загружается или реагирует.','If the page works without errors but loads or responds slowly.'],
  ],
  'website-redesign': [
    ['website-ux-audit','Если ещё не ясно, нужен ли новый дизайн или достаточно исправить несколько сценариев.','If you are not sure whether to redesign or fix a few specific flows.'],
    ['technical-seo','Если вместе с редизайном меняются разделы и требуется сверить адреса и редиректы.','If the redesign changes sections and URLs and redirects need reviewing.'],
  ],
  'catalog-automation': [
    ['woocommerce-store-improvements','Если импорт работает, но покупатель не может найти товар, выбрать вариант или применить скидку.','If imports run but shoppers cannot find an item, choose an option or use a discount.'],
    ['data-and-ai','Если на входе не готовый фид, а файлы разных форматов, которые нужно привести к одной схеме.','If the inputs are mixed-format files that must be normalized before import.'],
  ],
  'technical-seo': [
    ['hosting-migration','Если проблемы могут быть связаны со сменой домена, хостинга или структуры адресов.','If the issues may relate to a domain, hosting or URL-structure migration.'],
    ['wordpress-performance','Если на проблемных страницах медленно загружается первый экран.','If affected pages have slow above-the-fold loading.'],
  ],
  'data-and-ai': [
    ['ai-agent-workflows','Если помимо преобразования данных агенту нужно действовать по правилам и передавать спорные случаи человеку.','If an agent must follow operating rules and escalate uncertain cases to a person.'],
    ['catalog-automation','Если понятный источник нужно подключить именно к витрине и регулярно обновлять остатки.','If a known source needs connecting to the storefront with regular stock updates.'],
  ],
  'hosting-migration': [
    ['technical-seo','Если меняется не только сервер, но и адреса страниц: отдельно проверим канонические URL и редиректы.','If page addresses change as well as the server, review canonicals and redirects separately.'],
    ['website-vps-maintenance','Если переезд не нужен, а требуется освободить место и наладить резервные копии.','If a move is unnecessary and the job is disk cleanup and reliable backups.'],
  ],
  'checkout-payments': [
    ['b2b-catalog-and-enquiries','Если вместо мгновенной оплаты нужно отправлять корзину менеджеру на согласование.','If customers should send the cart to a manager for approval rather than pay instantly.'],
    ['web-analytics','Если покупка работает, но аналитика теряет оплаты, дублирует их или неверно считает сумму.','If checkout works but analytics misses purchases, duplicates them or reports the wrong totals.'],
  ],
  'wordpress-performance': [
    ['website-vps-maintenance','Если медленно отвечает сам сервер и проблема затрагивает не только первый экран.','If the server itself responds slowly and the problem goes beyond the first screen.'],
    ['website-ux-audit','Если кроме скорости есть обрезанный контент или перестают работать кнопки на телефоне.','If there is also clipped content or broken mobile controls.'],
  ],
  'web-analytics': [
    ['website-ux-audit','Если по отчёту видно, где теряются заявки, но причина в интерфейсе пока непонятна.','If reports show where enquiries drop off but not what breaks in the interface.'],
    ['technical-seo','Если снизились поисковые показы и нужно проверить, какие страницы робот может обходить.','If search impressions fell and you need to check which pages crawlers can reach.'],
  ],
};
