export const serviceDetails = {
  'woocommerce-store-development': {
    ru: ['Одинаково оформленные карточки могут требовать разных правил покупки', 'У магазина инструментов покупатель ищет товар по артикулу и характеристикам, у магазина мебели выбирает размер и отделку. Сначала проверим эти модели на небольшой выборке, затем решим, как организовать категории, фильтры и обновление товаров. Платежи и доставку включим только в согласованном объёме.', 'Вы получите витрину, редактируемые товары и оговорённые сценарии заказа. Зафиксируем, что проверено: поиск, товар с вариациями, способ доставки, уведомление или контрольная оплата — в зависимости от комплектации проекта.'],
    en: ['Similar product pages can require different buying rules', 'Tool buyers search by SKU and specifications, while furniture buyers choose size and finish. Test representative products first, then design categories, filters and update rules. Payment and shipping work follows the agreed scope.', 'Get the storefront, editable products and agreed order flows. The handoff records which scenarios were tested: search, variations, delivery, notification or a test payment, depending on the project scope.'],
    questions: {
      ru: [
        ['Можно начать без полной выгрузки?', 'Да, начнём с нескольких типичных товаров. Для массового запуска отдельно проверим поля, идентификаторы и фотографии.'],
        ['Можно сначала запустить каталог без онлайн-оплаты?', 'Да. Можно начать с заявки или запроса цены, а оплату подключить после согласования условий и выбора платёжного сервиса.'],
      ],
      en: [
        ['Can we start before the full export is ready?', 'Yes. Begin with a few representative products. Before full import, check fields, identifiers and images separately.'],
        ['Can we launch a catalog without online payments?', 'Yes. Start with enquiries or quote requests, and add online payments once terms and a payment provider are agreed.'],
      ],
    },
  },
  'wordpress-business-website': {
    ru: ['Посетитель ищет решение своей задачи, а не просто знакомится с компанией', 'Разная аудитория приходит за разным: гостю ресторана нужно меню или условия банкета, а клиенту ремонтной компании — виды работ, примеры и форма оценки. Поэтому сначала определю главные маршруты, затем соберу структуру вокруг них. Для «ПРОМАРКО», где тексты и фотографии оставались за клиентом, выделил отдельный этап: рабочий шаблон с согласованной палитрой без открытия демоданных для индексации.', 'Получите редактируемые страницы и шаблоны, настроенный способ обращения и список проверенных сценариев. Если отдельно заказываете наполнение, запуск или интеграции, зафиксируем их в смете и критериях приёмки.'],
    en: ['Visitors want to solve a problem, not just read a company profile', 'A restaurant guest wants a menu or banquet details. A renovation customer wants to see service types, examples and a quote form. Identify the key journeys first and build around them. For Promarko, where the client owned the copy and photography, I scoped the working template and approved color palette as a separate stage and kept demo content out of search.', 'Get editable pages and templates, a configured contact flow and a record of the tested scenarios. Content production, launch and integrations are listed separately in the estimate and acceptance criteria when included.'],
    questions: {
      ru: [
        ['Что делать, если тексты и фотографии ещё не готовы?', 'Начнём со структуры и одного ключевого шаблона. Согласуем, кто готовит материалы, какие блоки можно собрать сразу и при каких условиях открывать сайт для индексации.'],
        ['Можно ли обновлять содержание самостоятельно?', 'Да. Заранее выберем, что вы меняете сами: услуги, статьи, меню, баннеры или контактные данные. Покажу этот сценарий на готовой странице.'],
        ['Что входит в проверку перед запуском?', 'Сверю согласованные страницы, навигацию, мобильные состояния и технические настройки поисковой доступности. Отправку тестовой заявки и проверку её доставки согласуем отдельно.'],
      ],
      en: [
        ['What if we do not have copy and photos yet?', 'Start with the page structure and one key template. Agree who provides materials, what can be built now and when the site is ready to open to search engines.'],
        ['Can we update content ourselves?', 'Yes. Decide what you will maintain: services, posts, menus, banners or contact details. I will demonstrate the workflow on a finished page.'],
        ['What do you check before launch?', 'Review the agreed pages, navigation, mobile states and technical search settings. A test submission and verification of its delivery are agreed separately.'],
      ],
    },
  },
  'wordpress-plugin-development': {
    ru: ['Нужно выключить покупку у одного поставщика, а не переписывать весь каталог', 'В проекте Sport-man отделил правило витрины от данных карточек: MU-плагин отключал переходы и покупку у 1 892 затронутых позиций. Проверил контрольный товар, чтобы убедиться, что покупка у других поставщиков осталась доступной. Если задачу можно решить такой изолированной правкой, нет смысла переделывать тему или массово менять товары.', 'Вы получите код, инструкцию установки, список затронутых условий и проверок. Будет понятно, как включить и отключить функцию, что происходит с уже записанными данными и какие сценарии повторять после обновлений.'],
    en: ['Pause purchases for one supplier without rewriting the whole catalog', 'For Sport-man, the storefront rule was separate from product records: a must-use plugin disabled clicks and purchases for 1,892 affected listings. A control product verified that unaffected offers still worked. An isolated rule can avoid a theme rebuild or a bulk product rewrite.', 'Get the implementation, installation notes and a record of conditions and checks. Know how to turn the feature on and off, what happens to existing data and what to retest after updates.'],
    questions: {
      ru: [
        ['Всегда ли нужен новый плагин?', 'Нет. Сначала проверю, можно ли получить нужное поведение штатной настройкой. Шаблон подходит для отображения, а правила бизнеса, которые должны жить независимо от темы, обычно удобнее держать отдельно.'],
        ['Будет ли доработка работать в блочном оформлении заказа?', 'Сначала определю тип оформления: классический, блочный или кастомный. Для блоков часть обычных PHP-хуков не подходит. Сценарий тестирую именно на том варианте, которым пользуются покупатели.'],
        ['Что останется после отключения?', 'До запуска разделю правила, которые меняют только поведение, и операции, которые записывают данные. Отключение функции не отменяет внесённые данные автоматически: если запись нужна, заранее согласуем резервную копию и способ восстановления.'],
      ],
      en: [
        ['Do I always need a new plugin?', 'No. First check whether built-in configuration is enough. Templates are useful for presentation; business rules that must survive a theme switch are usually better kept separate.'],
        ['Will this work with block checkout?', 'Identify the live checkout first: classic, block-based or custom. Some traditional PHP hooks are not suitable for blocks. Test the implementation with the checkout your customers actually use.'],
        ['What stays after disabling it?', 'Separate behavior-only rules from operations that write data. Disabling a feature does not unwind stored changes, so if writes are needed, agree on backup and recovery before deployment.'],
      ],
    },
  },
  'website-ux-audit': {
    ru: ['Кнопка есть на странице, но клиент не может завершить действие', 'Вердикта по одному скриншоту недостаточно: одинаково выглядящие кнопки могут вести к разным формам, а на телефоне меню и модальное окно меняют поведение. Проверка начинается с реальных действий и заканчивается точным условием, по которому можно принять исправление.', 'Карта проверенных сценариев, список проблем с приоритетами и доказательствами, а также критерии повторной проверки после правок. Сайт при аудите не меняю.'],
    en: ['The button is visible, but the customer cannot finish the task', 'A screenshot alone is not enough: identical buttons can open different forms, and menus and dialogs may behave differently on phones. Start with real actions and finish with acceptance criteria for the repair.', 'Get a record of checked flows, prioritized findings with evidence and a retest checklist. No site changes are made during the audit.'],
  },
  'affiliate-catalog-development': {
    ru: ['Подключённая партнёрская программа ещё не означает, что витрину есть чем наполнить', 'Начну с реальной выборки: два продавца могут по-разному назвать одну модель, а крупный фид — не содержать описаний или относиться к другому региону. Проверю это до разработки, чтобы не строить витрину на данных, которые не подходят.', 'Получите оценку фидов, правила сопоставления и рабочий путь от импорта до перехода к продавцу. В отчёте разделю клики, заказы и подтверждённые комиссии: это разные источники данных.'],
    en: ['An approved affiliate program does not necessarily supply a usable catalog', 'Start with a real sample: merchants may name the same model differently, while a large feed may have no descriptions or cover the wrong region. Verify that before building around the data.', 'Get a feed assessment, matching rules and a working path from import to merchant click-through. Reporting distinguishes clicks, orders and confirmed commissions because they come from different sources.'],
  },
  'b2b-catalog-and-enquiries': {
    ru: ['Цена зависит от задачи, но покупателю всё равно нужно выбрать модель', 'Карточка должна помогать сравнить технику, а заявка — передавать контекст. Если человек уже выбрал машину, не нужно заставлять его повторно вводить название: подставим модель, а при выборе нескольких позиций передадим весь список. Условия и итоговую цену согласует менеджер.', 'Получите редактируемые карточки, согласованные фильтры и рабочий сценарий обращения. Перед приёмкой проверим, что модель и количество не теряются между витриной, формой и уведомлением. Если в объём входит счёт, отдельно проверим его поля и статус заказа.',],
    en: ['The price depends on the job, but buyers still need to choose a model', 'The product page should support comparison, and the enquiry should carry the context. Prefill the chosen model instead of making buyers type it again; send the complete list when they select several items. Sales staff can then agree on terms and final pricing.', 'Get editable product pages, agreed filters and an enquiry flow. Before sign-off, verify that model and quantity survive the path from catalog to form to notification. If invoicing is in scope, check invoice fields and order status separately.'],
    questions: {
      ru: [
        ['Можно оставить каталог без онлайн-оплаты?', 'Да. Для отдельных товаров подойдёт запрос с карточки, для комплектов и нескольких позиций — корзина-заявка. Подтверждение условий и оплату можно вынести на следующий шаг.'],
        ['Что делать, если закупочные цены только в Excel?', 'Начнём с выборки: определим ключ товара, отделим закупочную цену от публичной и согласуем, какие поля обновляет импорт. Неопределённые строки не должны менять опубликованные карточки.'],
        ['Как понять, не теряются ли заявки?', 'Проверим открытие формы и содержимое уведомления, а по согласованию отправим контрольную заявку. Успешное открытие формы само по себе не доказывает доставку письма.'],
      ],
      en: [
        ['Can we keep the catalog without online payments?', 'Yes. Use a product-page enquiry for individual items or an enquiry cart for bundles and multiple items. Agreement and payment can happen afterward.'],
        ['What if supplier prices only exist in Excel?', 'Start with a sample. Define a product key, separate internal costs from public prices, and agree which fields imports may overwrite. Ambiguous rows should not update public listings.'],
        ['How do we know enquiries are not being lost?', 'Check the dialog and notification payload, then send an agreed test enquiry. A dialog opening successfully does not prove email delivery.'],
      ],
    },
  },
  'ai-agent-workflows': {
    ru: ['Один и тот же промпт каждый раз даёт разный результат', 'Превращу промпт в последовательность действий с обязательными входными данными, примерами и правилами остановки. Например, сценарий подготовки кейса использует только подтверждённые работы и помечает отсутствующие метрики, а текст перед публикацией проверяет редактор.', 'Получите настроенный сценарий, инструкцию запуска, примеры входа и результата, критерии приёмки и список действий, которые остаются за человеком.'],
    en: ['The same prompt gives a different result every time', 'Turn the prompt into a workflow with required inputs, examples and clear stop rules. A case-study workflow, for instance, cites verified work, flags missing metrics and leaves the publish decision to an editor.', 'Get a configured workflow, run instructions, sample inputs and outputs, acceptance criteria and a list of actions that stay under human control.'],
  },
  'website-vps-maintenance': {
    ru: ['Места на сервере не хватает даже на новую копию', 'Начну с замера и освобождения места за счёт воспроизводимых файлов. В медиатеку и базу пойду только после проверки зависимостей и выбора точки отката. Хранение копии вне VPS и пробное восстановление можно выделить в отдельные этапы.', 'Перечень изменений, замеры до и после, расписание и правила хранения копий. Отдельно отмечу, что проверено: создание архива, читаемость дампа или фактическое восстановление на стенде.'],
    en: ['The server is too full to create a new backup', 'Measure first and reclaim space from reproducible files. Only touch the media library or database after checking dependencies and choosing a rollback point. Off-server storage and a restore drill can be scoped separately.', 'A change log, before-and-after storage measurements, and the backup schedule and retention rules. Know exactly what was verified: archive creation, dump readability or an actual staging restore.'],
  },
  'laravel-catalog-development': {
    ru: ['Несколько поставщиков по-разному называют один товар', 'В пилоте сначала сравним, какие признаки действительно различают модели: артикул, объём, исполнение или комплектность. Записи, для которых данных не хватает, не будем объединять автоматически только из-за похожих названий.', 'Рабочая выборка от загрузки фида до страницы сравнения, правила сопоставления и сценарии для повторного прогона. Будет ясно, какие записи можно публиковать автоматически, а какие требуют проверки.'],
    en: ['Different suppliers use different names for the same product', 'In the pilot, identify which signals actually distinguish models: part number, capacity, configuration or bundle contents. Do not merge incomplete records automatically based on title similarity alone.', 'A working sample from feed ingestion to the comparison page, matching rules and repeatable verification cases. See which listings can go live automatically and which require review.'],
  },
  'wordpress-repair': {
    ru: ['После обновления сайт открывается, но часть функций пропала', 'Работающая главная не означает, что всё в порядке: редактор может перестать сохранять правки, а кэш — показывать старые страницы. Проверю, где именно расходится поведение, и предложу точечный ремонт или восстановление из копии. Если ограничение выставил хостинг, отделю работу на сайте от действий, которые может выполнить только провайдер.', 'Вы получите список изменений, результаты повторной проверки по проблемным сценариям и описание оставшихся ограничений. Если для исправления нужен откат, до запуска согласуем, какие данные могут измениться и как сохранить свежие записи.'],
    en: ['The site loads after an update, but some features are gone', 'A working homepage does not mean everything is healthy: the editor may no longer save changes, or the cache may still serve old pages. I isolate where behavior diverges and recommend a targeted fix or recovery from backup. If the host imposed a restriction, I separate the site work from actions only the provider can take.', 'Get a change list, the results of retesting the affected flows, and a record of anything still unresolved. If rollback is necessary, we agree upfront which data may change and how recent records will be preserved.'],
    questions: {
      ru: [
        ['Можно восстановить сайт без полного отката?', 'Иногда достаточно исправить один конфликт, вернуть настройки компонента или восстановить отдельные данные. Полный откат рассматриваю, когда точечное восстановление ненадёжно или занимает больше времени.'],
        ['Что делать, если не открывается wp-admin?', 'Для диагностики может понадобиться доступ к панели хостинга, файлам или базе. По тексту ошибки и журналам определю, какой доступ нужен и можно ли сначала проверить копию сайта.'],
        ['Потеряются ли заказы WooCommerce при восстановлении?', 'При откате всей базы новые заказы действительно могут пропасть. До отката сверю дату копии с заказами и согласую способ их сохранения. Если можно восстановить только проблемную часть, сначала оценю этот вариант.'],
      ],
      en: [
        ['Can you recover the site without a full rollback?', 'A single conflict fix, settings repair or partial data restore may be enough. I consider a full rollback when targeted recovery is unreliable or would take longer.'],
        ['What if wp-admin does not open?', 'Diagnosis may require hosting panel, filesystem or database access. The error and logs help determine which access is needed and whether testing on a copy is possible first.'],
        ['Will recovery remove recent WooCommerce orders?', 'A full database rollback can remove recent orders. Before rolling back, I compare the backup timestamp with order history and agree on how to preserve newer orders. If only the affected data can be restored, I assess that option first.'],
      ],
    },
  },
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
